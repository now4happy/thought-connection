const {open}=require('./harness');
(async()=>{
 const [file,motion]=[process.argv[2],process.argv[3]];
 const {browser,page}=await open({file,motion,cpu:2,chunks:6});
 await page.addInitScript(()=>{window.__draws=0;const o=CanvasRenderingContext2D.prototype.fillRect;CanvasRenderingContext2D.prototype.fillRect=function(...a){if(this.canvas.id==='field')window.__draws++;return o.apply(this,a)}});
 await page.reload(); await page.waitForFunction(()=>!document.getElementById('startBtn').disabled);
 await page.click('#startBtn'); await page.waitForTimeout(5000);
 const d0=await page.evaluate(()=>window.__draws);
 await page.evaluate(()=>document.getElementById('msg').focus());
 await page.waitForTimeout(3000);
 const d1=await page.evaluate(()=>window.__draws);   // 입력창에 커서만 있고 가만히 3초
 for(let i=0;i<8;i++){await page.keyboard.type('가');await page.waitForTimeout(90)}
 const d2=await page.evaluate(()=>window.__draws);   // 8자 치는 동안
 await page.waitForTimeout(3000);
 const d3=await page.evaluate(()=>window.__draws);   // 친 뒤 3초 가만히
 console.log(file.split('/').slice(-2).join('/'),motion,'| 커서만 3초:',d1-d0,'| 8자 치는 0.7초:',d2-d1,'| 친 뒤 3초:',d3-d2);
 await browser.close();
})();
