import { chromium } from 'playwright';import fs from 'fs';
const out='versions/v1.4/test-evidence';fs.mkdirSync(out,{recursive:true});
const html=fs.readFileSync('versions/v1.4/index.html','utf8');
const browser=await chromium.launch({headless:true});const page=await browser.newPage({viewport:{width:1600,height:1000}});
let errors=[];page.on('pageerror',e=>errors.push(String(e)));await page.setContent(html);
const shots=[];async function shot(name){await page.evaluate(()=>draw());await page.screenshot({path:`${out}/${name}.png`,fullPage:true});shots.push(name+'.png')}
await shot('01-initial-world');

// capture/contact/fill/carried/release/fall/landing evidence
let seen={contact:false,fill:false,carried:false,release:false,fall:false,landing:false};
for(let i=0;i<120*60;i++){
 await page.evaluate(()=>{update(1/60);draw()});
 const s=await page.evaluate(()=>({t,load:!!load,frac:load?.frac||0,fall:fall.length,dep:deposits.length,contact:contactAccum.length,captured,spilled,violations:[...violations]}));
 if(!seen.contact&&s.contact>2){seen.contact=true;await shot('02-scoop-contact')}
 if(!seen.fill&&s.frac>.25){seen.fill=true;await shot('03-progressive-fill')}
 if(!seen.carried&&s.load&&s.frac>.45){seen.carried=true;await shot('04-carried-contour')}
 if(!seen.release&&s.fall>0){seen.release=true;await shot('05-release')}
 if(!seen.fall&&s.fall>0){await page.evaluate(()=>{for(let j=0;j<12;j++)update(1/60);draw()});seen.fall=true;await shot('06-gravity-fall')}
 if(!seen.landing&&s.dep>0){seen.landing=true;await shot('07-natural-bowl-capture');break}
}
const landing=await page.evaluate(()=>({t,captured,bowl:deposits.length,spilled,falling:fall.length,violations:[...violations]}));
await shot('08-first-scoop-stable');

// bowl containment translation
const bm=await page.evaluate(()=>{const b={x:bowl.x,y:bowl.y},d=deposits.map(x=>centroid(x.points)),r=C.getBoundingClientRect();return{b,d,sx:(bowl.x/C.width)*r.width+r.left,sy:(bowl.y/C.height)*r.height+r.top}});
await page.mouse.move(bm.sx,bm.sy);await page.mouse.down();await page.mouse.move(bm.sx+100,bm.sy+35);await page.mouse.up();
const ba=await page.evaluate(()=>({b:{x:bowl.x,y:bowl.y},d:deposits.map(x=>centroid(x.points))}));
const db={x:ba.b.x-bm.b.x,y:ba.b.y-bm.b.y},dm=ba.d.map((p,i)=>({x:p.x-bm.d[i].x,y:p.y-bm.d[i].y}));
const bowlCarries=dm.every(m=>Math.abs(m.x-db.x)<1&&Math.abs(m.y-db.y)<1);await shot('09-bowl-moved-with-contents');

// continue for second scoop + multiple retention
for(let i=0;i<120*60;i++){await page.evaluate(()=>{update(1/60);draw()});if(await page.evaluate(()=>deposits.length>=2||spilled>=1))break}
await shot('10-second-cycle-result');
for(let i=0;i<10*60;i++)await page.evaluate(()=>update(1/60));await shot('11-post-settlement-stability');
for(let i=0;i<25*60;i++)await page.evaluate(()=>update(1/60));await shot('12-long-run-state');

const final=await page.evaluate(()=>({t,captured,bowl:deposits.length,spilled,falling:fall.length,carried:load?1:0,accounted:deposits.length+spilled+fall.length+(load?1:0),violations:[...violations]}));
const tests={runtimeNoErrors:errors.length===0,naturalLanding:landing.bowl>0,bowlCarriesContents:bowlCarries,massAccounted:final.captured===final.accounted,noInvariantViolations:final.violations.length===0,contactObserved:seen.contact,progressiveFillObserved:seen.fill,releaseObserved:seen.release,gravityFallObserved:seen.fall};
const report={version:'v1.4',errors,shots,landing,bowlMovement:{before:bm,after:ba,bowlDelta:db,depositDeltas:dm,pass:bowlCarries},final,tests,pass:Object.values(tests).every(Boolean)};
fs.writeFileSync(out+'/TEST-REPORT.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));await browser.close();if(!report.pass)process.exit(1);