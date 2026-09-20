# 엄마의 정원 PRD

문서 ID: PRD-001  
버전: v0.1  
작성일: 2026-08-11  
상태: Draft  
대상 플랫폼: Mobile PWA 우선, 이후 iOS/Android 검토  
관련 문서: `02_Moms_Garden_Screen_Spec.md`

## 1. Executive Summary

`엄마의 정원`은 70대 어른이 집에서 무릎과 다리 근력을 지치지 않고 매일 관리하도록 돕는 운동 습관 앱이다. 사용자는 큰 버튼 하나로 운동을 시작하고, 복실이 캐릭터의 표정/동작/음성 구령을 보며 앉아서 하기, 누워서 하기, 단계별 운동, 장운동을 따라 한다. 운동을 마치면 정원에 물을 주고 꽃이 자라며, 실패한 날에도 벌점 없이 다시 시작할 수 있다.

## 2. Project Profile

| 항목 | 값 |
|---|---|
| 규모 | Small MVP |
| 제품 유형 | B2C / 가족 돌봄형 개인 앱 |
| 플랫폼 | Mobile PWA |
| Primary User | USER-01 70대 어른 |
| Secondary User | USER-02 자녀/보호자 |
| Admin User | N/A - MVP는 관리자 없음 |
| 데이터 민감도 | Moderate - 건강 습관 기록 |
| 인증 | None - MVP |
| 결제 | None |
| AI 수준 | None - MVP, 추후 음성/개인화 가능 |
| 권한 | Notifications: 선택, Camera/Mic/Location: 없음 |
| 외부 연동 | None - MVP |
| 규제 노출 | 일반 개인정보/건강 고지 검토 필요 |
| 오프라인 | Helpful |
| 접근성 | High |

## 3. Confirmed / Assumed / Open

### Confirmed Facts

| ID | 내용 |
|---|---|
| CON-001 | 70대 어른의 무릎 운동을 돕는 모바일 앱이어야 한다. |
| CON-002 | 쉽고 재미있게 따라 하며 매일 반복할 수 있어야 한다. |
| CON-003 | 앉아서 하기, 누워서 하기, 단계별 운동을 포함한다. |
| CON-004 | 집안에서 할 수 있는 가벼운 운동과 장운동을 포함한다. |
| CON-005 | 허리에 대한 주의 안내가 필요하다. |
| CON-006 | 캐릭터의 얼굴 표정과 동작이 명확해야 한다. |

### Assumptions

| ID | 가정 | 이유 | 영향도 | 검증 시점 |
|---|---|---|---|---|
| ASM-001 | MVP는 한국어 단일 사용자용 PWA다. | 70대 사용자의 설치/가입 부담 최소화 | High | MVP |
| ASM-002 | 운동은 치료 처방이 아닌 일반 운동 습관 보조다. | 의료 안전 리스크 분리 | High | Discovery |
| ASM-003 | 운동 기록은 로컬 저장한다. | 서버 없이 빠른 제작 | Medium | MVP |
| ASM-004 | 알림은 사용자가 허용한 경우만 제공한다. | OS 권한/피로도 고려 | Medium | MVP |

### Open Questions

| ID | 질문 | 영향 |
|---|---|---|
| Q-001 | 실제 첨부 캐릭터 원본 이미지는 무엇인가? | 캐릭터 디자인/애니메이션 제작 |
| Q-002 | 사용자의 현재 무릎/허리 질환, 수술 이력, 통증 기준은 확인되었는가? | 운동 강도와 금지 동작 |
| Q-003 | 알림을 받을 보호자 연동이 필요한가? | 서버/인증/개인정보 범위 |

## 4. Problem

70대 어른은 무릎과 다리 근력 관리가 필요해도 기존 운동 앱의 글씨, 조작, 운동 강도, 설명 방식이 맞지 않아 며칠 하다 중단하기 쉽다. 특히 무릎 운동은 통증 걱정과 허리 부담이 함께 있어, 운동 동작 자체보다 `안전하게 계속 하게 만드는 안내와 동기`가 핵심 문제다.

## 5. Goals / KPI / Non-goals

| Goal ID | 목표 |
|---|---|
| PG-001 | 사용자가 하루 1회 이상 안전하게 운동을 시작하고 완료한다. |
| PG-002 | 운동이 지루한 과제가 아니라 정원 가꾸기 루틴으로 느껴진다. |
| PG-003 | 무릎 운동 중 허리 부담을 줄이는 자세 안내를 반복 제공한다. |
| PG-004 | 70대 사용자가 도움 없이 앱을 조작할 수 있다. |

