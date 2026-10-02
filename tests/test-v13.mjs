import { chromium } from 'playwright';import fs from 'fs';
const html=fs.readFileSync('versions/v1.3/index.html','utf8');
const browser=await chromium.launch({headless:true});const page=await browser.newPage({viewport:{width:1600,height:1000}});
let errors=[];page.on('pageerror',e=>errors.push(String(e)));await page.setContent(html);
const checkpoints=[];
for(let sec=0;sec<60;sec+=1){await page.evaluate(()=>{for(let i=0;i<60;i++)update(1/60);draw()});if([5,10,20,30,45,59].includes(sec)){checkpoints.push(await page.evaluate(()=>({t,angle:$('angle').textContent,fill:$('fill').textContent,captured,bowl:deposits.length,spilled,falling:fall.length,violations:[...violations]})));}}
const final=await page.evaluate(()=>({captured,bowl:deposits.length,spilled,falling:fall.length,carried:load?1:0,accounted:deposits.length+spilled+fall.length+(load?1:0),violations:[...violations]}));
fs.mkdirSync('versions/v1.3/test-evidence',{recursive:true});await page.screenshot({path:'versions/v1.3/test-evidence/60s-full.png',fullPage:true});
fs.writeFileSync('versions/v1.3/test-evidence/TEST-REPORT.json',JSON.stringify({errors,checkpoints,final},null,2));await browser.close();
if(errors.length||final.violations.length||final.captured!==final.accounted)process.exit(1);