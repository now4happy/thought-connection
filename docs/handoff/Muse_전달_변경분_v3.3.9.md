# Muse 전달 — 변경분 v3.3.9 (로그인·회원가입 + Gemini 대화) · 초안 담당 AI

작성: 2026-11-02 05:4x (UTC+8) · 상태: **제안 정리** (사용자 승인·Muse 검토 전)
앞 문서: `Muse_전달_변경분_v3.3.5-v3.3.8.md` (v3.3.5~v3.3.8). 이 문서는 그 뒤에 한 일만 적는다.
대조 방법: 파일 이름 + 해시(sha256 앞 16자리). 첨부 압축 안의 `목록.txt`에 파일별 해시가 있다.

---

## 1. 사용자 결정 (UTC+8)

| 시각 | 결정 |
|---|---|
| 04:55 | 내면 명탐정 v3.0 프롬프트를 **좋은 질문에서 사용자와 주고받는 대화 프롬프트**로 적용 / 테스트라서 **Gemini 무료** / **어디서나·어느 기기에서나 로그인** / **회원가입**으로 사용자마다 로그인 / 첨부 스케치(첫 화면: 문구 + 신호 연결 그림 + 로그인 ID·PW + 페르소나 선택 + 주의사항)를 **전문가 수준 페이지**로 / **배경은 검정이 아님** / **기존 좋은 질문 페이지와 비슷하게** |
| 05:06–05:08 | 파일만 내려받아서는 안 되고 웹에 올려야 한다는 설명을 들음 → Firebase 설정을 왕초보 기준으로 안내 요청 |
| 05:16–05:39 | 사용자가 직접 Firebase 콘솔 설정 진행 (아래 3절) |
| 05:33 | 앱(iOS·Android) 계획 있음. reCAPTCHA 키는 **웹** 유형으로 만들기로 함(앱은 나중에 Play Integrity·App Attest로 따로 등록) |
| 05:39 | **공개 업로드 승인**: 페이지와 그 안의 v3.0 프롬프트 원문이 공개되는 것에 동의 |
| 05:40 | 초안 AI에는 GitHub 계정이 연결되지 않아 직접 올리지 못함 → 사용자에게 새 공개 저장소 `good-question` + GitHub Pages 방법 안내 |
| 05:41 | 이 문서와 첨부를 Muse에게 넘기고, **Muse가 GitHub에 올리기로 함** |

## 2. 결과물

| 파일 | 해시 | 상태 |
|---|---|---|
| `app/v3.3.9/index.html` (107,479 B) — Firebase 설정값·reCAPTCHA 키 **입력 완료본** | `1931f74d4622c63e` | 제안. 공개 승인됨(05:39) |
| `app/v3.3.9/i18n/*.json` — 화면 문구 6개 언어, 키 61개 | 목록.txt 참조 | 제안 (한국어 headline만 사용자 문구) |
| `app/v3.3.9/Firebase_설정안내.md` — 설정 순서 + **현재 설정 상태 표** | 목록.txt 참조 | — |
| `app/v3.3.9/내면명탐정_v3.0_프롬프트_PDF추출본.txt` — 페이지에 들어간 프롬프트 원문 | `4b1a9b30e8d6d7ad` | 원문(PDF `2b039fc7263ab251`) |
| 이 문서 `docs/handoff/Muse_전달_변경분_v3.3.9.md` | — | — |

참고: 앞서 사용자에게 준 `생각의연결_좋은질문_v3.3.9_로그인_Gemini.zip`(`8c8318e8cdef71ce`)의 index.html은 **설정값이 비어 있는 판**이다. 올릴 때는 이번 첨부의 index.html(`1931f74d4622c63e`)을 쓴다.
디자인 미리보기(설정값 없음, 화면만): https://claude.ai/artifact/XTYP477E2Lp5NqiqyJeLpr (비공개)

## 3. 무엇을 만들었나

- **첫 화면** (스케치 반영, 밝은 안개빛 바탕):
  - 브랜드 표시, 언어 선택
  - "좋은 질문 · 1단계" 표시, 사용자 문구
  - 기존 좋은 질문 페이지의 **동심원 물결** 위에서 가지가 가운데로 모이고, 신호가 연결선을 건너면 코랄에서 청록으로 바뀌는 그림
  - 오른쪽 **로그인/회원가입 탭 카드**, 아래 **주의사항 9개**
  - 로그인하면 인사말과 **페르소나 16개 카드**(PDF의 15개 + 직접 정하기, 키보드로도 고를 수 있음). 고른 페르소나는 그 브라우저에 기억된다.