| KPI ID | 지표 | 정의 | MVP 목표 |
|---|---|---|---|
| KPI-001 | 일일 운동 완료율 | 하루 1회 이상 완료한 날 / 사용일 | 60% 이상 |
| KPI-002 | 3회 루틴 달성률 | 아침/점심/저녁 3회 완료한 날 / 사용일 | 25% 이상 |
| KPI-003 | 중도 중단률 | 시작 후 완료 전 종료한 세션 / 시작 세션 | 30% 이하 |
| KPI-004 | 7일 재방문 | 첫 사용 후 7일 안에 4일 이상 실행 | 50% 이상 |

### Non-goals

| ID | 내용 |
|---|---|
| NG-001 | 질병 진단, 치료 처방, 통증 원인 판단은 하지 않는다. |
| NG-002 | MVP에서는 카메라 자세 인식 기능을 만들지 않는다. |
| NG-003 | 실제 저작권 있는 트로트 음원 스트리밍은 포함하지 않는다. |
| NG-004 | 복잡한 회원가입, SNS, 랭킹, 광고는 포함하지 않는다. |

## 6. Users / JTBD

| 사용자 ID | 사용자 | 설명 |
|---|---|---|
| USER-01 | 70대 어른 | 스마트폰 조작이 익숙하지 않을 수 있고, 무릎/허리 부담을 걱정한다. |
| USER-02 | 자녀/보호자 | 운동 루틴이 이어지는지 알고 싶지만 사용자를 압박하지 않아야 한다. |

| JTBD ID | 상황 | 원하는 것 | 기대 결과 |
|---|---|---|---|
| JTBD-001 | 무릎이 뻣뻣하고 걷기가 부담스러운 날 | 의자에 앉아 안전하게 시작하고 싶다 | 실패감 없이 움직임을 시작한다 |
| JTBD-002 | 누워서 운동할 시간이 있을 때 | 허리에 무리 없이 다리 운동을 따라 하고 싶다 | 무릎 주변 근육을 천천히 강화한다 |
| JTBD-003 | 운동이 지겨워질 때 | 칭찬과 보상을 받으며 계속하고 싶다 | 매일 앱을 다시 연다 |

## 7. MVP Scope

### In Scope

| Feature ID | 기능 | 우선순위 |
|---|---|---|
| FEAT-HOME-001 | 정원 홈과 오늘 물뿌리개 상태 | Must |
| FEAT-PLAN-001 | 앉아서/누워서/집안/장운동/단계별 루틴 선택 | Must |
| FEAT-EXER-001 | 큰 캐릭터 애니메이션, 카운트, 음성 구령 | Must |
| FEAT-SAFE-001 | 통증/허리/어지럼 중단 안내 | Must |
| FEAT-REWARD-001 | 완료 후 물주기와 꽃 성장 | Must |
| FEAT-HABIT-001 | 오늘 기록, 연속일, 부드러운 알림 | Should |
| FEAT-CONTENT-001 | 보호자용 운동/안전 문구 편집 | Could |

### Out of Scope

| ID | 내용 |
|---|---|
| OS-001 | 의료진 원격 모니터링 |
| OS-002 | 카메라 기반 자세 판정 |
| OS-003 | 병원 EMR, 보험, 결제 연동 |

## 8. Information Architecture

```text
APP
├── 홈: 오늘의 정원
├── 운동 시작
│   ├── 오늘 추천
│   ├── 앉아서 하기
│   ├── 누워서 하기
│   ├── 집안 가벼운 운동
│   └── 장운동
├── 운동 진행
│   ├── 준비 자세
│   ├── 세트/회차 진행
│   ├── 휴식
│   └── 중단 확인
└── 완료
    ├── 물주기
    ├── 꽃 성장
    └── 칭찬
```

## 9. Core User Flows

| Flow ID | Flow | 시작 | 종료 | 관련 화면 |
|---|---|---|---|---|
| FLOW-HOME-001 | 오늘 운동 시작 | 홈 | 운동 선택 또는 추천 루틴 | SCR-HOME-001, SCR-PLAN-001 |
| FLOW-EXER-001 | 운동 따라 하기 | 운동 선택 | 완료 또는 중단 | SCR-EXER-001, SCR-REST-001 |
| FLOW-SAFE-001 | 통증/허리 부담 중단 | 운동 중 | 홈 또는 완료 제외 종료 | SCR-EXER-001, SCR-SAFE-001 |
| FLOW-REWARD-001 | 완료 보상 | 운동 완료 | 홈 | SCR-DONE-001 |
| FLOW-LEVEL-001 | 운동 단계 선택 | 홈 | 단계 저장 | SCR-HOME-001 |

