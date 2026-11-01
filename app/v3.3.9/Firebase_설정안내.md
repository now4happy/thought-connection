# 생각의 연결 — 좋은 질문 v3.3.9 (로그인 + Gemini) 설정 안내

상태: 제안 (사용자 승인·Muse 검토 전) · 2026-11-02 · 초안 담당 AI 작성

이 페이지(`index.html`)는 파일 하나짜리 웹페이지입니다. Firebase 무료 요금제(Spark)를 붙이면 아래가 됩니다.
- **회원가입·로그인·비밀번호 재설정**: 계정이 Firebase 서버에 있으므로 어느 기기에서나 같은 계정으로 로그인.
- **좋은 질문 대화**: 내면 명탐정 v3.0 프롬프트로 Gemini와 대화(무료 등급). API 키를 페이지에 넣지 않습니다.

설정을 넣기 전에는 화면만 보이고 "아직 로그인 서버(Firebase)가 연결되지 않은 시안"이라는 안내가 뜹니다.

> 콘솔 메뉴 이름은 화면 개편에 따라 조금 다를 수 있습니다. 아래는 Firebase 공식 문서(2026-11-02 확인) 기준입니다.


## 현재 설정 상태 (2026-11-02 05:41, 사용자 진행 보고 + 화면 캡처 기준)
| 항목 | 값 / 상태 | 확인 방법 |
|---|---|---|
| Firebase 프로젝트 | `thought-connection`, Spark 무료($0/월) | 캡처로 확인 |
| 웹 앱 | `good-question-web` | 캡처로 확인 |
| FIREBASE_CONFIG | index.html에 입력 완료 (projectId `thought-connection`) | 초안 AI가 입력 |
| 이메일/비밀번호 로그인, 승인된 도메인 `now4happy.github.io` | 사용자 진행 보고("다음") | 화면으로 확인 못 함 |
| AI Logic | 앱 목록에 good-question-web 표시 | 캡처로 확인. 공급자(Gemini Developer API) 선택 화면은 확인 못 함 |
| reCAPTCHA 키 (콘솔 표기: Fraud Defense, 이전 명칭 reCAPTCHA Enterprise) | 웹 키 `6LcBhAsuAAAAAECMLLJ7-9FOoSXfSRDhDXzJOXUj`, 도메인 now4happy.github.io | 사용자가 키 전달. 도메인 입력 화면은 확인 못 함 |
| RECAPTCHA_ENTERPRISE_KEY | index.html에 입력 완료 | 초안 AI가 입력 |
| App Check 등록 | Fraud Defense 공급자로 등록 진행(사용자 "다음") | 등록 완료 화면은 확인 못 함 |
| 웹 공개 | 사용자 승인(05:39). 새 공개 저장소 `good-question` → GitHub Pages 예정 | 진행 중 |

참고: App Check 공급자 목록의 "reCAPTCHA"(클래식)는 지원 중단으로 표시되며 '보안 비밀 키'를 요구한다 → 쓰지 않는다. "Fraud Defense(이전 명칭: reCAPTCHA Enterprise)"를 쓴다.

## 1. Firebase 프로젝트 만들기 (무료)
1. Firebase 콘솔에서 새 프로젝트를 만듭니다. **결제 계정(Cloud Billing)은 연결하지 않습니다.** 연결하면 자동으로 유료(Blaze) 요금제로 바뀝니다.
2. 프로젝트에 **웹 앱**을 등록하면 `firebaseConfig = { apiKey: …, authDomain: …, projectId: …, appId: … }` 가 나옵니다.
3. `index.html`에서 `const FIREBASE_CONFIG=null;` 을 찾아 `null` 자리에 그 객체를 그대로 붙여 넣습니다.
   - 이 값은 웹페이지에 공개되는 설정값이라 비밀이 아닙니다. (비밀번호·결제 정보가 아님)

## 2. 로그인 켜기 (Authentication)
1. Authentication → 로그인 방법에서 **이메일/비밀번호**를 사용 설정합니다.
2. 설정 → **승인된 도메인**에 페이지를 올릴 주소의 도메인을 추가합니다. (예: GitHub Pages면 `now4happy.github.io`)