- **회원가입:** 이름, 이메일, 비밀번호(8자 이상), 비밀번호 확인, 주의사항 동의(필수). 가입 확인 메일과 비밀번호 재설정 메일을 보낸다.
- **대화 화면:** 기존 좋은 질문 물결 화면을 그대로 쓴다. 정리해줘 / 단서 노트 보여줘 / 오늘은 그만 버튼, 멈추기, 새로 시작, 생성음(직접 켤 때만) 포함.
- **구조:** 정적 웹페이지 1개 + Firebase **무료 Spark 요금제**
  - Authentication: 이메일·비밀번호. 계정이 서버에 있어서 어느 기기에서나 같은 계정으로 로그인된다.
  - AI Logic + Gemini Developer API 무료 등급, 모델 `gemini-3.8-flash`. **API 키를 페이지에 넣지 않는다.**
  - App Check: 공식 문서상 **2026-11-02부터 AI Logic에 필수**(자동 적용은 2027-01-21까지 미룰 수 있음).
  - Firebase JS SDK 13.0.0(2026-10-07)을 버전 고정으로 쓴다.
- **프롬프트:** PDF 원문 그대로 + 앱 실행 정보 4줄(지침 그대로 따르기 / 고른 페르소나 / 첫 응답 언어 / 마크다운 쓰지 않기) → Gemini 지침 칸(systemInstruction)으로 보낸다.
- **저장:** 계정(이름·이메일)만 Firebase에 저장한다. **대화는 저장하지 않는다.**

## 4. Firebase 설정 상태 (사용자 진행 기준)

| 항목 | 상태 | 초안 AI 확인 |
|---|---|---|
| 프로젝트 `thought-connection`, Spark 무료 | 완료 | 캡처로 확인 |
| 웹 앱 `good-question-web` + firebaseConfig | 완료, index.html에 입력 | 확인 |
| 이메일/비밀번호 로그인, 승인된 도메인 `now4happy.github.io` | 사용자 "다음" | **확인 못 함** |
| AI Logic (앱 목록 표시) | 완료로 보임 | 공급자 선택 화면은 **확인 못 함** |
| reCAPTCHA 웹 키 `6LcBhAsuAAAAAECMLLJ7-9FOoSXfSRDhDXzJOXUj` | 생성됨, index.html에 입력 | 도메인 입력 화면은 **확인 못 함** |
| App Check 등록 (Fraud Defense 공급자) | 사용자 "다음" | 등록 완료 화면은 **확인 못 함** |

- 콘솔 표기 변화: reCAPTCHA Enterprise는 지금 **Fraud Defense(이전 명칭: reCAPTCHA Enterprise)**로 표시된다. App Check 목록의 "reCAPTCHA"(클래식)는 지원 중단 표시가 있고 '보안 비밀 키'를 요구하므로 쓰지 않는다.
- index.html 안의 값(Firebase 웹 설정, reCAPTCHA 사이트 키)은 **원래 공개되는 값**이다. 비밀번호·비밀 키·서비스 계정 키는 어디에도 없다.

## 5. GitHub 올리기 — Muse에게 요청

**A. 웹 공개용 (사용자 안내안)**
- 새 **공개** 저장소 `good-question`의 main 브랜치 맨 위(root)에 `index.html` 하나만 올리고, Settings → Pages → Deploy from a branch → main, / (root).
- 주소는 `https://now4happy.github.io/good-question/`가 된다.
- Firebase와 reCAPTCHA에 등록한 도메인이 `now4happy.github.io`라서, 같은 계정 아래 저장소면 이름이 달라도 동작한다. **다른 도메인에 올리면 승인된 도메인과 reCAPTCHA 키 도메인을 추가해야 한다.**
- 사용자에게 저장소 생성을 안내했으므로, 사용자가 이미 만들었는지 먼저 확인할 것(중복 생성 방지).

**B. 프로젝트 기록용**
- `now4happy/thought-connection`에는 START의 폴더 구조대로 올린다.
  - 첨부의 `app/v3.3.9/…` → `/app/v3.3.9/`
  - `docs/handoff/Muse_전달_변경분_v3.3.9.md` → `/docs/handoff/`
- 승인본·원본은 덮어쓰지 않는다. 바뀐 파일만 올린다.
- 공개 범위: 프롬프트 원문 공개는 사용자 승인(05:39) 범위 안이다. 에세이 원본·비밀은 첨부에 없다.