### FLOW-EXER-001 운동 따라 하기

1. 사용자가 `운동 시작`을 누른다.
2. 앱이 오늘 추천 루틴을 보여준다.
3. 사용자가 모드를 선택한다.
4. 앱이 준비 자세와 중단 조건을 큰 글씨/음성으로 안내한다.
5. 캐릭터가 동작을 보여주고 카운트가 시작된다.
6. 사용자는 `잠깐 쉬기` 또는 `그만하기`를 누를 수 있다.
7. 세트가 끝나면 휴식 안내를 제공한다.
8. 모든 세트 완료 시 물뿌리개 1개를 채우고 완료 화면으로 이동한다.

예외: 통증, 어지럼, 숨참, 허리 통증 선택 시 즉시 중단 안내를 표시한다.

## 10. Functional Requirements

### REQ-HOME-001 — 오늘의 정원 표시

**Requirement**  
사용자는 앱 첫 화면에서 오늘 운동 상태와 정원 성장을 한눈에 확인할 수 있어야 한다.

**Acceptance Criteria**
- AC-HOME-001: Given 오늘 첫 실행일 때 When 홈에 진입하면 Then 빈 물뿌리개 3개와 `운동 시작` 버튼이 표시된다.
- AC-HOME-002: Given 운동을 1회 완료했을 때 When 홈으로 돌아오면 Then 물뿌리개 1개가 채워진 상태로 표시된다.
- AC-HOME-003: Given 어제 운동하지 않았을 때 When 홈에 진입하면 Then 꽃이 시들거나 벌점 표현을 하지 않는다.

**Trace**  
Feature: FEAT-HOME-001 / Flow: FLOW-HOME-001 / Screen: SCR-HOME-001 / Event: EVT-HOME-001 / Test: TC-HOME-001

### REQ-PLAN-001 — 운동 모드 선택

**Requirement**  
사용자는 `앉아서`, `누워서`, `집안 가벼운 운동`, `장운동`, `오늘 추천` 중 하나를 선택할 수 있어야 한다.

**Acceptance Criteria**
- AC-PLAN-001: Given 사용자가 운동 선택 화면에 들어오면 When 각 모드를 보면 Then 모드명, 난이도, 예상 시간이 큰 글씨로 보인다.
- AC-PLAN-002: Given 허리 주의가 필요한 모드일 때 When 모드를 선택하면 Then 시작 전 허리 중립 안내가 먼저 표시된다.
- AC-PLAN-003: Given 사용자가 선택을 어려워할 때 When `오늘 추천`을 누르면 Then 가장 낮은 부담의 루틴부터 시작한다.

**Trace**  
Feature: FEAT-PLAN-001 / Flow: FLOW-HOME-001 / Screen: SCR-PLAN-001 / Event: EVT-PLAN-001 / Test: TC-PLAN-001

### REQ-EXER-001 — 캐릭터 기반 운동 진행

**Requirement**  
운동 진행 화면은 캐릭터 동작, 큰 숫자 카운트, 음성 구령, 쉬기/그만하기 버튼만으로 따라 할 수 있어야 한다.

**Acceptance Criteria**
- AC-EXER-001: Given 운동이 시작되면 When 1회 동작이 진행될 때 Then 캐릭터가 준비-올림-유지-내림 동작을 명확히 보여준다.
- AC-EXER-002: Given 세트 진행 중일 때 When 회차가 바뀌면 Then 큰 숫자와 음성 구령이 함께 바뀐다.
- AC-EXER-003: Given 사용자가 `잠깐 쉬기`를 누르면 When 휴식이 시작되면 Then 카운트가 멈추고 재개 버튼이 표시된다.
- AC-EXER-004: Given 사용자가 `그만하기`를 누르면 When 확인하면 Then 완료 보상 없이 홈으로 돌아간다.

**Trace**  
Feature: FEAT-EXER-001 / Flow: FLOW-EXER-001 / Screen: SCR-EXER-001 / Event: EVT-EXER-001 / Test: TC-EXER-001

### REQ-SAFE-001 — 안전 중단 및 허리 주의

**Requirement**  
앱은 운동 전과 운동 중에 통증, 어지럼, 숨참, 허리 부담 시 즉시 멈추도록 안내해야 한다.