## 3. Gemini 켜기 (Firebase AI Logic)
1. AI Logic 메뉴에서 시작하고, 공급자로 **Gemini Developer API**를 고릅니다.
   - 공식 문서: Gemini Developer API 무료 등급은 결제 수단 없이 쓸 수 있고, 프로젝트는 Spark(무료)로 유지됩니다.
2. 페이지가 쓰는 모델: `gemini-3.8-flash` (Firebase 공식 예시의 모델 이름. 바꾸려면 `index.html`의 `const MODEL`).

## 4. App Check 켜기 (필수)
Firebase 공식 문서: **"2026년 11월 2일부터 Firebase AI Logic을 쓰려면 App Check 적용이 필수"**(자동 적용은 최대 2027년 1월 21일까지 미룰 수 있음).
1. reCAPTCHA Enterprise에서 **웹 유형 키**를 만들고, 페이지 도메인을 등록합니다. "체크박스 챌린지 사용"은 끕니다.
2. Firebase 콘솔 App Check → 앱 탭에서 웹 앱을 **reCAPTCHA Enterprise** 공급자로 등록하고 그 키를 넣습니다.
3. `index.html`에서 `const RECAPTCHA_ENTERPRISE_KEY='';` 따옴표 안에 같은 키를 넣습니다.
- 주의: App Check는 `localhost` 같은 환경을 유효하지 않은 곳으로 봅니다. 시험은 **실제로 올린 주소**에서 하세요.
- 확인 못 함: reCAPTCHA Enterprise 무료 한도 숫자(공식 문서에 "무료 한도를 넘는 평가마다 과금"이라고만 되어 있음). 결제 계정을 연결하지 않으면 과금은 되지 않습니다.

## 5. 페이지 올리기
- **GitHub Pages**: 저장소에 `index.html`을 올리고 Pages를 켭니다. (공개 저장소면 누구나 페이지를 볼 수 있음)
- 또는 **Firebase Hosting**(무료 한도 있음)에 올려도 됩니다.
- 올린 도메인을 2-2(승인된 도메인)와 4-1(reCAPTCHA 키 도메인)에 꼭 넣습니다.

## 6. 올린 뒤 점검 (사람이 직접)
- [ ] 회원가입 → 확인 메일 도착 → 로그아웃 → 다른 기기에서 같은 계정으로 로그인
- [ ] 비밀번호 재설정 메일
- [ ] 대화: 첫 응답 언어, 고른 페르소나 말투, 10번째 질문 뒤 사건 보고서
- [ ] 위기 문장("사라지고 싶다")에 회기가 멈추고 상담전화가 나오는지
- [ ] 종교 인물 페르소나가 인용을 지어내지 않는지
- [ ] 하루 무료 한도를 넘었을 때 "무료 사용량을 다 썼어요" 안내

## 개인정보 (주의사항에 밝혀 둠)
- 계정: 이름·이메일만 Firebase(Google)에 저장. 비밀번호는 Firebase가 관리하며 페이지에 남지 않음.
- 대화: 저장하지 않음(페이지 메모리에만). 답을 만들기 위해 Google Gemini로 전달됨.
- Gemini 무료 등급은 입력을 Google 제품 개선에 사용(Google 공식 요금 안내). 실제 사용자 공개 전 유료 등급 검토 권장.
- 아직 없음: 계정 삭제 버튼, 이메일 인증 필수화, 아동·청소년 보호 절차 → 다음 단계 후보.

## 근거
- Firebase AI Logic 요금(Spark에서 Gemini Developer API, App Check 필수 날짜): https://firebase.google.com/docs/ai-logic/pricing
- Firebase AI Logic FAQ(자동 적용 연기 마감 2027-01-21): https://firebase.google.com/docs/ai-logic/faq-and-troubleshooting
- 웹 코드 예시·모델 이름: https://firebase.google.com/docs/ai-logic/generate-text
- App Check reCAPTCHA Enterprise: https://firebase.google.com/docs/app-check/web/recaptcha-enterprise-provider
- Firebase 요금제: https://firebase.google.com/docs/projects/billing/firebase-pricing-plans
- JS SDK 버전(13.0.0, 2026-10-07): https://firebase.google.com/support/release-notes/js
- CDN 파일 이름: https://firebase.google.com/docs/web/learn-more
- Gemini 무료 등급 데이터 사용: https://ai.google.dev/gemini-api/docs/pricing
