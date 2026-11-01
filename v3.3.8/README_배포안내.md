# 생각의 연결 — 대화 시안 v3.3.8 (Gemini 연결판) 배포 안내

상태: 제안 (사용자 승인·Muse 검토 전) · 2026-11-01 · 초안 담당 AI 작성

## 들어 있는 것

| 파일 | 하는 일 |
|---|---|
| `index.html` | 첫 화면 + 대화 화면. 아무 웹호스팅(GitHub Pages 등)에 올리면 어느 기기에서나 열린다. |
| `worker/worker.js` | Gemini 중계 서버 (Cloudflare Worker). Gemini 키를 비밀값으로 들고 대신 호출한다. |
| `worker/wrangler.toml` | 중계 서버 설정 (모델 이름, 허용 주소). 키는 여기 쓰지 않는다. |
| `i18n/chat_v3.3.8/*.json` | 화면 문구 6개 언어 (ko, en, es-419, hi, zh-TW, ja) |
| `내면명탐정_v3.0_프롬프트_PDF추출본.txt` | 페이지와 중계 서버에 들어간 프롬프트 원문 |

## 방법 1 — 혼자 바로 시험하기 (서버 없이)

1. Google AI Studio에서 Gemini API 키를 만든다. **결제(billing)는 켜지 않는다.** 켜지 않으면 무료 등급 한도 안에서만 돌고, 비용이 나가지 않는다.
2. `index.html`을 연다 → 첫 화면 아래 **연결 설정** → "내 Gemini API 키"에 붙여 넣고 **저장**.
3. 페르소나를 고르고 **시작하기**.

- 키는 그 브라우저(localStorage)에만 저장되고 Google에만 보내진다. 공용 기기에서는 쓰지 말고, 다 쓰면 **지우기**.
- 확인하지 못한 것: 브라우저에서 Gemini API를 바로 부를 때 막히지 않는지(CORS)는 실제 키로 시험해야 안다. 막히면 방법 2를 쓴다.

## 방법 2 — 다른 사람도 쓰게 공개하기 (중계 서버)

키가 페이지에 들어가면 누구나 복사해 쓸 수 있으므로, 공개할 때는 반드시 이 방법을 쓴다.

1. **페이지 올리기**: `index.html`을 GitHub Pages 등에 올린다. 올린 주소의 도메인을 적어 둔다(예: `https://now4happy.github.io`).
2. **중계 서버 올리기** (Cloudflare 무료 계정, Node.js 필요):
   ```
   cd worker
   npx wrangler login
   npx wrangler secret put GEMINI_API_KEY      ← 여기서 키를 붙여 넣는다 (화면·파일에 남지 않음)
   npx wrangler deploy
   ```
   - 배포 전에 `wrangler.toml`의 `ALLOWED_ORIGINS`를 1번의 도메인으로 맞춘다. 다른 주소에서 온 요청은 거절된다.
   - 끝나면 `https://thought-connection-gemini.<계정이름>.workers.dev` 같은 주소가 나온다.
3. **페이지에 주소 넣기**: `index.html`에서 `const DEFAULT_RELAY='';`를 찾아 따옴표 안에 2번 주소를 넣고 다시 올린다. 그러면 방문자는 설정 없이 바로 대화한다.

## 바꾸고 싶을 때

- 모델: `wrangler.toml`의 `GEMINI_MODEL`(중계 서버), `index.html`의 `const MODEL`(내 키 방식). 기본값 `gemini-3.6-flash`.
- 무료 등급 한도(하루 요청 수 등)는 Google 문서에 숫자가 없고 AI Studio에서 보라고 되어 있다. 한도를 넘으면 그날은 "무료 사용량을 다 썼어요" 안내가 뜬다. 한도는 Google 프로젝트 단위로 걸리고, 하루 한도는 태평양 시간 자정에 초기화된다.

## 꼭 알아야 할 것

- **개인정보**: 무료 등급에서는 Google이 입력 내용을 제품 개선에 사용한다고 Google 공식 요금 안내에 적혀 있다(유료 등급은 사용 안 함). 주의사항과 대화 화면 하단에 이 내용을 밝혀 두었다. 실제 사용자 대상 공개 전에 유료 등급 전환이나 다른 모델을 검토할 것.
- **안전**: 위기 문장("사라지고 싶다")을 넣었을 때 회기가 멈추고 상담전화가 나오는지, 10번째 질문 뒤 보고서가 나오는지, 종교 인물 페르소나가 인용을 지어내지 않는지 Gemini로 직접 시험해야 한다(PDF의 배포 전 점검 항목).
- **지역**: Gemini API는 한국·대만·일본·인도·멕시코·스페인·미국에서 쓸 수 있고, 중국 본토·홍콩에서는 쓸 수 없다(Google 공식 지역 목록).
- **저장**: 페이지와 중계 서버 모두 대화를 저장하거나 기록하지 않는다. 창을 닫으면 사라진다.
- **로그인**: 아이디·비밀번호 칸은 시안이며 입력이 막혀 있다. 실제 계정 기능은 아직 없다.

## 근거
- Gemini 요금·무료 등급: https://ai.google.dev/gemini-api/docs/pricing
- 모델 이름 gemini-3.6-flash: https://ai.google.dev/gemini-api/docs/generate-content/whats-new-gemini-3.6
- API 형식: https://ai.google.dev/api/generate-content
- 한도 적용 방식: https://ai.google.dev/gemini-api/docs/rate-limits
- 사용 가능 지역: https://ai.google.dev/gemini-api/docs/available-regions
