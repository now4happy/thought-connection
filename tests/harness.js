// 가짜 Firebase 모듈 + 측정 도구. 사용: node harness.js <html경로> <시나리오>
const { chromium } = require('playwright');
const fs = require('fs');
const FAKE = {
 'firebase-app.js': `export const initializeApp=()=>({});`,
 'firebase-auth.js': `export const getAuth=()=>({});export const onAuthStateChanged=(a,cb)=>setTimeout(()=>cb({displayName:'테스터',email:'t@e.st'}),0);
  export const createUserWithEmailAndPassword=async()=>({user:{}});export const updateProfile=async()=>{};export const sendEmailVerification=async()=>{};
  export const sendPasswordResetEmail=async()=>{};export const signInWithEmailAndPassword=async()=>{};export const signOut=async()=>{};`,
 'firebase-app-check.js': `export class ReCaptchaEnterpriseProvider{};export const initializeAppCheck=()=>({});export const getToken=async()=>({token:'x'});export const getLimitedUseToken=async()=>({token:'x'});`,
 'firebase-ai.js': `export class GoogleAIBackend{};export const getAI=()=>({});
  const para='마음이 어지러울 때는 먼저 지금 떠오르는 생각을 있는 그대로 적어 보면 좋습니다. 그리고 그 생각이 어디에서 왔는지 천천히 살펴보세요. ';
  export const getGenerativeModel=()=>({generateContentStream:async()=>{
    const n=window.__CHUNKS||40;
    return{stream:(async function*(){for(let i=0;i<n;i++){await new Promise(r=>setTimeout(r,25));yield{text:()=>para+(i%5==4?'\\n\\n':'')}}})(),
      response:Promise.resolve({candidates:[{finishReason:'STOP'}]})}}});`
};
async function open(opts={}) {
  const browser = await chromium.launch();
  const ctx = await browser.newContext(Object.assign({viewport:{width:390,height:700},deviceScaleFactor:2,hasTouch:true,isMobile:true}, opts.ctx||{}));
  const page = await ctx.newPage();
  await page.route('**/www.gstatic.com/firebasejs/**', r => {
    const f = r.request().url().split('/').pop();
    r.fulfill({status:200, contentType:'text/javascript', body: FAKE[f] || 'export {}'});
  });
  await page.route('**/fonts.googleapis.com/**', r=>r.fulfill({status:200,contentType:'text/css',body:''}));
  await page.route('**/fonts.gstatic.com/**', r=>r.abort());
  const cdp = await ctx.newCDPSession(page);
  if (opts.cpu) await cdp.send('Emulation.setCPUThrottlingRate',{rate:opts.cpu});
  if(opts.fakeVV) await page.addInitScript(()=>{const t=new EventTarget();Object.assign(t,{height:innerHeight,offsetTop:0,width:innerWidth,scale:1});Object.defineProperty(window,'visualViewport',{configurable:true,value:t});});
  await page.addInitScript(({chunks, motion})=>{window.__CHUNKS=chunks; try{ if(motion) localStorage.setItem('tc_motion',motion)}catch(e){} }, {chunks:opts.chunks||40, motion:opts.motion||''});
  await page.goto('file://'+require('path').resolve(opts.file));
  await page.waitForFunction(()=>!document.getElementById('startBtn').disabled, null, {timeout:15000}).catch(()=>{});
  return {browser, page, cdp};
}
module.exports = {open};
