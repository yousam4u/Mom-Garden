# 니니(Nini) 운동 포즈 이미지 생성 프롬프트 세트

문서 버전: v1.0
작성일: 2026-09-20
기준 앱: 엄마의 정원
기준 캐릭터: 니니 (nini.png / nani-sheet.png 마스터 시트)
저장 경로: `G:\내 드라이브\13_Multi_Agent\YouDefine-AI-OS\apps\Mom's-Garden\`

---

## 0. 공통 규칙 (모든 컷에 적용)

### 0.1 캐릭터 레퍼런스

- 생성 시 반드시 `nini.png`를 캐릭터 참조 이미지로 첨부한다.
  - Midjourney: `--cref nini.png --cw 100`
  - 기타 생성기(GPT 이미지, Nano Banana 등): 참조 이미지 업로드 + "동일 캐릭터 유지" 지시
- 의상·소품 고정: 흰 크롭 후드집업 + 파란 잎사귀 로고 흰 티셔츠 + 파란 반바지(안에 검정 바이커쇼츠) + 양 무릎의 **네온블루 발광 링 무릎패드** + 흰·파랑 청키 운동화 + 흰 양말 + 하늘색 곱창밴드 갈색 포니테일.

### 0.2 공통 스타일 프롬프트 (영문, 매 프롬프트 앞부분 [STYLE] 위치에 삽입)

```
cute 3D chibi girl character "Nini", big sparkling brown eyes, brown high ponytail with light-blue scrunchie, white cropped zip-up hoodie over white t-shirt with blue leaf logo, blue athletic shorts over black bike shorts, glowing neon-blue circular knee pads on both knees, white and blue chunky sneakers with white socks, soft Pixar-style 3D render, bold clean silhouette, warm friendly mood
```

### 0.3 공통 품질·왜곡 방지 프롬프트 (영문, 매 프롬프트 끝 [SAFE] 위치에 삽입)

```
full body, isolated on transparent background, correct human anatomy, exactly two arms and two legs, five fingers per hand, natural joint angles, no body distortion, no extra limbs, consistent character design identical to reference, no text, no letters, no numbers, no watermark, high detail, clean edges
```

### 0.4 촬영 규칙

| 컷 종류 | 뷰 | 이유 |
|---|---|---|
| 운동 시연 컷 (s/l/h 시리즈) | **측면(side view), 캐릭터가 오른쪽을 바라봄** | 무릎·발목 각도가 보여야 어른이 따라 할 수 있음 |
| 호흡·감정 컷 (b/e 시리즈) | 정면 또는 3/4 뷰 | 표정 전달 우선 |
| 좌/우 구분 | 오른쪽 다리 기준으로 1장만 생성 → **왼쪽은 앱에서 좌우 반전(flip)으로 처리** | 중복 생성 방지 |

### 0.5 화살표·표시 규칙

- 이미지 안 글자 금지. 움직임 방향은 **파란색 곡선 화살표**, 경고는 주황색만 사용.
- 무릎 링: 평상시 파란 발광, 통증·경고 컷만 주황 발광 (기존 nini-7 규칙 유지).

---

## 1. 앉아서 하기 — nini-s 시리즈 (기존 s-1~s-3 보유, 신규 7컷)

### nini-s-4 | A-1 무릎 편 채 유지 (phase-hold) — 1순위

- 한글 요약: 의자에 앉아 한쪽 다리를 수평으로 편 채 정지. 무릎은 살짝 여유(과신전 금지), 집중하며 참는 귀여운 표정.
- 파일명: `nini-s-4.png`

```
[STYLE], side view facing right, sitting deep on a simple gray chair with backrest, right leg extended straight forward and held horizontal, knee soft not locked, left foot flat on floor, both hands resting on chair sides, cheeks slightly puffed concentrating expression holding the pose, small blue glow on the extended knee, [SAFE]
```

### nini-s-5 | A-2 천천히 내려요 (phase-lower) — 1순위

- 한글 요약: 편 다리를 약 45°까지 내리는 중간 동작 + 아래 방향 곡선 화살표. 부드럽게 내리는 느낌.
- 파일명: `nini-s-5.png`

```
[STYLE], side view facing right, sitting deep on a simple gray chair with backrest, right leg lowering halfway down at 45 degrees mid-motion, gentle downward curved blue arrow beside the calf showing slow lowering, relaxed gentle smile, left foot flat on floor, [SAFE]
```

### nini-s-6 | A-3 양쪽 다리 펴고 유지

- 한글 요약: 두 다리를 함께 낮게 펴서 3~5초 유지. 살짝 뿌듯한 미소.
- 파일명: `nini-s-6.png`

```
[STYLE], side view facing right, sitting deep on a simple gray chair, both legs extended together straight forward held low and horizontal, hands gripping chair seat for support, proud gentle smile, blue glow on both knees, [SAFE]
```

### nini-s-7 | A-4 발 방향 바꾸고 무릎 펴기

- 한글 요약: 다리 하나를 편 채 발끝이 바깥/안쪽으로 도는 작은 회전 화살표. 허벅지를 양손으로 고정.
- 파일명: `nini-s-7.png`

```
[STYLE], three-quarter front view, sitting on the front edge of a simple gray chair, right leg extended forward, both hands holding the right thigh to keep it still, foot rotated slightly outward with a small curved blue double-headed arrow around the ankle showing gentle rotation, curious focused expression, [SAFE]
```

### nini-s-8 | A-5 앉은 제자리 걷기

- 한글 요약: 앉은 채 한 발바닥만 살짝 든 걷기 동작. 발을 높이 들지 않는 게 포인트.
- 파일명: `nini-s-8.png`

```
[STYLE], side view facing right, sitting deep on a simple gray chair, marching in place while seated, right foot lifted only slightly a few centimeters off the floor, left foot flat, arms swinging naturally in small motion, cheerful smile, small blue arrow under the lifted foot, [SAFE]
```

### nini-s-9 | A-6 앉아서 발뒤꿈치 들기

- 한글 요약: 앉은 채 앞꿈치는 바닥, 양 뒤꿈치만 살짝 들기.
- 파일명: `nini-s-9.png`

```
[STYLE], side view facing right, sitting deep on a simple gray chair, both heels raised slightly off the floor while toes stay planted, hands resting on thighs, calm focused smile, small blue upward arrow behind the heels, [SAFE]
```

### nini-s-10 | A-7 일어나기 전 허벅지 힘주기

- 한글 요약: 엉덩이는 의자에 붙인 채 일어날 듯 발로 바닥을 미는 등척성 자세. 허벅지에 힘 들어간 표현.
- 파일명: `nini-s-10.png`

```
[STYLE], side view facing right, sitting on a simple gray chair leaning torso slightly forward as if about to stand up, hips still firmly on the seat, both feet pressing into the floor, hands on knees, determined cute expression with small effort lines, soft blue glow on thighs, [SAFE]
```

---

## 2. 누워서 하기 — nini-l 시리즈 (전량 신규 9컷, 측면 필수)

### nini-l-1 | B-1 준비 자세 (phase-ready) — 2순위

- 한글 요약: 등을 대고 누워 한쪽 무릎 세움, 반대 다리는 편 상태. 목·어깨 힘 뺀 편안한 표정.
- 파일명: `nini-l-1.png`

```
[STYLE], full side view facing right, lying on her back on a thin light-blue exercise mat, left knee bent with foot flat on the mat, right leg extended straight resting on the mat, arms relaxed at her sides, head resting comfortably, peaceful relaxed smile, [SAFE]
```

### nini-l-2 | B-2 발끝 당겨요 (phase-toe) — 2순위

- 한글 요약: 같은 자세에서 편 다리 발끝을 몸 쪽으로 당김(발목 배굴) + 작은 화살표.
- 파일명: `nini-l-2.png`

```
[STYLE], full side view facing right, lying on her back on a thin light-blue exercise mat, left knee bent with foot flat, right leg extended straight with ankle flexed pulling toes toward her body, small curved blue arrow at the toes pointing toward her head, gentle focused expression, [SAFE]
```

### nini-l-3 | B-3 다리 10cm 들어요 (phase-lift) — 2순위

- 한글 요약: 편 다리를 바닥에서 10cm만 낮게 들기. 바닥과의 낮은 간격이 잘 보이도록 점선 표시.
- 파일명: `nini-l-3.png`

```
[STYLE], full side view facing right, lying on her back on a thin light-blue exercise mat, left knee bent with foot flat, right leg extended straight lifted only about 10 centimeters above the mat, a subtle dotted blue line under the raised leg showing the small low gap from the floor, lower back staying flat on the mat, calm effort expression, [SAFE]
```

### nini-l-4 | B-4 허리 붙이고 유지 (phase-hold) — 2순위

- 한글 요약: 낮게 든 상태 유지. 허리가 바닥에 붙어 있음을 파란 하이라이트/체크로 강조.
- 파일명: `nini-l-4.png`

```
[STYLE], full side view facing right, lying on her back on a thin light-blue exercise mat, left knee bent, right leg extended and held low above the mat, soft blue glowing highlight along her lower back touching the mat with a small blue check mark above it, steady gentle smile holding the pose, [SAFE]
```

### nini-l-5 | B-5 천천히 내려요 (phase-lower) — 2순위

- 한글 요약: 든 다리를 천천히 바닥으로 내리는 중간 컷 + 아래 방향 곡선 화살표.
- 파일명: `nini-l-5.png`

```
[STYLE], full side view facing right, lying on her back on a thin light-blue exercise mat, left knee bent, right leg mid-motion lowering gently back toward the mat, soft downward curved blue arrow under the calf, relaxed exhaling expression, [SAFE]
```

### nini-l-6 | B-6 뒤꿈치 미끄러뜨리기

- 한글 요약: 뒤꿈치를 바닥에 붙인 채 무릎을 굽혔다 펴는 슬라이드 + 이동 화살표.
- 파일명: `nini-l-6.png`

```
[STYLE], full side view facing right, lying on her back on a thin light-blue exercise mat, right knee half bent with heel touching the mat sliding toward her hips, left leg extended, horizontal blue double-headed arrow along the mat under the sliding heel, playful focused expression, [SAFE]
```

### nini-l-7 | B-7 누워서 무릎 벌리기

- 한글 요약: 양 무릎 세운 상태에서 다리를 바깥으로 작게 벌림. 정면 컷.
- 파일명: `nini-l-7.png`

```
[STYLE], front view from her feet at a slight high angle, lying on her back on a thin light-blue exercise mat, both knees bent with feet flat on the mat, knees opened slightly apart outward, two small outward curved blue arrows beside the knees, pelvis stable, soft cheerful expression, [SAFE]
```

### nini-l-8 | B-8 조개껍질 운동

- 한글 요약: 옆으로 누워 무릎 60° 굽히고, 발은 붙인 채 위쪽 무릎만 열기.
- 파일명: `nini-l-8.png`

```
[STYLE], side-lying pose seen from the front, lying on her left side on a thin light-blue exercise mat, head resting on her left arm, both knees bent about 60 degrees, feet touching together, top right knee lifted open like a clamshell, small curved blue arrow above the top knee, hips stacked not rolling back, sweet focused smile, [SAFE]
```

### nini-l-9 | B-9 무릎 좌우 흔들기 (장운동 공용)

- 한글 요약: 양 무릎 세우고 좌우로 작게 기울이기 + 좌우 화살표.
- 파일명: `nini-l-9.png`

```
[STYLE], front view from her feet at a slight high angle, lying on her back on a thin light-blue exercise mat, both knees bent together tilted gently to one side in small motion, left-right blue double-headed arrow above the knees, arms relaxed on the mat, comfy relaxed smile, [SAFE]
```

---

## 3. 집안 가벼운 운동 — nini-h 시리즈 (전량 신규 6컷, 지지물 포함)

지지물은 앱 안전 원칙(바퀴 의자 금지)에 따라 **고정된 나무 식탁 모서리**로 통일한다.

### nini-h-1 | C-1 잡아요 (phase-ready) — 3순위

- 한글 요약: 식탁을 양손으로 가볍게 잡고 골반 너비로 선 자세, 시선 정면.
- 파일명: `nini-h-1.png`

```
[STYLE], side view facing right, standing upright beside a sturdy small wooden table, both hands lightly holding the table edge, feet hip-width apart flat on the floor, looking forward with a reassuring smile, stable calm posture, [SAFE]
```

### nini-h-2 | C-2 뒤꿈치만 들어요 (phase-lift) — 3순위

- 한글 요약: 지지물 잡은 채 뒤꿈치만 살짝 들기(앞꿈치 바닥 고정) + 위 화살표.
- 파일명: `nini-h-2.png`

```
[STYLE], side view facing right, standing beside a sturdy small wooden table holding its edge with both hands, both heels raised slightly off the floor while toes stay planted, calves gently engaged, small blue upward arrow behind the heels, happy focused expression, [SAFE]
```

### nini-h-3 | C-3 잠깐 유지 (phase-hold) — 3순위

- 한글 요약: 뒤꿈치 든 상태를 흔들림 없이 유지. 안정감 있는 표정.
- 파일명: `nini-h-3.png`

```
[STYLE], side view facing right, standing beside a sturdy small wooden table holding its edge, heels held raised in a steady balanced position, body straight and stable with no leaning, serene confident smile, soft blue glow on ankles, [SAFE]
```

### nini-h-4 | C-4 천천히 내려요 (phase-lower) — 3순위

- 한글 요약: 뒤꿈치를 천천히 내리는 컷 + 아래 화살표.
- 파일명: `nini-h-4.png`

```
[STYLE], side view facing right, standing beside a sturdy small wooden table holding its edge, heels lowering gently back to the floor mid-motion, small blue downward arrow behind the heels, relaxed gentle smile, [SAFE]
```

### nini-h-5 | C-5 지지물 잡고 제자리 걷기

- 한글 요약: 식탁 잡고 무릎을 높이 들지 않는 제자리 걷기, 한 발만 살짝 들림.
- 파일명: `nini-h-5.png`

```
[STYLE], side view facing right, standing beside a sturdy small wooden table holding its edge with one hand, marching gently in place, right foot lifted only slightly off the floor with knee kept low, cheerful easy smile, small blue arrow under the lifted foot, [SAFE]
```

### nini-h-6 | C-6 작은 옆걸음

- 한글 요약: 식탁 잡고 한 다리를 옆으로 한 뼘 이하로 벌리기 + 옆 화살표.
- 파일명: `nini-h-6.png`

```
[STYLE], front view, standing behind a sturdy small wooden table holding its edge with both hands, stepping her right leg a small step sideways keeping toes pointing forward, short horizontal blue arrow beside the moving foot, upright stable torso, encouraging smile, [SAFE]
```

---

## 4. 장운동 / 편안 운동 — nini-b 시리즈 (전량 신규 5컷, 표정 위주)

### nini-b-1 | D-1 숨 들이마셔요 — 4순위

- 한글 요약: 의자에 앉아 양손을 배 위에 올리고 코로 들이마심. 배가 살짝 부풀고 눈 감은 편안한 표정.
- 파일명: `nini-b-1.png`

```
[STYLE], three-quarter front view, sitting comfortably on a simple gray chair, both hands resting softly on her belly, eyes gently closed, breathing in through the nose with belly slightly rounded, tiny sparkles floating around, deeply peaceful expression, [SAFE]
```

### nini-b-2 | D-2 잠깐 멈춰요 — 4순위

- 한글 요약: 어깨 힘 뺀 채 잠깐 정지, 잔잔한 미소.
- 파일명: `nini-b-2.png`

```
[STYLE], three-quarter front view, sitting comfortably on a simple gray chair, hands resting on her belly, shoulders relaxed and dropped, eyes closed with a calm serene smile, completely still and quiet mood, soft warm lighting feel, [SAFE]
```

### nini-b-3 | D-3 길게 내쉬어요 — 4순위

- 한글 요약: 입으로 길게 내쉬며 몸이 살짝 가라앉는 컷, 입에서 나가는 부드러운 바람 표현.
- 파일명: `nini-b-3.png`

```
[STYLE], three-quarter front view, sitting comfortably on a simple gray chair, exhaling slowly through slightly open mouth, a soft translucent light-blue breath wisp flowing out, torso settling down gently, deeply relieved comfortable expression, [SAFE]
```

### nini-b-4 | D-4 배 시계방향 마사지 — 4순위

- 한글 요약: 손이 배꼽 주변을 도는 원형 화살표(시계방향 명시). 절대 누르지 않는 부드러운 손.
- 파일명: `nini-b-4.png`

```
[STYLE], front view, sitting comfortably on a simple gray chair, one hand resting flat and soft on her belly, a thin circular blue arrow around the hand showing clockwise direction, other hand relaxed on thigh, gentle nurturing smile with eyes softly open, [SAFE]
```

### nini-b-5 | D-5 편안한 휴식 — 4순위

- 한글 요약: 눈 감고 호흡 고르는 마무리 컷.
- 파일명: `nini-b-5.png`

```
[STYLE], three-quarter front view, sitting comfortably on a simple gray chair leaning slightly back, hands loosely folded on her lap, eyes closed with the most peaceful sleepy-happy smile, tiny stars and sparkles floating around her head, resting finished mood, [SAFE]
```

---

## 5. 보조 컷 — nini-e 시리즈 (1컷 + 규칙 1건)

### nini-e-1 | 물뿌리개 든 니니 (정원 보상용)

- 한글 요약: 파란 물뿌리개로 꽃에 물 주는 니니. 홈/완료 화면의 정원 보상 연출용.
- 파일명: `nini-e-1.png`

```
[STYLE], three-quarter front view, standing and happily tilting a light-blue watering can with both hands, sparkling water drops pouring out in a gentle arc onto a small pink blooming flower in a pot at her feet, delighted warm smile, tiny sparkles around the flower, [SAFE]
```

### 좌/우 다리 규칙 (이미지 생성 없음)

- 모든 운동 컷은 **오른쪽 다리 기준 1장만** 생성한다.
- "왼쪽으로 바꿔요" 단계는 앱에서 CSS `transform: scaleX(-1)` 좌우 반전으로 처리한다. 별도 생성 금지(중복 방지).
- 반전 시 후드 지퍼·로고 방향이 뒤집히지만, 시연 목적상 허용. 마스터 시트와 나란히 노출되는 화면(홈·완료)에는 반전 이미지를 쓰지 않는다.

---

## 6. 제작 체크리스트 (우선순위 순)

| 순위 | 컷 | 수량 | 완료 시 효과 |
|---:|---|---:|---|
| 1 | nini-s-4, s-5 | 2 | 앉아서 모드 5단계 완성 (s-1~3과 결합) |
| 2 | nini-l-1 ~ l-5 | 5 | 누워서 모드 기본 5단계 완성 |
| 3 | nini-h-1 ~ h-4 | 4 | 집안 운동 4단계 완성 |
| 4 | nini-b-1 ~ b-5 | 5 | 장운동 3단계 + 마사지 + 휴식 완성 |
| 5 | nini-s-6 ~ s-10, l-6 ~ l-9, h-5 ~ h-6, e-1 | 12 | 선택 운동·보상 연출 확장 |

생성 후 검수 기준: (1) 무릎 패드 파란 링 유지 (2) 의상 동일 (3) 운동 컷은 측면·오른쪽 다리 (4) 이미지 내 글자 없음 (5) 투명 배경.
