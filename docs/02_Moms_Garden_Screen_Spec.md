# 엄마의 정원 Screen Specification

문서 ID: SCREEN-SPEC-001  
버전: v0.2  
작성일: 2026-08-11  
상태: Draft  
관련 PRD: `01_Moms_Garden_PRD.md`

## 1. Project Context

70대 어른이 혼자서도 집에서 무릎 운동을 시작하고 완료할 수 있도록, 화면 수를 줄이고 큰 캐릭터, 큰 글자, 음성 구령, 정원 보상을 중심으로 설계한다. MVP는 모바일 세로 화면을 기본으로 하며, 모든 조작은 단순 탭으로 끝나야 한다.

## 2. Screen Inventory

| Screen ID | 화면명 | Depth | 인증 | 핵심 목적 | 관련 Requirement |
|---|---|---:|:---:|---|---|
| SCR-HOME-001 | 오늘의 정원 | 0 | N | 오늘 운동 상태 확인 및 시작 | REQ-HOME-001 |
| SCR-PLAN-001 | 운동 고르기 | 1 | N | 오늘 할 운동 모드 선택 | REQ-PLAN-001 |
| SCR-PREP-001 | 준비 자세 | 2 | N | 안전 안내와 자세 준비 | REQ-SAFE-001 |
| SCR-EXER-001 | 운동 따라 하기 | 3 | N | 캐릭터/구령에 맞춰 운동 | REQ-EXER-001 |
| SCR-REST-001 | 잠깐 쉬기 | 4 | N | 세트 사이 회복 | REQ-EXER-001 |
| SCR-SAFE-001 | 멈춤 안내 | Overlay | N | 통증/허리 부담 시 중단 | REQ-SAFE-001 |
| SCR-DONE-001 | 완료와 물주기 | 4 | N | 보상과 칭찬 | REQ-REWARD-001 |


## 3. Navigation Map

```text
SCR-HOME-001
├── SCR-PLAN-001
│   └── SCR-PREP-001
│       └── SCR-EXER-001
│           ├── SCR-REST-001
│           ├── SCR-SAFE-001
│           └── SCR-DONE-001

```

Back 정책: 운동 중 Back 또는 브라우저 뒤로가기는 실수 방지를 위해 `그만할까요?` 확인을 먼저 표시한다.

## 4. Global UI Rules

| 항목 | 규칙 |
|---|---|
| Typography | 본문 20px 이상, 버튼 22px 이상, 운동 카운트 56px 이상 |
| Button | 핵심 CTA는 화면 폭 80% 이상, 최소 높이 56px |
| Color | 완료/주의/중단 상태는 색상+문구+아이콘으로 함께 표현 |
| Motion | 캐릭터 동작은 천천히, 반복 속도는 단계별 조절 |
| Sound | 음성 안내는 항상 On, 느린 속도를 기본으로 고정 |
| Text | 한 화면에 긴 설명을 넣지 않고 음성과 짧은 문구로 분산 |
| Gesture | 탭만 필수, 스와이프/롱프레스 의존 금지 |

## 5. Screen Specs

## SCR-HOME-001 — 오늘의 정원

### Purpose
사용자가 앱을 열자마자 오늘 운동 상태를 보고 바로 운동을 시작한다.

### Entry / Exit
| 항목 | 정의 |
|---|---|
| Entry | 앱 실행, 완료 후 돌아오기 |
| Exit | 운동 고르기, 다리운동 방법 |
| Back | 앱 종료 또는 이전 브라우저 상태 |

### Layout
```text
┌────────────────────────┐
│ 오늘 운동 단계          │
│ [1단계][2단계][3단계]   │
│ 선택 횟수·세트          │
│ [꽃/화분/캐릭터]        │
│ 물뿌리개 ○ ○ ○         │
│ [운동 시작]             │
└────────────────────────┘
```

