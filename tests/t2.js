const {open}=require('./harness');
const m=`()=>{const c=document.getElementById('center').getBoundingClientRect(),lis=[...document.querySelectorAll('#log li')],l=lis[lis.length-1].getBoundingClientRect(),d=document.querySelector('.dock').getBoundingClientRect(),vv=window.visualViewport;
 const top=vv?vv.offsetTop:0,vh=vv?vv.height:innerHeight;
 return{lis:lis.length,lastBottomVsCenter:Math.round(l.bottom-c.bottom),lastVisible:l.bottom<=c.bottom+1,dockInView:d.top>=top-1&&d.bottom<=top+vh+1,dockBottom:Math.round(d.bottom),vvh:Math.round(vh)}}`;
(async()=>{
 const [file,motion]=[process.argv[2],process.argv[3]];
 const out={};
 // A) 긴 답
 let {browser,page}=await open({file,motion,chunks:60,cpu:4,fakeVV:true});
 await page.evaluate(()=>{const v=window.visualViewport;v.height=700;v.dispatchEvent(new Event('resize'))});
 await page.click('#startBtn');
 await page.waitForTimeout(500); await page.waitForFunction(()=>!S.busy&&document.querySelectorAll('#log li').length>=1&&document.querySelector('#log li.ai').textContent.length>3000,null,{timeout:30000});
 await page.waitForTimeout(500);
 out.A_longAnswer=await page.evaluate(eval(m));
 // 사용자 말풍선 추가 → 두 번째 긴 답
 await page.fill('#msg','다음 질문입니다'); await page.press('#msg','Enter');
 await page.waitForTimeout(500); await page.waitForFunction(()=>!S.busy&&document.querySelectorAll('#log li').length>=3,null,{timeout:30000}); await page.waitForTimeout(300);
 out.B_secondTurn=await page.evaluate(eval(m));
 // C) 실제 뷰포트 축소(키보드 열림: 레이아웃 뷰포트가 같이 줄어드는 방식)
 await page.setViewportSize({width:390,height:400}); await page.evaluate(()=>{const v=window.visualViewport;v.height=400;v.dispatchEvent(new Event('resize'))}); await page.waitForTimeout(400);
 out.C_resizeShrink=await page.evaluate(eval(m));
 await page.setViewportSize({width:390,height:700}); await page.evaluate(()=>{const v=window.visualViewport;v.height=700;v.dispatchEvent(new Event('resize'))}); await page.waitForTimeout(400);
 out.D_resizeBack=await page.evaluate(eval(m));
 // E) visualViewport만 줄어드는 방식(Android Chrome·iOS): 가짜 visualViewport로 재현
 await page.evaluate(()=>{const v=window.visualViewport;v.height=380;v.offsetTop=0;v.dispatchEvent(new Event('resize'))});
 await page.waitForTimeout(400);
 out.E_vvShrink=await page.evaluate(eval(m));
 await page.evaluate(()=>{const v=window.visualViewport;v.height=700;v.dispatchEvent(new Event('resize'))});
 await page.waitForTimeout(400);
 out.F_vvBack=await page.evaluate(eval(m));
 await browser.close();
 console.log(JSON.stringify({file:file.split('/').slice(-2).join('/'),motion,...out},null,1));
})().catch(e=>{console.error(e);process.exit(1)});
