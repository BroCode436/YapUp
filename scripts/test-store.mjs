import {DatabaseSync} from 'node:sqlite';
import {readFileSync,readdirSync} from 'node:fs';
export function createStore(){
 const sqlite=new DatabaseSync(':memory:');sqlite.exec('PRAGMA foreign_keys=ON;');
 for(const name of readdirSync('drizzle').filter(n=>n.endsWith('.sql')).sort())sqlite.exec(readFileSync('drizzle/'+name,'utf8'));
 const wrap=(sql,args=[])=>({sql,args,bind(...a){return wrap(sql,a);},async first(){return sqlite.prepare(sql).get(...args)||null;},async all(){return{results:sqlite.prepare(sql).all(...args)};},async run(){return{meta:sqlite.prepare(sql).run(...args)};}});
 const DB={prepare:wrap,async batch(statements){sqlite.exec('BEGIN');try{const out=[];for(const s of statements)out.push(await s.run());sqlite.exec('COMMIT');return out;}catch(e){sqlite.exec('ROLLBACK');throw e;}}};
 const objects=new Map();const BUCKET={async put(key,bytes,meta){objects.set(key,{bytes:new Uint8Array(bytes),...meta});},async get(key){const o=objects.get(key);return o?{body:o.bytes,...o}:null;},async delete(key){objects.delete(key);}};
 return{DB,BUCKET,sqlite};
}
