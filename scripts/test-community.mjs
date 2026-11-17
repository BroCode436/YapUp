import assert from 'node:assert/strict';
import {api} from '../worker/community-api.js';
import {createStore} from './test-store.mjs';
const env=createStore();
const users={alice:['a','alice@kiet.edu'],bob:['b','bob@kiet.edu'],outsider:['c','c@iitd.ac.in'],personal:['d','person@gmail.com']};
async function call(who,path,method='GET',data,scope='campus'){
 const headers={};if(who){headers['oai-authenticated-user-id']=users[who][0];headers['oai-authenticated-user-email']=users[who][1];}
 let body;if(data instanceof FormData)body=data;else if(data!==undefined){headers['Content-Type']='application/json';body=JSON.stringify(data);}
 return api(new Request('https://yapup.test/api/'+path+(path.includes('?')?'&':'?')+'scope='+scope,{method,headers,body}),env);
}
const expect=async(who,path,method,data,status=200,scope='campus')=>{const r=await call(who,path,method,data,scope);const d=await r.json();assert.equal(r.status,status,JSON.stringify(d));return d;};
await expect(null,'posts','GET',undefined,401);
for(const who of ['alice','bob','outsider'])await expect(who,'profile','POST',{name:who,campus:users[who][1].split('@')[1]});
await expect('personal','profile','POST',{name:'Spoof',campus:'kiet.edu'},403);
await expect('personal','verify/send','POST',{email:'x@kiet.edu',campus:'kiet.edu'},503);
const form=new FormData();form.set('body','A campus-only conversation');form.set('category','Questions');const bytes=Uint8Array.from([137,80,78,71,13,10,26,10]);form.set('file',new Blob([bytes],{type:'image/png'}),'test.png');
const post=await expect('alice','posts','POST',form,201);
assert.equal((await expect('bob','posts')).length,1);assert.equal((await expect('outsider','posts')).length,0);
await expect('outsider','posts/'+post.id+'/comments','GET',undefined,404);
assert.equal((await call('outsider','posts/'+post.id+'/image')).status,404);
await expect('bob','posts/'+post.id,'DELETE',undefined,403);
await expect('bob','posts/'+post.id+'/like','PUT',{active:true});await expect('bob','posts/'+post.id+'/like','PUT',{active:true});assert.equal((await expect('alice','posts'))[0].likes,1);
await expect('bob','posts/'+post.id+'/comments','POST',{body:'Hello'},201);assert.equal((await expect('alice','notifications')).length,1);
const globalPost=await expect('alice','posts','POST',form,201,'global');assert.equal((await expect('outsider','posts','GET',undefined,200,'global')).length,1);await expect('outsider','posts/'+globalPost.id+'/comments','POST',{body:'Across campuses'},201,'global');
const event=await expect('alice','events','POST',{title:'Tea',location:'Canteen',starts:Date.now()+3600000,capacity:1},201);await expect('alice','events/'+event.id+'/rsvp','PUT',{active:true});await expect('bob','events/'+event.id+'/rsvp','PUT',{active:true},409);await expect('alice','events/'+event.id+'/rsvp','PUT',{active:false});await expect('bob','events/'+event.id+'/rsvp','PUT',{active:true});
const club=await expect('alice','clubs','POST',{name:'Book circle',description:'Books & friends'},201);await expect('bob','messages?channel=club:'+club.id,'GET',undefined,403);await expect('bob','clubs/'+club.id+'/join','PUT',{active:true});await expect('bob','messages?channel=club:'+club.id,'POST',{body:'Hello readers'},201);assert.equal((await expect('alice','messages?channel=club:'+club.id)).length,1);await expect('outsider','clubs/'+club.id+'/join','PUT',{active:true},404);
await expect('alice','posts/'+post.id,'DELETE');assert.equal((await call('alice','posts/'+post.id+'/image')).status,404);assert.equal(env.sqlite.prepare('SELECT COUNT(*) AS n FROM comments WHERE post=?').get(post.id).n,0);
const people=await expect('bob','members');assert.ok(!JSON.stringify(people).includes('@'));assert.equal(people.length,2);
console.log('PASS: college email gates; campus isolation; global sharing; upload/image authorization; owner-only deletion; idempotent likes; comments/notifications; atomic RSVP capacity; club membership and chat privacy; cascades; email privacy.');