### UI Elements
| UI ID | Element | Component | State | Action |
|---|---|---|---|---|
| UI-HOME-01 | 1·2·3단계 | 3-Button Segmented Control | Selected/Focus | 단계별 횟수·세트 즉시 저장 |
| UI-HOME-02 | 선택 결과 | Status Text | 10×3/12×4/15×5 | 현재 단계와 반복 표시 |
| UI-HOME-03 | 정원 그림 | Visual Area | Empty/Growing/Bloom | 기록 상태 표현 |
| UI-HOME-04 | 운동 꽃 3개 | Progress Icon | 0/1/2/3 complete | 오늘 완료 횟수 표시 |
| UI-HOME-05 | 운동 시작 | Primary Button | Default/Pressed | SCR-PLAN-001 이동 |

### States
| State | Trigger | UI | Action |
|---|---|---|---|
| Initial | 첫 사용 | 씨앗 정원, 빈 물뿌리개 | 운동 시작 유도 |
| Success | 오늘 완료 기록 있음 | 채워진 물뿌리개 | 다음 운동 안내 |
| Offline | 네트워크 없음 | 로컬 정원 그대로 표시 | 계속 사용 가능 |
| Error | 로컬 데이터 파싱 실패 | 기본 정원 복구 안내 | 기록 초기화 확인 |

### Accessibility
정원 이미지는 `오늘 운동 1회 완료, 물뿌리개 1개 채움`처럼 상태를 읽어준다. 물뿌리개는 색상만으로 구분하지 않고 채움/비움 아이콘 형태를 다르게 한다.

### Analytics / QA
Event: EVT-HOME-001  
Test: TC-HOME-001 - 첫 실행, 1회 완료, 3회 완료, 어제 미완료 상태에서 홈 문구가 벌점처럼 보이지 않는지 확인.

## SCR-PLAN-001 — 운동 고르기

### Purpose
사용자가 몸 상태에 맞는 운동 모드를 쉽게 선택한다.

### Layout
```text
┌────────────────────────┐
│ ← 오늘은 어떤 운동?     │
│ [오늘 추천 5분]         │
│ [앉아서 하기]           │
│ [누워서 하기]           │
│ 더 보기: 집안/장운동    │
└────────────────────────┘
```

### UI Elements
| UI ID | Element | Component | 표시 조건 | Action |
|---|---|---|---|---|
| UI-PLAN-01 | 오늘 추천 | Large Button | 항상 | 가장 낮은 부담 루틴 선택 |
| UI-PLAN-02 | 앉아서 하기 | Large Button | 항상 | seated 루틴 선택 |
| UI-PLAN-03 | 누워서 하기 | Large Button | 항상 | lying 루틴 선택 |
| UI-PLAN-04 | 더 보기 | Text Button | 항상 | 집안/장운동 옵션 확장 |

### Business Rules
| Rule ID | 조건 | 처리 |
|---|---|---|
| BR-PLAN-001 | 최근 중단이 2회 이상 | 오늘 추천은 1단계 5분으로 설정 |
| BR-PLAN-002 | 사용자가 장운동 선택 | 강한 복부 압박 금지 안내를 먼저 표시 |

### States
Loading: N/A - 로컬 화면  
Empty: N/A - 기본 모드 내장  
Offline: 동일하게 사용 가능

### Accessibility / QA
각 운동 버튼에는 예상 시간과 자세가 텍스트로 함께 표시된다.  
Test: TC-PLAN-001 - 큰 글씨 모드에서 버튼 문구가 잘리지 않는지 확인.

## SCR-PREP-001 — 준비 자세

### Purpose
운동 전 안전 조건과 자세를 짧고 명확하게 안내한다.

### UI Elements
| UI ID | Element | Component | Action |
|---|---|---|---|
| UI-PREP-01 | 캐릭터 준비 자세 | Animation | 선택 모드의 시작 자세 표시 |
| UI-PREP-02 | 안전 문구 | Text + Voice | 통증/어지럼/숨참 중단 안내 |
| UI-PREP-03 | 시작해요 | Primary Button | SCR-EXER-001 이동 |
| UI-PREP-04 | 오늘은 쉴래요 | Secondary Button | SCR-HOME-001 이동 |