## 6. 결정이 필요한 것 (사용자)
1. **v3.0 프롬프트 채택:** STATUS 기준 원본은 v2.4다. v3.0은 "심리상담형"이고 기본이 존댓말이라, "의료·상담 아님"·C안 반말 기준과 충돌한다.
2. **Gemini 무료 등급 개인정보:** 무료 등급은 입력을 Google 제품 개선에 쓴다(주의사항에 밝힘). 실제 사용자 공개 전 유료 전환을 검토할지.
3. **없는 기능:** 계정 삭제, 이메일 인증 필수화, 청소년 보호 절차, 대화 저장(현재 저장 안 함. 저장할 경우 동의·익명화·철회 설계 필요).
4. **버전 번호:** v3.3.9는 초안 AI의 제안이다.
5. **앱(iOS·Android):** 같은 Firebase 프로젝트에 앱을 추가하고 App Check를 Play Integrity·App Attest로 등록하는 방향(사용자 05:33 언급, 미결정).
6. **보안 보강 후보:** Firebase 웹 API 키를 Google Cloud 콘솔에서 웹사이트 주소로 제한하는 설정. 초안 AI가 절차를 확인하지 않았다.

## 7. 확인하지 못한 것 (단정 금지)
- **실제 동작:** 회원가입, 로그인, Gemini 대화를 실제로 시험하지 못했다(작업 환경에서 Google 서버에 연결 불가). 가짜 로그인 서버로 화면 흐름만 점검했고, 가입·동의 없이 가입 시 막힘·페르소나·대화·로그아웃·잘못된 비밀번호·재로그인·일본어 전환이 모두 정상이었다.
- **App Check:** 등록 직후 바로 적용되는지, reCAPTCHA(Fraud Defense) 무료 한도 숫자.
- **올린 뒤 점검(사람):** 가입 확인 메일, 다른 기기에서 로그인, 위기 문장에 회기가 멈추는지, 10번째 질문 뒤 보고서, 종교 인물 인용을 지어내지 않는지, 하루 한도 초과 안내.
- **테스트용 연결부:** 페이지에 `window.__TC_BACKEND`(점검용 가짜 서버를 끼우는 곳)가 남아 있다. 외부 스크립트가 없어서 위험은 낮지만, 정식 배포 전에 지울지 정해야 한다.
- 5개 언어는 원어민 검토가 필요하다(특히 힌디어).

## 8. STATUS 반영 요청 (Muse 담당)
- 제안 단계에 v3.3.9 추가: 로그인·회원가입(Firebase Auth) + Gemini(AI Logic) + App Check. 1절의 사용자 결정 기록.
- 대기·미확인 항목 갱신: "계정 로그인·동기화 설계"가 일부 진행됨(로그인만, 동기화·대화 저장 없음). 6·7절 항목 추가.
- 운영 정보: Firebase 프로젝트 ID `thought-connection`(Spark), 웹 앱 `good-question-web`, 공개 주소(올린 뒤 기록).

## 9. 자가 점검
- **설교처럼 들리는가:** 새 화면 문구는 안내문이라 결론으로 가르치는 문장은 없다.
- **생활감:** 약하다(로그인 화면이라 안내문 위주).
- **안전:** 의료·상담 아님, 위기 시 109·119·112(한국)와 현지 긴급번호, 대화 미저장, 개인정보 입력 금지, Gemini 무료 등급 데이터 사용, 계정 정보 저장 위치를 주의사항에 밝혔다.

## 근거
- Firebase AI Logic 요금·App Check 필수(2026-11-02): https://firebase.google.com/docs/ai-logic/pricing
- AI Logic FAQ(자동 적용 연기 2027-01-21): https://firebase.google.com/docs/ai-logic/faq-and-troubleshooting
- AI Logic 시작하기: https://firebase.google.com/docs/ai-logic/get-started
- 웹 예시·모델 이름: https://firebase.google.com/docs/ai-logic/generate-text
- 이메일/비밀번호 로그인: https://firebase.google.com/docs/auth/web/password-auth
- App Check reCAPTCHA Enterprise: https://firebase.google.com/docs/app-check/web/recaptcha-enterprise-provider
- App Check 코드랩: https://firebase.google.com/codelabs/appcheck-web
- Firebase 요금제: https://firebase.google.com/docs/projects/billing/firebase-pricing-plans
- JS SDK 버전: https://firebase.google.com/support/release-notes/js
- Gemini 무료 등급 데이터 사용: https://ai.google.dev/gemini-api/docs/pricing