**Acceptance Criteria**
- AC-SAFE-001: Given 운동 시작 전 When 준비 안내가 표시되면 Then `아프면 바로 멈추세요` 문구와 음성이 제공된다.
- AC-SAFE-002: Given 운동 중 When 사용자가 `아파요/허리가 불편해요`를 선택하면 Then 운동을 정지하고 쉬기/종료 선택지를 표시한다.
- AC-SAFE-003: Given 누워서 다리 들기 중 When 허리 부담 안내 차례가 되면 Then `허리가 뜨면 다리를 낮게 들어요`를 표시/음성 안내한다.

**Trace**  
Feature: FEAT-SAFE-001 / Flow: FLOW-SAFE-001 / Screen: SCR-SAFE-001 / Event: EVT-SAFE-001 / Test: TC-SAFE-001

### REQ-REWARD-001 — 정원 보상

**Requirement**  
운동 완료 후 사용자는 물주기 애니메이션과 꽃 성장, 칭찬 멘트를 받아야 한다.

**Acceptance Criteria**
- AC-REWARD-001: Given 운동을 끝까지 완료했을 때 When 완료 화면에 진입하면 Then 물뿌리개가 정원에 물을 주는 연출이 보인다.
- AC-REWARD-002: Given 하루 3회 완료했을 때 When 완료 화면이 표시되면 Then `오늘 물 3번 다 줬어요` 배지가 표시된다.
- AC-REWARD-003: Given 연속 기록이 끊겼을 때 When 다시 운동을 완료하면 Then 꾸중 없이 재시작 칭찬을 표시한다.

**Trace**  
Feature: FEAT-REWARD-001 / Flow: FLOW-REWARD-001 / Screen: SCR-DONE-001 / Event: EVT-REWARD-001 / Test: TC-REWARD-001

## 11. Exercise Content Rules

| Rule ID | 규칙 |
|---|---|
| BR-SAFE-001 | 통증이 있으면 횟수 달성보다 중단을 우선한다. |
| BR-SAFE-002 | 허리가 뜨거나 꺾이면 다리 높이를 낮추거나 쉬도록 안내한다. |
| BR-SAFE-003 | 서서 하는 운동은 움직이지 않는 지지물 옆에서만 안내한다. |
| BR-SAFE-004 | 단계 상승은 완료 일수뿐 아니라 중단/통증 기록이 적을 때만 제안한다. |
| BR-CONTENT-001 | 한 루틴은 5~10분 안에 끝나야 한다. |
| BR-CONTENT-002 | 70대 사용자를 위해 한 화면의 선택지는 3개 이하를 원칙으로 한다. |

## 12. Data / Privacy

| DATA ID | 데이터 | 개인정보 | 목적 | 저장 위치 | 보관 |
|---|---|---|---|---|---|
| DATA-001 | 운동 완료 일자/횟수 | 가능성 낮음 | 정원 성장/습관 표시 | LocalStorage/IndexedDB | 사용자가 삭제 전까지 |
| DATA-002 | 단계/속도/글자 크기 | 아니오 | 맞춤 UX | LocalStorage/IndexedDB | 사용자가 삭제 전까지 |
| DATA-003 | 알림 시간 | 아니오 | 루틴 알림 | LocalStorage/IndexedDB | 사용자가 삭제 전까지 |
| DATA-004 | 통증/중단 선택 기록 | 건강 관련 민감 가능성 | 단계 조절 | 로컬만 저장 권장 | 짧은 기간 또는 저장 안 함 검토 |

정책: MVP는 계정과 서버 전송을 사용하지 않는다. 보호자 알림 기능을 추가할 경우 개인정보처리방침, 동의, 삭제, 전송 보안 범위를 다시 정의해야 한다.

## 13. Security / API / Integration

| API ID | 내용 |
|---|---|
| API-LOCAL-001 | 로컬 운동 기록 저장/조회. Endpoint: N/A - client local storage |
| API-NOTI-001 | 알림 예약. Endpoint: TBD - PWA Notification API 가능성 검토 |

보안 기준: HTTPS 배포, 민감정보 로그 금지, 외부 SDK 최소화, 서비스 워커 캐시 범위 제한.

## 14. Analytics