### UX Writing
- `아프면 바로 멈추세요.`
- `허리가 뜨면 다리를 낮게 들어요.`
- `움직이는 의자는 잡지 마세요.`

### Safety Variants
| 모드 | 핵심 안내 |
|---|---|
| 앉아서 | 발은 바닥에, 허리는 편하게 세워요 |
| 누워서 | 허리는 바닥에 편하게, 다리는 낮게 들어도 좋아요 |
| 집안 | 벽이나 식탁처럼 움직이지 않는 곳을 잡아요 |
| 장운동 | 배를 세게 누르지 말고 숨을 천천히 쉬어요 |

## SCR-EXER-001 — 운동 따라 하기

### Purpose
사용자가 캐릭터와 음성 구령만 보고 운동을 완료한다.

### Layout
```text
┌────────────────────────┐
│ 1세트 / 3세트           │
│        07              │
│ [복실이 동작 애니메이션] │
│ "무릎 쭉, 천천히요"     │
│ [잠깐 쉬기] [그만하기]  │
└────────────────────────┘
```

### UI Elements
| UI ID | Element | Component | State | Action |
|---|---|---|---|---|
| UI-EXER-01 | 세트 표시 | Text | 1/2/3 | 현재 세트 표시 |
| UI-EXER-02 | 큰 카운트 | Number | 1~15 | 회차 표시 |
| UI-EXER-03 | 캐릭터 | Animation | Prepare/Raise/Hold/Lower/Rest | 자세 안내 |
| UI-EXER-04 | 구령 문구 | Text + TTS | Normal/Safety Tip | 음성 출력 |
| UI-EXER-05 | 잠깐 쉬기 | Button | Default/Pressed | SCR-REST-001 |
| UI-EXER-06 | 그만하기 | Button | Default/Pressed | SCR-SAFE-001 또는 종료 확인 |
| UI-EXER-07 | 아파요 | Safety Button | 항상 | 즉시 정지 |

### Character Motion Rules
| 운동 | 동작 표현 |
|---|---|
| 앉은 무릎 펴기 | 앉은 캐릭터가 한쪽 무릎을 천천히 편다. 얼굴은 편안한 집중 표정. |
| 누운 하지직거상 | 누운 캐릭터가 한쪽 다리를 낮은 각도로 올리고 허리 주의 아이콘이 함께 표시된다. |
| 발목 펌프 | 발끝을 몸쪽/바깥쪽으로 움직이는 발 부분 확대 컷을 표시한다. |
| 장운동 호흡 | 배 위에 손을 얹고 천천히 숨 쉬는 표정을 표시한다. |

### States
| State | Trigger | UI | Action |
|---|---|---|---|
| Running | 운동 시작 | 카운트/캐릭터/TTS 진행 | 자동 진행 |
| Paused | 잠깐 쉬기 | 재개/그만하기 | 재개 가능 |
| Safety Stop | 아파요/허리 불편 | 중단 안내 | 쉬기 또는 종료 |
| Complete | 마지막 세트 완료 | 완료 처리 | SCR-DONE-001 |
| Offline | 네트워크 없음 | 영향 없음 | 로컬 진행 |

### Business Rules
- BR-EXER-001: 1세트 기본 10~15회, 단계별 조절 가능.
- BR-EXER-002: 한 회 동작은 반동 없이 천천히 진행하도록 4~6초 템포를 기본으로 한다.
- BR-EXER-003: 같은 안전 멘트를 매 회 반복하지 않고 3~4회마다 섞는다.

### Analytics / QA
Events: EVT-EXER-001, EVT-EXER-002, EVT-SAFE-001  
Test: TC-EXER-001 - 카운트, 음성, 캐릭터 동작이 같은 회차에 맞춰 움직이는지 확인.

## SCR-REST-001 — 잠깐 쉬기

### Purpose
운동 세트 사이에 부담 없이 쉬고 다시 시작한다.

