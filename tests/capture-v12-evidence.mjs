import { chromium } from 'playwright';
import fs from 'fs';
fs.mkdirSync('versions/v1.2/test-evidence',{recursive:true});
const html=fs.readFileSync('versions/v1.2/index.html','utf8');
const tests=[
 ['01-heap-geometry',0.0,'Continuous heap geometry and rounded leading face'],
 ['02-scoop-contact',1.2,'Scoop/heap contact'],
 ['03-progressive-fill',2.4,'Progressive scoop fill'],
 ['04-carried-contour',3.6,'Captured contour retained during rotation'],
 ['05-release',4.8,'Scoop release'],
 ['06-gravity-fall',5.1,'Gravity-driven falling contour'],
 ['07-bowl-capture',6.3,'Bowl capture'],
 ['08-first-scoop-stable',7.5,'First deposited scoop remains stable'],
 ['09-second-scoop-contact',12.5,'Second scoop contact without upward launch'],
 ['10-multiple-scoops-retained',20.0,'Multiple scoops retained'],
 ['11-melt-settlement',25.0,'Melt/settlement state'],
 ['12-long-run-stability',35.0,'Long-run stability']
];
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:1600,height:1000}});
const errors=[]; page.on('pageerror',e=>errors.push(String(e)));
await page.setContent(html,{waitUntil:'domcontentloaded'});
let last=0, report=[];
for(const [name,target,label] of tests){
 const delta=target-last; last=target;
 if(delta>0){
   const n=Math.round(delta*60);
   await page.evaluate(([n,dt])=>{for(let i=0;i<n;i++) update(dt);draw();},[n,1/60]);
 }
 const state=await page.evaluate(()=>({
   angle:document.getElementById('angle').textContent,
   fill:document.getElementById('fill').textContent,
   drops:document.getElementById('drops').textContent,
   bowlFill:document.getElementById('bfill').textContent,
   elapsed:document.getElementById('elapsed').textContent,
   falling:fall.length,deposits:deposits.length,carrying:!!load
 }));
 report.push({test:name,label,targetSeconds:target,state});
 await page.screenshot({path:`versions/v1.2/test-evidence/${name}.png`,fullPage:true});
}
report.push({runtimeErrors:errors});
fs.writeFileSync('versions/v1.2/test-evidence/TEST-REPORT.json',JSON.stringify(report,null,2));
await browser.close();
if(errors.length) process.exit(1);
