import {readFileSync,writeFileSync,mkdirSync,readdirSync} from 'node:fs';
import {join,extname} from 'node:path';
const assets = {};
const mime = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png'};
function collect(dir, prefix='') { for (const entry of readdirSync(dir,{withFileTypes:true})) { const p=join(dir,entry.name), key=prefix+'/'+entry.name; if(entry.isDirectory()) collect(p,key); else assets[key]={body:readFileSync(p).toString('base64'),type:mime[extname(p)]||'application/octet-stream'}; } }
collect('dist/client');
mkdirSync('dist/server',{recursive:true});
mkdirSync('dist/.openai',{recursive:true});
writeFileSync('dist/.openai/hosting.json',readFileSync('.openai/hosting.json'));
writeFileSync('dist/server/index.js',readFileSync('worker/community-api.js','utf8')+'\nconst assets='+JSON.stringify(assets)+`;\nexport default {async fetch(request,env) { const path=new URL(request.url).pathname; if(path.startsWith('/api/')) return api(request,env); const asset=assets[path==='/'?'/index.html':path]; if(!asset) return new Response('Not found',{status:404}); return new Response(Uint8Array.from(atob(asset.body),c=>c.charCodeAt(0)),{headers:{'Content-Type':asset.type,'X-Content-Type-Options':'nosniff'}}); }};`);