### UI Elements
| UI ID | Element | Component | Action |
|---|---|---|---|
| UI-REST-01 | 남은 휴식 시간 | Timer | 자동 카운트다운 |
| UI-REST-02 | 복실이 격려 | Text + Voice | 자세 팁 제공 |
| UI-REST-03 | 다시 시작 | Primary Button | SCR-EXER-001 복귀 |
| UI-REST-04 | 그만하기 | Secondary Button | 종료 확인 |

### State
휴식 시간이 끝나도 자동 재시작하지 않고 `다시 시작`을 크게 보여준다. 70대 사용자가 준비되지 않았을 때 놀라지 않게 하기 위한 규칙이다.

## SCR-SAFE-001 — 멈춤 안내

### Purpose
통증, 허리 불편, 어지럼, 숨참이 있을 때 운동 완료보다 중단을 우선하게 한다.

### UI Elements
| UI ID | Element | Component | Action |
|---|---|---|---|
| UI-SAFE-01 | 경고 문구 | Alert Text | `오늘은 여기까지 해도 괜찮아요` |
| UI-SAFE-02 | 쉬었다가 계속 | Primary Button | SCR-REST-001 |
| UI-SAFE-03 | 오늘은 그만 | Secondary Button | SCR-HOME-001 |
| UI-SAFE-04 | 심하면 도움 요청 | Text | 보호자/의료진 문의 안내 |

### Validation
통증 선택 시 보상 화면으로 보내지 않는다. 다만 실패 문구를 사용하지 않는다.

### UX Writing
`무리하지 않는 게 제일 잘하는 거예요. 잠깐 쉬었다가 괜찮으면 다시 해요.`

## SCR-DONE-001 — 완료와 물주기

### Purpose
운동 완료를 정서적 보상으로 마무리하고 다음 반복을 유도한다.

### UI Elements
| UI ID | Element | Component | Action |
|---|---|---|---|
| UI-DONE-01 | 물주기 애니메이션 | Animation | 자동 재생 |
| UI-DONE-02 | 꽃 성장 | Visual | 단계 업데이트 |
| UI-DONE-03 | 칭찬 문구 | Text + Voice | 랜덤 칭찬 |
| UI-DONE-04 | 정원으로 가기 | Primary Button | SCR-HOME-001 |

### Business Rules
- BR-REWARD-001: 운동을 끝까지 완료한 경우에만 물뿌리개를 채운다.
- BR-REWARD-002: 하루 3회 완료 시 특별 칭찬과 배지를 표시한다.
- BR-REWARD-003: 연속 기록이 끊겨도 시들기/실패 표현을 하지 않는다.

## SCR-HOME-LEVEL — 홈 단계 선택

### Purpose
별도 설정 화면 없이 홈에서 한 번의 탭으로 운동 횟수와 세트를 결정한다.

### Rules
| 단계 | 횟수 | 세트 | 선택 결과 |
|---|---:|---:|---|
| 1단계 | 10회 | 3세트 | 선택 꽃 표시, 로컬 저장 |
| 2단계 | 12회 | 4세트 | 선택 꽃 표시, 로컬 저장 |
| 3단계 | 15회 | 5세트 | 선택 꽃 표시, 로컬 저장 |

음성과 속도는 고령 사용자의 조작 단계를 줄이기 위해 음성 On·느리게로 고정한다. 저장된 단계는 다음 실행에서도 유지한다.

## 6. Responsive / Adaptive

| Mode | Width | Layout |
|---|---|---|
| Compact | 320~480px | 1열, 하단 큰 CTA |
| Medium | 481~768px | 1열 유지, 캐릭터 영역 확대 |
| Expanded | 769px 이상 | 중앙 420~520px 앱 프레임, 배경은 단순 정원색 |

Landscape에서는 운동 화면의 캐릭터와 카운트가 겹치지 않도록 카운트를 왼쪽, 캐릭터를 오른쪽으로 배치할 수 있다.

## 7. Accessibility

