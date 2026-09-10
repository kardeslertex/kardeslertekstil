import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { webcrypto } from 'node:crypto';
import { File } from 'node:buffer';
const source=fs.readFileSync(new URL('../site/_worker.js',import.meta.url),'utf8').replace('export default {','const worker = {')+'\nthis.worker=worker;';
function setup(verification={success:true,hostname:'kardeslertekstil.com.tr',action:'quote_form'},upstreamOk=true){
 const calls=[];
 const context={URL,Request,Response,Headers,FormData,File,crypto:webcrypto,console:{error(){}},fetch:async(url,opts)=>{
  calls.push(url);
  return String(url).includes('siteverify')?Response.json(verification):new Response('{}',{status:upstreamOk?200:422});
 }};
 vm.createContext(context);vm.runInContext(source,context);return {worker:context.worker,calls};
}
function request(){const form=new FormData();form.set('cf-turnstile-response','test-token');form.set('firma','TEST');return new Request('https://kardeslertekstil.com.tr/api/teklif',{method:'POST',headers:{Origin:'https://kardeslertekstil.com.tr'},body:form});}
test('receipt only follows successful verification and accepted upstream form',async()=>{
 const {worker,calls}=setup();const res=await worker.fetch(request(),{TURNSTILE_SECRET_KEY:'mock'},{});
 assert.equal(res.status,303);assert.equal(calls.length,2);
 assert.match(res.headers.get('Set-Cookie'),/^kt_quote_receipt=[\da-f-]+; Path=\/; Max-Age=300; Secure; SameSite=Lax$/);
 assert.equal(res.headers.get('Location'),'https://kardeslertekstil.com.tr/tesekkur.html');assert.equal(res.headers.get('Cache-Control'),'no-store');
});
test('failed delivery cannot create a receipt',async()=>{const {worker}=setup(undefined,false);const res=await worker.fetch(request(),{TURNSTILE_SECRET_KEY:'mock'},{});assert.equal(res.status,502);assert.equal(res.headers.get('Set-Cookie'),null);});
test('invalid captcha cannot forward a form or create a receipt',async()=>{const {worker,calls}=setup({success:false});const res=await worker.fetch(request(),{TURNSTILE_SECRET_KEY:'mock'},{});assert.equal(res.status,403);assert.equal(calls.length,1);assert.equal(res.headers.get('Set-Cookie'),null);});
test('direct and repeated thank-you visits do not generate a lead',()=>{
 const client=fs.readFileSync(new URL('../site/site.js',import.meta.url),'utf8');const block=client.match(/    if \(document.body.dataset.conversion === "quote-success"\) \{[\s\S]*?\n    \}/)[0];
 let cookie='';const events=[];const document={body:{dataset:{conversion:'quote-success'}},get cookie(){return cookie;},set cookie(value){cookie=value.includes('Max-Age=0')?'':value;}};
 const c={document,track:(name)=>events.push(name)};vm.createContext(c);
 vm.runInContext(block,c);assert.equal(events.length,0);
 cookie='kt_quote_receipt=test-receipt';vm.runInContext(block,c);assert.deepEqual(events,['quote_form_success','generate_lead']);
 vm.runInContext(block,c);assert.equal(events.length,2);
});