| Event ID | Event Name | 발생 조건 | KPI |
|---|---|---|---|
| EVT-HOME-001 | screen_home_view | 홈 노출 | KPI-004 |
| EVT-PLAN-001 | exercise_mode_select | 운동 모드 선택 | KPI-001 |
| EVT-EXER-001 | exercise_start | 운동 시작 | KPI-001 |
| EVT-EXER-002 | exercise_pause | 쉬기 선택 | KPI-003 |
| EVT-SAFE-001 | exercise_stop_safety | 통증/허리/어지럼 중단 | KPI-003 |
| EVT-REWARD-001 | exercise_complete | 루틴 완료 | KPI-001, KPI-002 |

MVP에서 외부 분석 도구를 쓰지 않으면 콘솔/로컬 QA 로그로 대체한다.

## 15. Accessibility / UX Principles

- 최소 글자 크기: 본문 20px 이상, 핵심 숫자 56px 이상 권장.
- 버튼은 엄지로 누르기 쉬운 큰 터치 영역을 사용한다.
- 탭만으로 조작하고 스와이프/길게 누르기 의존을 피한다.
- 색상만으로 상태를 구분하지 않고 아이콘, 문구, 음성을 함께 쓴다.
- 모션은 이해를 돕는 수준으로 유지하고 과도한 흔들림/깜빡임을 피한다.
- 음성 안내는 켜짐이 기본이나 즉시 끌 수 있어야 한다.

## 16. Release Plan

| 단계 | 목표 | 포함 |
|---|---|---|
| MVP | 가족 테스트 | 4개 운동 모드, 정원 보상, 로컬 기록 |
| v1.0 | 실제 반복 사용 | 꽃 3종, 난이도 조절, 알림 안정화 |
| v1.1 | 보호자 확장 | 선택형 보호자 알림, 주간 요약 |

## 17. Risks

| Risk ID | 위험 | 대응 |
|---|---|---|
| RISK-001 | 운동 중 통증 악화 | 앱 시작/운동 중 반복 중단 안내, 의료 확인 문구 |
| RISK-002 | 허리 부담 | 누워서 운동 시 허리 중립/다리 높이 축소 안내 |
| RISK-003 | 조작 어려움 | 3화면 중심, 큰 버튼, 자동 진행 |
| RISK-004 | 지루함 | 정원 성장, 칭찬 음성, 매일 다른 멘트 |
| RISK-005 | 저작권 | 자작/무료 음원만 사용 |

## 18. Traceability Matrix

| Goal | Requirement | Feature | Flow | Screen | API/Data | Event | Test |
|---|---|---|---|---|---|---|---|
| PG-001 | REQ-EXER-001 | FEAT-EXER-001 | FLOW-EXER-001 | SCR-EXER-001 | DATA-001 | EVT-EXER-001 | TC-EXER-001 |
| PG-001 | REQ-SAFE-001 | FEAT-SAFE-001 | FLOW-SAFE-001 | SCR-SAFE-001 | DATA-004 | EVT-SAFE-001 | TC-SAFE-001 |
| PG-002 | REQ-REWARD-001 | FEAT-REWARD-001 | FLOW-REWARD-001 | SCR-DONE-001 | DATA-001 | EVT-REWARD-001 | TC-REWARD-001 |
| PG-003 | REQ-SAFE-001 | FEAT-SAFE-001 | FLOW-SAFE-001 | SCR-EXER-001 | DATA-004 | EVT-SAFE-001 | TC-SAFE-002 |
| PG-004 | REQ-HOME-001 | FEAT-HOME-001 | FLOW-HOME-001 | SCR-HOME-001 | DATA-001 | EVT-HOME-001 | TC-HOME-001 |

## 19. Consistency Report

- Must 요구사항은 모두 Acceptance Criteria를 포함한다.
- 모든 주요 요구사항은 Flow와 Screen에 연결되어 있다.
- 데이터 수집 항목은 Data Inventory에 기록했다.
- AI 기능은 MVP에서 비활성화했다.
- 알림 권한은 선택 기능으로 두고 거부 흐름은 Screen Spec에서 정의한다.
- Blocking Issue: 실제 첨부 캐릭터 파일과 영상별 정확한 동작 자막은 아직 확보 필요.

## 20. Quality Report

| 영역 | 점수 |
|---|---:|
| PRD Score | 90 / 100 |
| Screen Spec Score | 88 / 100 |
| Build/QA Readiness | 86 / 100 |
| Total | 264 / 300 |

### Recommended Next Decisions

1. 실제 캐릭터 이미지 파일을 기준으로 표정/동작 시트를 확정한다.
2. 운동별 금지 조건과 단계 상승 조건을 의료진 또는 물리치료 자료로 재검토한다.
3. MVP를 기존 `backup` PWA 코드에 반영할지, 새 구조로 만들지 결정한다.