- 모든 버튼은 명확한 accessible name을 가진다.
- 운동 카운트 변화는 너무 자주 스크린리더로 읽지 않고, 세트/완료/중단 같은 중요한 변화만 알린다.
- 음성 안내와 같은 단계·횟수·안전 정보가 화면의 텍스트로도 보인다.
- 애니메이션만으로 자세를 전달하지 않고 핵심 문구를 함께 표시한다.
- `아파요` 버튼은 항상 같은 위치에 둔다.

## 8. QA Matrix

| TC ID | Requirement | Screen | 조건 | 행동 | 기대 결과 | 우선순위 |
|---|---|---|---|---|---|---|
| TC-HOME-001 | REQ-HOME-001 | SCR-HOME-001 | 첫 실행 | 홈 진입 | 빈 물뿌리개 3개와 운동 시작 표시 | P0 |
| TC-PLAN-001 | REQ-PLAN-001 | SCR-PLAN-001 | 큰 글씨 | 모드 선택 | 문구 잘림 없이 준비 화면 이동 | P0 |
| TC-EXER-001 | REQ-EXER-001 | SCR-EXER-001 | 운동 시작 | 1세트 진행 | 캐릭터/카운트/음성 동기화 | P0 |
| TC-SAFE-001 | REQ-SAFE-001 | SCR-EXER-001 | 운동 중 | 아파요 선택 | 즉시 정지 및 멈춤 안내 | P0 |
| TC-REWARD-001 | REQ-REWARD-001 | SCR-DONE-001 | 루틴 완료 | 완료 화면 진입 | 물주기/꽃 성장/칭찬 표시 | P0 |
| TC-LEVEL-001 | REQ-PLAN-001 | SCR-HOME-001 | 1단계 선택 상태 | 2단계 탭 | 12회 × 4세트 표시 및 로컬 저장 | P0 |
| TC-A11Y-001 | 전체 | 전체 | 키보드/스크린리더 | 주요 조작 | 순서대로 이동 및 이름 읽힘 | P0 |
| TC-RESP-001 | 전체 | 전체 | 320px 화면 | 화면 이동 | 텍스트/버튼 겹침 없음 | P0 |

## 9. Screen Traceability

| Screen | Requirement | Flow | Event | Test |
|---|---|---|---|---|
| SCR-HOME-001 | REQ-HOME-001 | FLOW-HOME-001 | EVT-HOME-001 | TC-HOME-001 |
| SCR-PLAN-001 | REQ-PLAN-001 | FLOW-HOME-001 | EVT-PLAN-001 | TC-PLAN-001 |
| SCR-PREP-001 | REQ-SAFE-001 | FLOW-SAFE-001 | N/A | TC-SAFE-001 |
| SCR-EXER-001 | REQ-EXER-001, REQ-SAFE-001 | FLOW-EXER-001 | EVT-EXER-001 | TC-EXER-001 |
| SCR-REST-001 | REQ-EXER-001 | FLOW-EXER-001 | EVT-EXER-002 | TC-EXER-001 |
| SCR-SAFE-001 | REQ-SAFE-001 | FLOW-SAFE-001 | EVT-SAFE-001 | TC-SAFE-001 |
| SCR-DONE-001 | REQ-REWARD-001 | FLOW-REWARD-001 | EVT-REWARD-001 | TC-REWARD-001 |
| SCR-HOME-LEVEL | REQ-PLAN-001 | FLOW-LEVEL-001 | EVT-HOME-LEVEL-001 | TC-LEVEL-001 |

## 10. Consistency / Quality Report

- Screen ID는 중복 없음.
- 모든 화면은 Requirement와 Flow에 연결됨.
- 데이터/API 의존이 없는 화면은 N/A 사유를 명시함.
- 운동 화면에는 Running, Pause, Safety Stop, Complete 상태가 정의됨.
- 홈 단계 선택과 로컬 저장 흐름 포함.
- 남은 보완: 실제 캐릭터 원본 첨부 기반 이미지 시트와 영상별 동작 프레임 분석.

Quality Score: 264 / 300



