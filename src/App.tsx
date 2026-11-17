import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
type Post = {_id:string; title:string; description:string; imageUrl:string};
async function result(response:Response) {const data=await response.json(); if(!response.ok) throw new Error(data.error || 'Request failed'); return data;}
export default function App() {
 const [page,setPage]=useState<'feed'|'create'>('feed');
 const [posts,setPosts]=useState<Post[]>([]);
 const [cursor,setCursor]=useState<string|null>(null);
 const [busy,setBusy]=useState(false);
 const [loading,setLoading]=useState(true);
 const [error,setError]=useState('');
 const [notice,setNotice]=useState('');
 async function load(next?:string) {setLoading(true);setError('');try{const data=await result(await fetch('/api/upload'+(next?'?cursor='+encodeURIComponent(next):'')));setPosts(old=>next?[...old,...data.posts]:data.posts);setCursor(data.cursor);}catch(e){setError((e as Error).message);}finally{setLoading(false);}}
 useEffect(()=>{void load();},[]);
 async function upload(e:FormEvent<HTMLFormElement>) {e.preventDefault();const form=e.currentTarget;setBusy(true);setError('');setNotice('');try{await result(await fetch('/api/upload',{method:'POST',body:new FormData(form)}));form.reset();setPage('feed');setNotice('Post uploaded.');await load();}catch(e){setError((e as Error).message);}finally{setBusy(false);}}
 async function remove(id:string) {if(!confirm('Delete this post permanently?'))return;setBusy(true);setError('');try{await result(await fetch('/api/upload/'+id,{method:'DELETE'}));setPosts(old=>old.filter(p=>p._id!==id));setNotice('Post deleted.');}catch(e){setError((e as Error).message);}finally{setBusy(false);}}
 return <main><header><h1>Krash</h1><p>Your moments, all in one place.</p></header><nav aria-label="Main navigation"><button className={page==='feed'?'active':''} onClick={()=>{setPage('feed');setError('');}}>Home</button><button className={page==='create'?'active':''} onClick={()=>{setPage('create');setError('');setNotice('');}}>Create</button></nav>{error&&<p role="alert" className="error">{error}</p>}{notice&&<p role="status" className="notice">{notice}</p>}{page==='create'?<section><h2>Create post</h2><form onSubmit={upload}><label>Title<input name="title" required maxLength={120} placeholder="Give your moment a title" /></label><label>Description<textarea name="description" maxLength={1000} rows={4} placeholder="Tell the story" /></label><label>Image<input name="file" type="file" accept="image/png,image/jpeg,image/webp,image/gif" required /></label><p className="hint">PNG, JPEG, WebP or GIF. Up to 10 MB.</p><button disabled={busy} className="primary" type="submit">{busy?'Uploading...':'Upload post'}</button></form></section>:<section><div className="feed-heading"><h2>Feed</h2><button disabled={loading} onClick={()=>void load()}>Refresh</button></div>{loading&&<p role="status">Loading...</p>}{!loading&&!posts.length&&!error&&<div className="empty"><h3>No posts yet</h3><p>Upload your first moment to get started.</p><button onClick={()=>setPage('create')}>Create a post</button></div>}{posts.map(post=><article key={post._id}><img src={post.imageUrl} alt={post.title} loading="lazy"/><div className="post-body"><h3>{post.title}</h3><p>{post.description}</p><button disabled={busy} onClick={()=>void remove(post._id)}>Delete</button></div></article>)}{cursor&&<button disabled={loading} onClick={()=>void load(cursor)}>Load more</button>}</section>}</main>;
}
