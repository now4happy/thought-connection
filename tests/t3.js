// 읽는 중(위로 올림)에는 스트리밍이 끌어내리지 않고, 새 말풍선·완료 때는 내려간다
const {open}=require('./harness');
(async()=>{
 const {browser,page}=await open({file:process.argv[2],motion:'still',chunks:80,cpu:2});
 await page.click('#startBtn'); await page.waitForTimeout(1200);
 const before=await page.evaluate(()=>document.getElementById('center').scrollTop);
 await page.mouse.move(200,300); await page.mouse.wheel(0,-400); await page.waitForTimeout(150);
 const up=await page.evaluate(()=>document.getElementById('center').scrollTop);
 await page.waitForTimeout(800);
 const mid=await page.evaluate(()=>({st:document.getElementById('center').scrollTop,busy:S.busy}));
 await page.waitForFunction(()=>!S.busy,null,{timeout:30000}); await page.waitForTimeout(200);
 const end=await page.evaluate(()=>{const c=document.getElementById('center');return{gap:c.scrollHeight-c.scrollTop-c.clientHeight}});
 console.log(JSON.stringify({before,afterWheelUp:up,whileStreamingStayed:Math.abs(mid.st-up)<3,midBusy:mid.busy,gapAtEnd:end.gap}));
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
