// 타이핑 지연 측정: node t1.js <html> <motion: full|still> [cpu]
const {open}=require('./harness');
const TXT='오늘은 마음이 많이 복잡해서 어디서부터 이야기해야 할지 모르겠지만 천천히 적어 보려고 합니다 ';
(async()=>{
 const [file,motion,cpu]=[process.argv[2],process.argv[3],+process.argv[4]||6];
 const {browser,page}=await open({file,motion,cpu,chunks:6});
 await page.click('#startBtn'); await page.waitForTimeout(3000);
 if(process.argv[5]==='long'){await page.evaluate(()=>{for(let i=0;i<14;i++){bubble(i%2?'me':'ai','마음이 어지러울 때는 먼저 지금 떠오르는 생각을 있는 그대로 적어 보면 좋습니다. '.repeat(i%2?1:5))}});await page.waitForTimeout(500)}
 await page.evaluate(()=>{window.__ev=[];new PerformanceObserver(l=>{for(const e of l.getEntries())if(e.name==='keydown'||e.name==='input'||e.name==='keyup')window.__ev.push([e.name,e.duration,e.processingStart-e.startTime])}).observe({type:'event',durationThreshold:16,buffered:true});
   window.__fr=0;(function f(){window.__fr++;requestAnimationFrame(f)})();});
 await page.evaluate(()=>{const m=document.getElementById('msg');m.focus();m.scrollIntoView({block:'end'});}); 
 const t0=Date.now();
 for(const ch of TXT.repeat(1).slice(0,60)){ await page.keyboard.type(ch); await page.waitForTimeout(90); }
 const el=Date.now()-t0;
 await page.waitForTimeout(400);
 const r=await page.evaluate(()=>{const d=window.__ev.filter(e=>e[0]==='keydown'||e[0]==='input').map(e=>e[1]).sort((a,b)=>a-b);const q=p=>d[Math.min(d.length-1,Math.floor(d.length*p))];const all=window.__ev.map(e=>e[1]);return{n:d.length,med:q(.5),p90:q(.9),max:d[d.length-1],ge24:Math.round(100*d.filter(x=>x>=24).length/Math.max(1,d.length)),hgt:document.getElementById('msg').getBoundingClientRect().height}});
 console.log(JSON.stringify({long:process.argv[5]||'',file:file.split('/').slice(-2).join('/'),motion,cpu,totalMs:el,...r}));
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
