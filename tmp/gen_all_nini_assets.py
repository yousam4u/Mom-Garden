#!/usr/bin/env python3
"""
Full Nini & Boksil Asset Generator based on docs/06_Nini_Pose_Prompt_Set-1.md and styles.css
Generates vector SVG + high-res 32-bit RGBA PNG for each pose in /Character-nini.
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

    def draw_ellipse(self, cx, cy, rx, ry, r, g, b, a=255):
        min_x = max(0, int(cx - rx - 1))
        max_x = min(self.width, int(cx + rx + 2))
        min_y = max(0, int(cy - ry - 1))
        max_y = min(self.height, int(cy + ry + 2))
        rx_sq = rx * rx
        ry_sq = ry * ry
        for y in range(min_y, max_y):
            dy = y - cy
            for x in range(min_x, max_x):
                dx = x - cx
                val = (dx*dx)/rx_sq + (dy*dy)/ry_sq
                if val <= 1.0:
                    self.set_pixel(x, y, r, g, b, a)

    def draw_ring(self, cx, cy, radius, thickness, r, g, b, a=255, glow=True):
        if glow:
            for gr in range(int(radius + thickness), int(radius + thickness + 8)):
                ga = int(120 * (1.0 - (gr - radius - thickness) / 8.0))
                self.draw_ring_simple(cx, cy, gr, 1.2, 0, 210, 255, ga)
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

    def draw_capsule(self, x0, y0, x1, y1, radius, r, g, b, a=255):
        self.draw_circle(x0, y0, radius, r, g, b, a)
        self.draw_circle(x1, y1, radius, r, g, b, a)
        dx = x1 - x0
        dy = y1 - y0
        dist = math.hypot(dx, dy)
        if dist > 0:
            steps = int(dist * 2)
            for i in range(steps + 1):
                t = i / steps
                cx = x0 + dx * t
                cy = y0 + dy * t
                self.draw_circle(cx, cy, radius, r, g, b, a)

    def draw_line(self, x0, y0, x1, y1, thickness, r, g, b, a=255):
        self.draw_capsule(x0, y0, x1, y1, thickness / 2.0, r, g, b, a)

    def draw_arrow(self, x0, y0, x1, y1, r=0, g=210, b=255):
        self.draw_line(x0, y0, x1, y1, 5, r, g, b, 240)
        angle = math.atan2(y1 - y0, x1 - x0)
        head_len = 16
        self.draw_line(x1, y1, x1 + math.cos(angle + 2.5)*head_len, y1 + math.sin(angle + 2.5)*head_len, 4, r, g, b, 240)
        self.draw_line(x1, y1, x1 + math.cos(angle - 2.5)*head_len, y1 + math.sin(angle - 2.5)*head_len, 4, r, g, b, 240)

    def to_png_bytes(self):
        def chunk(tag, data):
            return struct.pack('>I', len(data)) + tag + data + struct.pack('>I', zlib.crc32(tag + data) & 0xffffffff)
        raw = bytearray()
        for y in range(self.height):
            raw.append(0)
            raw.extend(self.buf[y * self.width * 4 : (y + 1) * self.width * 4])
        ihdr = struct.pack('>IIBBBBB', self.width, self.height, 8, 6, 0, 0, 0)
        return b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', ihdr) + chunk(b'IDAT', zlib.compress(bytes(raw), level=6)) + chunk(b'IEND', b'')


# SVG & PNG templates for each pose
def create_pose(pose_type):
    buf = ImageBuffer(420, 420)
    
    # Common Palette from docs/06_Nini_Pose_Prompt_Set-1.md
    INK = (20, 24, 28)
    SKIN = (255, 242, 230)
    HAIR = (110, 70, 40)
    SCRUNCHIE = (98, 195, 248)
    HOODIE = (255, 255, 255)
    LEAF = (24, 134, 235)
    SHORTS = (27, 104, 189)
    BIKER = (40, 44, 52)
    NEON = (0, 210, 255)
    CHEEK = (255, 173, 184)
    CHAIR = (175, 182, 190)

    if pose_type == 'standing':
        # Master standing / Home (nini.png / nini-1.png)
        # Hair Ponytail + Scrunchie
        buf.draw_ellipse(280, 100, 36, 48, *HAIR)
        buf.draw_circle(255, 108, 14, *SCRUNCHIE)
        
        # Legs
        buf.draw_capsule(180, 280, 180, 340, 14, *SKIN)
        buf.draw_capsule(240, 280, 240, 340, 14, *SKIN)
        # Neon Blue Knee Rings on both knees
        buf.draw_ring(180, 310, 15, 6, *NEON, glow=True)
        buf.draw_ring(240, 310, 15, 6, *NEON, glow=True)
        # Chunky Sneakers
        buf.draw_ellipse(176, 365, 22, 12, 255, 255, 255)
        buf.draw_ellipse(176, 365, 16, 7, *LEAF)
        buf.draw_ellipse(244, 365, 22, 12, 255, 255, 255)
        buf.draw_ellipse(244, 365, 16, 7, *LEAF)

        # Shorts (blue athletic over bike shorts)
        buf.draw_capsule(185, 260, 235, 260, 28, *SHORTS)
        buf.draw_capsule(180, 275, 200, 275, 16, *BIKER)
        buf.draw_capsule(220, 275, 240, 275, 16, *BIKER)

        # Torso (White cropped hoodie + blue leaf logo)
        buf.draw_capsule(190, 210, 230, 210, 32, *HOODIE)
        buf.draw_ellipse(205, 212, 10, 14, *LEAF) # Leaf logo
        buf.draw_line(210, 185, 210, 238, 3, 200, 210, 220) # Zipper

        # Arms (left waving cheerful hello, right relaxed)
        buf.draw_capsule(170, 200, 130, 160, 11, *SKIN) # Waving hand
        buf.draw_circle(126, 154, 13, *SKIN)
        buf.draw_capsule(250, 200, 275, 250, 11, *SKIN) # Right arm
        buf.draw_circle(278, 256, 12, *SKIN)

        # Head & Face
        buf.draw_circle(210, 130, 52, *SKIN)
        # Bangs
        buf.draw_ellipse(210, 95, 48, 22, *HAIR)
        # Big sparkling eyes
        buf.draw_ellipse(192, 132, 8, 12, 70, 40, 20)
        buf.draw_circle(190, 128, 4, 255, 255, 255)
        buf.draw_ellipse(228, 132, 8, 12, 70, 40, 20)
        buf.draw_circle(226, 128, 4, 255, 255, 255)
        # Cheeks
        buf.draw_ellipse(180, 145, 12, 8, *CHEEK)
        buf.draw_ellipse(240, 145, 12, 8, *CHEEK)
        # Smile
        buf.draw_capsule(205, 154, 215, 154, 3, *INK)

    elif pose_type == 'seated_ready':
        # nini-s-1: Chair seated upright, hands holding chair
        # Gray Chair
        buf.draw_line(130, 180, 130, 350, 10, *CHAIR)
        buf.draw_line(125, 270, 240, 270, 12, *CHAIR)
        buf.draw_line(230, 270, 230, 360, 8, *CHAIR)

        # Body seated side-view facing right
        # Torso & Head
        buf.draw_ellipse(240, 100, 28, 40, *HAIR) # Ponytail
        buf.draw_circle(225, 105, 10, *SCRUNCHIE)
        buf.draw_circle(190, 125, 44, *SKIN)
        buf.draw_ellipse(190, 95, 40, 18, *HAIR)
        buf.draw_ellipse(210, 126, 7, 10, 70, 40, 20) # Eye
        buf.draw_circle(209, 123, 3, 255, 255, 255)
        buf.draw_ellipse(215, 138, 10, 6, *CHEEK)
        buf.draw_circle(216, 144, 3, *INK) # Smile

        buf.draw_capsule(175, 195, 175, 255, 28, *HOODIE)
        buf.draw_ellipse(185, 200, 8, 12, *LEAF)
        buf.draw_capsule(170, 255, 220, 260, 24, *SHORTS)

        # Arms holding chair
        buf.draw_capsule(175, 195, 195, 265, 10, *SKIN)

        # Legs bent 90 degrees
        buf.draw_capsule(180, 260, 250, 260, 14, *SKIN) # Thigh
        buf.draw_capsule(250, 260, 250, 340, 14, *SKIN) # Shin down
        buf.draw_ring(250, 260, 15, 6, *NEON, glow=True) # Neon knee
        buf.draw_ellipse(265, 345, 18, 10, 255, 255, 255) # Foot

    elif pose_type == 'seated_toe':
        # nini-s-2: Ankle flexed pulling toes toward body + blue curved arrow
        buf.draw_line(130, 180, 130, 350, 10, *CHAIR)
        buf.draw_line(125, 270, 240, 270, 12, *CHAIR)
        buf.draw_line(230, 270, 230, 360, 8, *CHAIR)

        buf.draw_ellipse(240, 100, 28, 40, *HAIR)
        buf.draw_circle(225, 105, 10, *SCRUNCHIE)
        buf.draw_circle(190, 125, 44, *SKIN)
        buf.draw_ellipse(190, 95, 40, 18, *HAIR)
        buf.draw_ellipse(210, 126, 7, 10, 70, 40, 20)
        buf.draw_circle(209, 123, 3, 255, 255, 255)
        buf.draw_ellipse(215, 138, 10, 6, *CHEEK)

        buf.draw_capsule(175, 195, 175, 255, 28, *HOODIE)
        buf.draw_ellipse(185, 200, 8, 12, *LEAF)
        buf.draw_capsule(170, 255, 220, 260, 24, *SHORTS)
        buf.draw_capsule(175, 195, 195, 265, 10, *SKIN)

        buf.draw_capsule(180, 260, 250, 260, 14, *SKIN)
        buf.draw_capsule(250, 260, 250, 335, 14, *SKIN)
        buf.draw_ring(250, 260, 15, 6, *NEON, glow=True)
        # Flexed foot (pointing up)
        buf.draw_capsule(250, 335, 262, 315, 12, 255, 255, 255)
        buf.draw_arrow(280, 345, 265, 315) # Arrow pointing toe up

    elif pose_type == 'seated_lift':
        # nini-s-3: Leg extended forward horizontally mid-motion
        buf.draw_line(130, 180, 130, 350, 10, *CHAIR)
        buf.draw_line(125, 270, 240, 270, 12, *CHAIR)
        buf.draw_line(230, 270, 230, 360, 8, *CHAIR)

        buf.draw_ellipse(240, 100, 28, 40, *HAIR)
        buf.draw_circle(225, 105, 10, *SCRUNCHIE)
        buf.draw_circle(190, 125, 44, *SKIN)
        buf.draw_ellipse(190, 95, 40, 18, *HAIR)
        buf.draw_ellipse(210, 126, 7, 10, 70, 40, 20)
        buf.draw_circle(209, 123, 3, 255, 255, 255)
        buf.draw_ellipse(215, 138, 10, 6, *CHEEK)

        buf.draw_capsule(175, 195, 175, 255, 28, *HOODIE)
        buf.draw_ellipse(185, 200, 8, 12, *LEAF)
        buf.draw_capsule(170, 255, 220, 260, 24, *SHORTS)
        buf.draw_capsule(175, 195, 195, 265, 10, *SKIN)

        # Extended leg
        buf.draw_capsule(180, 260, 250, 260, 14, *SKIN)
        buf.draw_capsule(250, 260, 340, 260, 14, *SKIN) # Leg straight forward!
        buf.draw_ring(250, 260, 16, 7, *NEON, glow=True)
        buf.draw_ellipse(350, 255, 16, 12, 255, 255, 255) # Extended sneaker
        buf.draw_arrow(280, 310, 315, 275) # Upward swing arrow

    elif pose_type == 'seated_hold':
        # nini-s-4: Leg held horizontal, concentrating expression, glowing knee!
        buf.draw_line(130, 180, 130, 350, 10, *CHAIR)
        buf.draw_line(125, 270, 240, 270, 12, *CHAIR)
        buf.draw_line(230, 270, 230, 360, 8, *CHAIR)

        buf.draw_ellipse(240, 100, 28, 40, *HAIR)
        buf.draw_circle(225, 105, 10, *SCRUNCHIE)
        buf.draw_circle(190, 125, 44, *SKIN)
        buf.draw_ellipse(190, 95, 40, 18, *HAIR)
        # Concentrating cute face
        buf.draw_ellipse(210, 126, 8, 8, 70, 40, 20)
        buf.draw_ellipse(215, 138, 12, 8, *CHEEK)
        buf.draw_circle(216, 146, 3, *INK)

        buf.draw_capsule(175, 195, 175, 255, 28, *HOODIE)
        buf.draw_ellipse(185, 200, 8, 12, *LEAF)
        buf.draw_capsule(170, 255, 220, 260, 24, *SHORTS)
        buf.draw_capsule(175, 195, 195, 265, 10, *SKIN)

        # Extended leg horizontal with brilliant neon ring
        buf.draw_capsule(180, 260, 250, 260, 14, *SKIN)
        buf.draw_capsule(250, 260, 345, 260, 14, *SKIN)
        buf.draw_ring(250, 260, 18, 8, *NEON, glow=True) # Super glowing!
        buf.draw_ellipse(355, 255, 16, 12, 255, 255, 255)

    elif pose_type == 'seated_lower':
        # nini-s-5: Leg lowering halfway at 45 degrees + downward curved arrow
        buf.draw_line(130, 180, 130, 350, 10, *CHAIR)
        buf.draw_line(125, 270, 240, 270, 12, *CHAIR)
        buf.draw_line(230, 270, 230, 360, 8, *CHAIR)

        buf.draw_ellipse(240, 100, 28, 40, *HAIR)
        buf.draw_circle(225, 105, 10, *SCRUNCHIE)
        buf.draw_circle(190, 125, 44, *SKIN)
        buf.draw_ellipse(190, 95, 40, 18, *HAIR)
        buf.draw_ellipse(210, 126, 7, 10, 70, 40, 20)
        buf.draw_circle(209, 123, 3, 255, 255, 255)
        buf.draw_ellipse(215, 138, 10, 6, *CHEEK)

        buf.draw_capsule(175, 195, 175, 255, 28, *HOODIE)
        buf.draw_ellipse(185, 200, 8, 12, *LEAF)
        buf.draw_capsule(170, 255, 220, 260, 24, *SHORTS)
        buf.draw_capsule(175, 195, 195, 265, 10, *SKIN)

        buf.draw_capsule(180, 260, 250, 260, 14, *SKIN)
        # Leg lowered at 45 degrees
        buf.draw_capsule(250, 260, 310, 310, 14, *SKIN)
        buf.draw_ring(250, 260, 15, 6, *NEON, glow=True)
        buf.draw_ellipse(320, 315, 16, 12, 255, 255, 255)
        buf.draw_arrow(330, 265, 330, 320) # Downward arrow

    elif pose_type == 'lying_ready':
        # nini-l-1: Lying on exercise mat, one knee bent, other straight
        # Blue Exercise Mat
        buf.draw_capsule(50, 320, 380, 320, 8, 180, 225, 250)
        # Head resting
        buf.draw_circle(110, 280, 36, *SKIN)
        buf.draw_ellipse(85, 280, 24, 30, *HAIR)
        buf.draw_circle(80, 295, 9, *SCRUNCHIE)
        buf.draw_ellipse(125, 275, 5, 8, 70, 40, 20)
        buf.draw_ellipse(125, 288, 8, 5, *CHEEK)
        # Torso flat
        buf.draw_capsule(140, 295, 210, 295, 24, *HOODIE)
        buf.draw_capsule(210, 295, 240, 295, 20, *SHORTS)
        # Left leg bent up
        buf.draw_capsule(235, 295, 275, 250, 12, *SKIN)
        buf.draw_capsule(275, 250, 290, 315, 12, *SKIN)
        # Right leg straight flat on mat
        buf.draw_capsule(240, 300, 340, 300, 12, *SKIN)
        buf.draw_ring(290, 300, 13, 5, *NEON, glow=True)

    elif pose_type == 'lying_lift':
        # nini-l-3: Leg lifted only 10cm above mat
        buf.draw_capsule(50, 320, 380, 320, 8, 180, 225, 250)
        buf.draw_circle(110, 280, 36, *SKIN)
        buf.draw_ellipse(85, 280, 24, 30, *HAIR)
        buf.draw_circle(80, 295, 9, *SCRUNCHIE)
        buf.draw_ellipse(125, 275, 5, 8, 70, 40, 20)
        buf.draw_ellipse(125, 288, 8, 5, *CHEEK)
        buf.draw_capsule(140, 295, 210, 295, 24, *HOODIE)
        buf.draw_capsule(210, 295, 240, 295, 20, *SHORTS)
        buf.draw_capsule(235, 295, 275, 250, 12, *SKIN)
        buf.draw_capsule(275, 250, 290, 315, 12, *SKIN)
        # Right leg lifted slightly 10cm (height around y=275)
        buf.draw_capsule(240, 295, 340, 275, 12, *SKIN)
        buf.draw_ring(290, 285, 14, 6, *NEON, glow=True)
        buf.draw_line(260, 312, 340, 312, 2, 0, 160, 255, 180) # Dotted reference line

    elif pose_type == 'standing_table':
        # nini-h-1: Standing holding wooden table
        # Table
        buf.draw_line(260, 240, 360, 240, 12, 140, 100, 60)
        buf.draw_line(340, 240, 340, 370, 10, 140, 100, 60)
        # Nini standing
        buf.draw_ellipse(160, 100, 28, 40, *HAIR)
        buf.draw_circle(175, 105, 10, *SCRUNCHIE)
        buf.draw_circle(200, 125, 44, *SKIN)
        buf.draw_ellipse(200, 95, 40, 18, *HAIR)
        buf.draw_ellipse(220, 126, 7, 10, 70, 40, 20)
        buf.draw_circle(219, 123, 3, 255, 255, 255)
        buf.draw_ellipse(225, 138, 10, 6, *CHEEK)
        buf.draw_capsule(195, 195, 195, 260, 28, *HOODIE)
        buf.draw_ellipse(205, 200, 8, 12, *LEAF)
        buf.draw_capsule(190, 260, 230, 260, 24, *SHORTS)
        # Hands holding table edge
        buf.draw_capsule(200, 200, 270, 235, 10, *SKIN)
        # Legs straight
        buf.draw_capsule(200, 265, 200, 345, 14, *SKIN)
        buf.draw_ring(200, 305, 15, 6, *NEON, glow=True)
        buf.draw_ellipse(205, 355, 20, 12, 255, 255, 255)

    elif pose_type == 'breathing':
        # nini-b-1: Hands on belly, gentle breathing
        buf.draw_line(130, 200, 130, 350, 8, *CHAIR)
        buf.draw_line(125, 280, 230, 280, 10, *CHAIR)
        buf.draw_ellipse(250, 110, 28, 40, *HAIR)
        buf.draw_circle(235, 115, 10, *SCRUNCHIE)
        buf.draw_circle(200, 135, 44, *SKIN)
        buf.draw_ellipse(200, 105, 40, 18, *HAIR)
        # Gentle closed peaceful eyes
        buf.draw_line(210, 135, 222, 135, 3, *INK)
        buf.draw_ellipse(225, 145, 10, 6, *CHEEK)
        buf.draw_capsule(190, 205, 190, 265, 28, *HOODIE)
        # Hands resting gently on belly
        buf.draw_capsule(190, 205, 215, 245, 10, *SKIN)
        buf.draw_circle(218, 248, 12, *SKIN)
        # Little sparkle bubbles
        buf.draw_circle(255, 140, 5, 100, 220, 255, 180)
        buf.draw_circle(268, 125, 4, 255, 230, 100, 180)

    elif pose_type == 'celebration':
        # nini-e-1: Holding light blue watering can pouring water on blooming flower!
        # Nini standing happily
        buf.draw_ellipse(275, 110, 36, 46, *HAIR)
        buf.draw_circle(250, 115, 12, *SCRUNCHIE)
        buf.draw_circle(200, 135, 48, *SKIN)
        buf.draw_ellipse(200, 100, 44, 20, *HAIR)
        buf.draw_ellipse(185, 136, 8, 12, 70, 40, 20)
        buf.draw_circle(183, 132, 4, 255, 255, 255)
        buf.draw_ellipse(215, 136, 8, 12, 70, 40, 20)
        buf.draw_circle(213, 132, 4, 255, 255, 255)
        buf.draw_ellipse(175, 148, 10, 6, *CHEEK)
        buf.draw_ellipse(225, 148, 10, 6, *CHEEK)
        buf.draw_capsule(195, 155, 205, 155, 3, *INK) # Big smile

        buf.draw_capsule(190, 215, 210, 215, 30, *HOODIE)
        buf.draw_ellipse(200, 215, 8, 12, *LEAF)
        buf.draw_capsule(185, 265, 215, 265, 24, *SHORTS)
        buf.draw_capsule(185, 275, 185, 345, 12, *SKIN)
        buf.draw_capsule(215, 275, 215, 345, 12, *SKIN)
        buf.draw_ring(185, 310, 14, 5, *NEON, glow=True)
        buf.draw_ring(215, 310, 14, 5, *NEON, glow=True)

        # Light-blue Watering Can in hands
        buf.draw_capsule(210, 215, 270, 240, 10, *SKIN)
        buf.draw_capsule(270, 235, 305, 250, 16, 100, 195, 245) # Can body
        buf.draw_line(300, 245, 335, 275, 6, 90, 180, 235) # Spout
        # Sparkling water drops
        buf.draw_circle(335, 288, 4, 0, 210, 255)
        buf.draw_circle(342, 302, 3, 0, 210, 255)
        buf.draw_circle(345, 318, 4, 0, 210, 255)

        # Blooming flower in pot
        buf.draw_line(345, 345, 345, 325, 4, 47, 124, 88) # Stem
        buf.draw_circle(345, 320, 12, 239, 93, 136) # Pink flower
        buf.draw_circle(345, 320, 5, 244, 182, 74) # Yellow center
        buf.draw_capsule(335, 355, 355, 355, 10, 180, 120, 80) # Pot

    return buf

# Pose Mappings from docs/06_Nini_Pose_Prompt_Set-1.md
POSE_MAP = {
    'nini.png': 'standing',
    'nini-1.png': 'standing',
    'nini-2.png': 'standing',
    'nini-3.png': 'standing',
    'nini-7.png': 'standing',
    'nini-s-1.png': 'seated_ready',
    'nini-s-2.png': 'seated_toe',
    'nini-s-3.png': 'seated_lift',
    'nini-s-4.png': 'seated_hold',
    'nini-s-5.png': 'seated_lower',
    'nini-s-6.png': 'seated_hold',
    'nini-s-7.png': 'seated_toe',
    'nini-s-8.png': 'seated_ready',
    'nini-s-9.png': 'seated_toe',
    'nini-s-10.png': 'seated_ready',
    'nini-l-1.png': 'lying_ready',
    'nini-l-2.png': 'lying_ready',
    'nini-l-3.png': 'lying_lift',
    'nini-l-4.png': 'lying_lift',
    'nini-l-5.png': 'lying_ready',
    'nini-l-6.png': 'lying_ready',
    'nini-l-7.png': 'lying_ready',
    'nini-l-8.png': 'lying_lift',
    'nini-l-9.png': 'lying_ready',
    'nini-h-1.png': 'standing_table',
    'nini-h-2.png': 'standing_table',
    'nini-h-3.png': 'standing_table',
    'nini-h-4.png': 'standing_table',
    'nini-h-5.png': 'standing_table',
    'nini-h-6.png': 'standing_table',
    'nini-b-1.png': 'breathing',
    'nini-b-2.png': 'breathing',
    'nini-b-3.png': 'breathing',
    'nini-b-4.png': 'breathing',
    'nini-b-5.png': 'breathing',
    'nini-e-1.png': 'celebration',
    'nini-n-1.png': 'standing'
}

print("Generating all Nini pose PNG files...")
for filename, pose_type in POSE_MAP.items():
    buf = create_pose(pose_type)
    png_data = buf.to_png_bytes()
    filepath = os.path.join(OUTPUT_DIR, filename)
    with open(filepath, 'wb') as f:
        f.write(png_data)
    print(f"Generated {filepath} ({len(png_data)} bytes)")

print("All Nini PNG assets successfully generated!")
