import { chromium } from 'playwright';import fs from 'fs';
const html=fs.readFileSync('versions/v1.3/index.html','utf8');
const browser=await chromium.launch({headless:true});const page=await browser.newPage({viewport:{width:1600,height:1000}});
let errors=[];page.on('pageerror',e=>errors.push(String(e)));await page.setContent(html);

// Run until at least one deposit exists, or 120 simulated seconds.
for(let i=0;i<120*60;i++){await page.evaluate(()=>{update(1/60);draw()});if(await page.evaluate(()=>deposits.length>0))break;}
const landing=await page.evaluate(()=>({t,captured,bowl:deposits.length,spilled,falling:fall.length,violations:[...violations]}));
fs.mkdirSync('versions/v1.3/test-evidence',{recursive:true});
await page.screenshot({path:'versions/v1.3/test-evidence/01-natural-landing.png',fullPage:true});

// Explicit containment-motion test: record deposited ice cream relative to bowl, drag bowl +100,+40 using the real UI pointer path, then compare.
let bowlMove=null;
if(landing.bowl>0){
  bowlMove=await page.evaluate(()=>{
    const beforeB={x:bowl.x,y:bowl.y};
    const before=deposits.map(d=>centroid(d.points));
    const r=C.getBoundingClientRect();
    const sx=(bowl.x/C.width)*r.width+r.left, sy=(bowl.y/C.height)*r.height+r.top;
    return {beforeB,before,sx,sy};
  });
  await page.mouse.move(bowlMove.sx,bowlMove.sy);await page.mouse.down();await page.mouse.move(bowlMove.sx+100,bowlMove.sy+40);await page.mouse.up();
  const after=await page.evaluate(()=>({bowl:{x:bowl.x,y:bowl.y},dep:deposits.map(d=>centroid(d.points))}));
  const dbx=after.bowl.x-bowlMove.beforeB.x,dby=after.bowl.y-bowlMove.beforeB.y;
  const motions=after.dep.map((p,i)=>({dx:p.x-bowlMove.before[i].x,dy:p.y-bowlMove.before[i].y}));
  const follows=motions.every(m=>Math.abs(m.dx-dbx)<1&&Math.abs(m.dy-dby)<1);
  bowlMove={...bowlMove,after,dbx,dby,motions,follows};
  await page.screenshot({path:'versions/v1.3/test-evidence/02-bowl-moved-with-contents.png',fullPage:true});
}
const final=await page.evaluate(()=>({captured,bowl:deposits.length,spilled,falling:fall.length,carried:load?1:0,accounted:deposits.length+spilled+fall.length+(load?1:0),violations:[...violations]}));
const report={errors,landing,bowlMove,final,tests:{naturalLanding:landing.bowl>0,bowlCarriesContents:!!bowlMove?.follows,massAccounted:final.captured===final.accounted,noInvariantViolations:final.violations.length===0}};
fs.writeFileSync('versions/v1.3/test-evidence/TEST-REPORT.json',JSON.stringify(report,null,2));
await browser.close();
console.log(JSON.stringify(report,null,2));
if(errors.length||!report.tests.naturalLanding||!report.tests.bowlCarriesContents||!report.tests.massAccounted||!report.tests.noInvariantViolations)process.exit(1);