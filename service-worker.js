const PREFIX='trainpro-v2-'+new URL(self.registration.scope).pathname+'-';
const CACHE=PREFIX+'610049874321';
const ASSETS=["index.html","logo.jpg","icon-180.png","icon-192.png","icon-512.png","manifest.webmanifest","assets/index-CPdA1P9T.css","assets/react-CK2K1_Ez.js","assets/validation-BacIF-hl.js","assets/brazilian-foods-CLluZUUo.js","assets/index-BLe0LI-E.js"];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith(PREFIX)&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));});
self.addEventListener('message',event=>{if(event.data==='ACTIVATE_UPDATE')self.skipWaiting();});
self.addEventListener('fetch',event=>{
  const url=new URL(event.request.url),scope=new URL(self.registration.scope);
  if(event.request.method!=='GET'||url.origin!==scope.origin||!url.pathname.startsWith(scope.pathname))return;
  if(event.request.mode==='navigate'){
    if(![scope.pathname,scope.pathname+'index.html'].includes(url.pathname))return;
    event.respondWith(fetch(event.request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(new URL('index.html',scope).href,copy));}return response;}).catch(()=>caches.open(CACHE).then(cache=>cache.match(new URL('index.html',scope).href))));return;
  }
  if(!url.pathname.startsWith(scope.pathname+'assets/')&&!ASSETS.some(asset=>new URL(asset,scope).pathname===url.pathname))return;
  event.respondWith(caches.open(CACHE).then(async cache=>{const hit=await cache.match(event.request);if(hit)return hit;const response=await fetch(event.request);if(response.ok)await cache.put(event.request,response.clone());return response;}));
});