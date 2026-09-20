#!/usr/bin/env python3
"""
Generate valid PNG and SVG assets for Nini character poses according to docs/06_Nini_Pose_Prompt_Set-1.md
Uses pure Python with zlib/struct to create 32-bit RGBA PNG files.
"""
import os, math, zlib, struct

OUTPUT_DIR = '/app/applet/Character-nini'
os.makedirs(OUTPUT_DIR, exist_ok=True)

class ImageBuffer:
    def __init__(self, width=420, height=420):
        self.width = width
        self.height = height
        self.buf = bytearray(width * height * 4)

    def set_pixel(self, x, y, r, g, b, a=255):
        if 0 <= x < self.width and 0 <= y < self.height:
            idx = (y * self.width + x) * 4
            if a == 255:
                self.buf[idx] = r
                self.buf[idx+1] = g
                self.buf[idx+2] = b
                self.buf[idx+3] = 255
            else:
                sa = a / 255.0
                da = self.buf[idx+3] / 255.0
                out_a = sa + da * (1.0 - sa)
                if out_a > 0:
                    self.buf[idx] = int((r * sa + self.buf[idx] * da * (1.0 - sa)) / out_a)
                    self.buf[idx+1] = int((g * sa + self.buf[idx+1] * da * (1.0 - sa)) / out_a)
                    self.buf[idx+2] = int((b * sa + self.buf[idx+2] * da * (1.0 - sa)) / out_a)
                    self.buf[idx+3] = int(out_a * 255)

    def draw_rect(self, x, y, w, h, r, g, b, a=255):
        for cy in range(int(y), int(y + h)):
            for cx in range(int(x), int(x + w)):
                self.set_pixel(cx, cy, r, g, b, a)

    def draw_circle(self, cx, cy, radius, r, g, b, a=255):
        r_sq = radius * radius
        min_x = max(0, int(cx - radius - 1))
        max_x = min(self.width, int(cx + radius + 2))
        min_y = max(0, int(cy - radius - 1))
        max_y = min(self.height, int(cy + radius + 2))
        for y in range(min_y, max_y):
            dy = y - cy
            for x in range(min_x, max_x):
                dx = x - cx
                d_sq = dx*dx + dy*dy
                if d_sq <= r_sq:
                    dist = math.sqrt(d_sq)
                    edge = radius - dist
                    alpha = a if edge >= 1.0 else int(a * max(0.0, edge))
                    self.set_pixel(x, y, r, g, b, alpha)

    def draw_ring(self, cx, cy, radius, thickness, r, g, b, a=255, glow=True):
        if glow:
            # Soft neon cyan halo
            for glow_r in range(int(radius + thickness + 1), int(radius + thickness + 10)):
                ga = int(a * 0.25 * (1.0 - (glow_r - radius - thickness) / 10.0))
                self.draw_ring_simple(cx, cy, glow_r, 1, 0, 210, 255, ga)
        self.draw_ring_simple(cx, cy, radius, thickness, r, g, b, a)

    def draw_ring_simple(self, cx, cy, radius, thickness, r, g, b, a=255):
        inner_r = max(0, radius - thickness / 2.0)
        outer_r = radius + thickness / 2.0
        in_sq = inner_r * inner_r
        out_sq = outer_r * outer_r
        min_x = max(0, int(cx - outer_r - 1))
        max_x = min(self.width, int(cx + outer_r + 2))
        min_y = max(0, int(cy - outer_r - 1))
        max_y = min(self.height, int(cy + outer_r + 2))
        for y in range(min_y, max_y):
            dy = y - cy
            for x in range(min_x, max_x):
                d_sq = (x - cx)**2 + dy**2
                if in_sq <= d_sq <= out_sq:
                    self.set_pixel(x, y, r, g, b, a)

    def draw_line(self, x0, y0, x1, y1, thickness, r, g, b, a=255):
        dx = x1 - x0
        dy = y1 - y0
        dist = math.hypot(dx, dy)
        if dist == 0:
            self.draw_circle(x0, y0, thickness/2, r, g, b, a)
            return
        steps = int(dist * 2)
        for i in range(steps + 1):
            t = i / steps
            cx = x0 + dx * t
            cy = y0 + dy * t
            self.draw_circle(cx, cy, thickness / 2.0, r, g, b, a)

    def draw_arrow(self, x0, y0, x1, y1, r=0, g=210, b=255):
        self.draw_line(x0, y0, x1, y1, 5, r, g, b, 240)
        angle = math.atan2(y1 - y0, x1 - x0)
        head_len = 16
        left_a = angle + math.pi * 0.82
        right_a = angle - math.pi * 0.82
        self.draw_line(x1, y1, x1 + math.cos(left_a)*head_len, y1 + math.sin(left_a)*head_len, 4, r, g, b, 240)
        self.draw_line(x1, y1, x1 + math.cos(right_a)*head_len, y1 + math.sin(right_a)*head_len, 4, r, g, b, 240)

    def to_png_bytes(self):
        def chunk(tag, data):
            return struct.pack('>I', len(data)) + tag + data + struct.pack('>I', zlib.crc32(tag + data) & 0xffffffff)
        raw = bytearray()
        for y in range(self.height):
            raw.append(0) # None filter
            raw.extend(self.buf[y * self.width * 4 : (y + 1) * self.width * 4])
        ihdr = struct.pack('>IIBBBBB', self.width, self.height, 8, 6, 0, 0, 0)
        return b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', ihdr) + chunk(b'IDAT', zlib.compress(bytes(raw), level=6)) + chunk(b'IEND', b'')

print("ImageBuffer ready")
