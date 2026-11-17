const json = (data, status = 200) => Response.json(data, {status, headers: {'Cache-Control':'no-store'}});
const validId = /^\d{13}-[a-f0-9-]{36}$/;
const types = ['image/png','image/jpeg','image/webp','image/gif'];
export async function api(request, env) {
  const url = new URL(request.url);
  const path = url.pathname;
  if (!env.BUCKET) return json({error:'Storage is unavailable. Please try again.'},503);
  try {
    if (path === '/api/upload' && request.method === 'GET') {
      const result = await env.BUCKET.list({prefix:'posts/', limit:50, include:['customMetadata'], ...(url.searchParams.get('cursor') ? {cursor:url.searchParams.get('cursor')} : {})});
      return json({posts:result.objects.map(o => ({_id:o.key.slice(6), title:o.customMetadata?.title || '', description:o.customMetadata?.description || '', imageUrl:'/api/images/'+o.key.slice(6), createdAt:o.uploaded})), cursor:result.truncated ? result.cursor : null});
    }
    if (path === '/api/upload' && request.method === 'POST') {
      if (Number(request.headers.get('content-length')) > 11*1024*1024) return json({error:'Choose an image smaller than 10 MB.'},413);
      const form = await request.formData();
      const file = form.get('file');
      const title = String(form.get('title') || '').trim();
      const description = String(form.get('description') || '').trim();
      if (!file || typeof file.arrayBuffer !== 'function' || !types.includes(file.type)) return json({error:'Choose a PNG, JPEG, WebP or GIF image.'},400);
      if (!file.size || file.size > 10*1024*1024) return json({error:'Choose an image between 1 byte and 10 MB.'},413);
      if (!title || title.length > 120 || description.length > 1000) return json({error:'A title is required (120 characters maximum); description maximum is 1000 characters.'},400);
      if (new TextEncoder().encode(title+description).length > 1800) return json({error:'Please shorten the title or description.'},400);
      const bytes = new Uint8Array(await file.arrayBuffer());
      const isImage = file.type === 'image/png' ? [137,80,78,71,13,10,26,10].every((v,i)=>bytes[i]===v) : file.type === 'image/jpeg' ? bytes[0]===255 && bytes[1]===216 && bytes[2]===255 : file.type === 'image/gif' ? new TextDecoder().decode(bytes.slice(0,6)).match(/^GIF8[79]a$/) : new TextDecoder().decode(bytes.slice(0,4))==='RIFF' && new TextDecoder().decode(bytes.slice(8,12))==='WEBP';
      if (!isImage) return json({error:'This file is not a supported image.'},400);
      const id = String(9999999999999-Date.now()).padStart(13,'0')+'-'+crypto.randomUUID();
      await env.BUCKET.put('posts/'+id,bytes,{httpMetadata:{contentType:file.type},customMetadata:{title,description}});
      return json({_id:id,title,description,imageUrl:'/api/images/'+id},201);
    }
    const imageId = path.startsWith('/api/images/') ? path.slice(12) : '';
    if (validId.test(imageId) && request.method === 'GET') {
      const object = await env.BUCKET.get('posts/'+imageId);
      if (!object) return json({error:'Image not found.'},404);
      return new Response(object.body,{headers:{'Content-Type':object.httpMetadata.contentType,'X-Content-Type-Options':'nosniff','Cache-Control':'private, max-age=0, must-revalidate'}});
    }
    const deleteId = path.startsWith('/api/upload/') ? path.slice(12) : '';
    if (validId.test(deleteId) && request.method === 'DELETE') {
      await env.BUCKET.delete('posts/'+deleteId);
      return json({deleted:true});
    }
    return json({error:'Not found.'},404);
  } catch (error) {
    console.error('Request failed',error.message);
    return json({error:'Unable to complete the request. Please try again.'},500);
  }
}
