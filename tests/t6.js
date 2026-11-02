// 현실적인 타이핑: 8자 빠르게 → 1.8초 쉬기 → 반복. 쉰 뒤 첫 키 지연이 핵심(배경 그리기가 다시 시작되는 순간)
const {open}=require('./harness');
(async()=>{
 const [file,motion,cpu]=[process.argv[2],process.argv[3],+process.argv[4]||8];
 const {browser,page}=await open({file,motion,cpu,chunks:6});
 await page.click('#startBtn'); await page.waitForTimeout(2500);
 await page.evaluate(()=>{for(let i=0;i<10;i++){bubble(i%2?'me':'ai','마음이 어지러울 때는 먼저 지금 떠오르는 생각을 있는 그대로 적어 보면 좋습니다. '.repeat(i%2?1:4))}});
 await page.waitForTimeout(300);
 await page.evaluate(()=>{const m=document.getElementById('msg');m.focus();m.scrollIntoView({block:'end'});
   window.__ev=[];new PerformanceObserver(l=>{for(const e of l.getEntries())if(e.name==='input')window.__ev.push({t:e.startTime,dur:e.duration,delay:e.processingStart-e.startTime})}).observe({type:'event',durationThreshold:16,buffered:true});
   window.__keys=[];addEventListener('beforeinput',e=>window.__keys.push(performance.now()),true);
   window.__lt=[];new PerformanceObserver(l=>{for(const e of l.getEntries())window.__lt.push(e.duration)}).observe({type:'longtask',buffered:true});});
 const TXT='오늘은마음이많이복잡해서어디서부터이야기해야할지모르겠지만천천히적어보려고합니다오늘은마음이많이복잡해서어디서부터';
 let p=0;
 for(let b=0;b<7;b++){ for(let i=0;i<8;i++){await page.keyboard.type(TXT[p++%TXT.length]);await page.waitForTimeout(90)} await page.waitForTimeout(1800); }
 await page.waitForTimeout(300);
 const r=await page.evaluate(()=>{
   const keys=window.__keys;const firsts=keys.filter((t,i)=>i%8===0&&i>0); // 쉰 뒤 첫 키
   const lat=t=>{const e=window.__ev.find(x=>Math.abs(x.t-t)<2);return e?e.dur:8}; // 16ms 미만은 기록되지 않음 → 8로 간주(최대 15ms)
   const all=keys.map(lat),f=firsts.map(lat);
   const s=a=>[...a].sort((x,y)=>x-y);const med=a=>s(a)[Math.floor(a.length/2)];
   return{keys:keys.length,all_med:med(all),all_max:Math.max(...all),first_after_pause:f,first_max:Math.max(...f),longtasks:window.__lt.length,longtask_max:Math.round(Math.max(0,...window.__lt))}});
 console.log(JSON.stringify({file:file.split('/')[0].split('..').pop()+file.split('/').slice(-2)[0],motion,cpu,...r}));
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
