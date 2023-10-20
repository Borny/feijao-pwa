(()=>{try{self["workbox:core:6.5.4"]&&_()}catch{}var ae=(o,...e)=>{let t=o;return e.length>0&&(t+=` :: ${JSON.stringify(e)}`),t};var X=ae;var c=class extends Error{constructor(e,t){let r=X(e,t);super(r),this.name=e,this.details=t}};var F=new Set;var g={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:typeof registration!="undefined"?registration.scope:""},V=o=>[g.prefix,o,g.suffix].filter(e=>e&&e.length>0).join("-"),ne=o=>{for(let e of Object.keys(g))o(e)},m={updateDetails:o=>{ne(e=>{typeof o[e]=="string"&&(g[e]=o[e])})},getGoogleAnalyticsName:o=>o||V(g.googleAnalytics),getPrecacheName:o=>o||V(g.precache),getPrefix:()=>g.prefix,getRuntimeName:o=>o||V(g.runtime),getSuffix:()=>g.suffix};function Z(o,e){let t=new URL(o);for(let r of e)t.searchParams.delete(r);return t.href}async function S(o,e,t,r){let s=Z(e.url,t);if(e.url===s)return o.match(e,r);let a=Object.assign(Object.assign({},r),{ignoreSearch:!0}),n=await o.keys(e,a);for(let i of n){let l=Z(i.url,t);if(s===l)return o.match(i,r)}}var b;function W(){if(b===void 0){let o=new Response("");if("body"in o)try{new Response(o.body),b=!0}catch{b=!1}b=!1}return b}var N=class{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}};async function K(){for(let o of F)await o()}var M=o=>new URL(String(o),location.href).href.replace(new RegExp(`^${location.origin}`),"");function k(o){return new Promise(e=>setTimeout(e,o))}function $(o,e){let t=e();return o.waitUntil(t),t}async function I(o,e){let t=null;if(o.url&&(t=new URL(o.url).origin),t!==self.location.origin)throw new c("cross-origin-copy-response",{origin:t});let r=o.clone(),s={headers:new Headers(r.headers),status:r.status,statusText:r.statusText},a=e?e(s):s,n=W()?r.body:await r.blob();return new Response(n,a)}function H(){self.addEventListener("activate",()=>self.clients.claim())}try{self["workbox:precaching:6.5.4"]&&_()}catch{}var ce="__WB_REVISION__";function te(o){if(!o)throw new c("add-to-cache-list-unexpected-type",{entry:o});if(typeof o=="string"){let a=new URL(o,location.href);return{cacheKey:a.href,url:a.href}}let{revision:e,url:t}=o;if(!t)throw new c("add-to-cache-list-unexpected-type",{entry:o});if(!e){let a=new URL(t,location.href);return{cacheKey:a.href,url:a.href}}let r=new URL(t,location.href),s=new URL(t,location.href);return r.searchParams.set(ce,e),{cacheKey:r.href,url:s.href}}var O=class{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:r})=>{if(e.type==="install"&&t&&t.originalRequest&&t.originalRequest instanceof Request){let s=t.originalRequest.url;r?this.notUpdatedURLs.push(s):this.updatedURLs.push(s)}return r}}};var L=class{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:t,params:r})=>{let s=(r==null?void 0:r.cacheKey)||this._precacheController.getCacheKeyForURL(t.url);return s?new Request(s,{headers:t.headers}):t},this._precacheController=e}};try{self["workbox:strategies:6.5.4"]&&_()}catch{}function T(o){return typeof o=="string"?new Request(o):o}var D=class{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new N,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(let r of this._plugins)this._pluginStateMap.set(r,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){let{event:t}=this,r=T(e);if(r.mode==="navigate"&&t instanceof FetchEvent&&t.preloadResponse){let n=await t.preloadResponse;if(n)return n}let s=this.hasCallback("fetchDidFail")?r.clone():null;try{for(let n of this.iterateCallbacks("requestWillFetch"))r=await n({request:r.clone(),event:t})}catch(n){if(n instanceof Error)throw new c("plugin-error-request-will-fetch",{thrownErrorMessage:n.message})}let a=r.clone();try{let n;n=await fetch(r,r.mode==="navigate"?void 0:this._strategy.fetchOptions);for(let i of this.iterateCallbacks("fetchDidSucceed"))n=await i({event:t,request:a,response:n});return n}catch(n){throw s&&await this.runCallbacks("fetchDidFail",{error:n,event:t,originalRequest:s.clone(),request:a.clone()}),n}}async fetchAndCachePut(e){let t=await this.fetch(e),r=t.clone();return this.waitUntil(this.cachePut(e,r)),t}async cacheMatch(e){let t=T(e),r,{cacheName:s,matchOptions:a}=this._strategy,n=await this.getCacheKey(t,"read"),i=Object.assign(Object.assign({},a),{cacheName:s});r=await caches.match(n,i);for(let l of this.iterateCallbacks("cachedResponseWillBeUsed"))r=await l({cacheName:s,matchOptions:a,cachedResponse:r,request:n,event:this.event})||void 0;return r}async cachePut(e,t){let r=T(e);await k(0);let s=await this.getCacheKey(r,"write");if(!t)throw new c("cache-put-with-no-response",{url:M(s.url)});let a=await this._ensureResponseSafeToCache(t);if(!a)return!1;let{cacheName:n,matchOptions:i}=this._strategy,l=await self.caches.open(n),h=this.hasCallback("cacheDidUpdate"),p=h?await S(l,s.clone(),["__WB_REVISION__"],i):null;try{await l.put(s,h?a.clone():a)}catch(u){if(u instanceof Error)throw u.name==="QuotaExceededError"&&await K(),u}for(let u of this.iterateCallbacks("cacheDidUpdate"))await u({cacheName:n,oldResponse:p,newResponse:a.clone(),request:s,event:this.event});return!0}async getCacheKey(e,t){let r=`${e.url} | ${t}`;if(!this._cacheKeys[r]){let s=e;for(let a of this.iterateCallbacks("cacheKeyWillBeUsed"))s=T(await a({mode:t,request:s,event:this.event,params:this.params}));this._cacheKeys[r]=s}return this._cacheKeys[r]}hasCallback(e){for(let t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(let r of this.iterateCallbacks(e))await r(t)}*iterateCallbacks(e){for(let t of this._strategy.plugins)if(typeof t[e]=="function"){let r=this._pluginStateMap.get(t);yield a=>{let n=Object.assign(Object.assign({},a),{state:r});return t[e](n)}}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,r=!1;for(let s of this.iterateCallbacks("cacheWillUpdate"))if(t=await s({request:this.request,response:t,event:this.event})||void 0,r=!0,!t)break;return r||t&&t.status!==200&&(t=void 0),t}};var P=class{constructor(e={}){this.cacheName=m.getRuntimeName(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){let[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});let t=e.event,r=typeof e.request=="string"?new Request(e.request):e.request,s="params"in e?e.params:void 0,a=new D(this,{event:t,request:r,params:s}),n=this._getResponse(a,r,t),i=this._awaitComplete(n,a,r,t);return[n,i]}async _getResponse(e,t,r){await e.runCallbacks("handlerWillStart",{event:r,request:t});let s;try{if(s=await this._handle(t,e),!s||s.type==="error")throw new c("no-response",{url:t.url})}catch(a){if(a instanceof Error){for(let n of e.iterateCallbacks("handlerDidError"))if(s=await n({error:a,event:r,request:t}),s)break}if(!s)throw a}for(let a of e.iterateCallbacks("handlerWillRespond"))s=await a({event:r,request:t,response:s});return s}async _awaitComplete(e,t,r,s){let a,n;try{a=await e}catch{}try{await t.runCallbacks("handlerDidRespond",{event:s,request:r,response:a}),await t.doneWaiting()}catch(i){i instanceof Error&&(n=i)}if(await t.runCallbacks("handlerDidComplete",{event:s,request:r,response:a,error:n}),t.destroy(),n)throw n}};var d=class extends P{constructor(e={}){e.cacheName=m.getPrecacheName(e.cacheName),super(e),this._fallbackToNetwork=e.fallbackToNetwork!==!1,this.plugins.push(d.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){let r=await t.cacheMatch(e);return r||(t.event&&t.event.type==="install"?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,t){let r,s=t.params||{};if(this._fallbackToNetwork){let a=s.integrity,n=e.integrity,i=!n||n===a;if(r=await t.fetch(new Request(e,{integrity:e.mode!=="no-cors"?n||a:void 0})),a&&i&&e.mode!=="no-cors"){this._useDefaultCacheabilityPluginIfNeeded();let l=await t.cachePut(e,r.clone())}}else throw new c("missing-precache-entry",{cacheName:this.cacheName,url:e.url});return r}async _handleInstall(e,t){this._useDefaultCacheabilityPluginIfNeeded();let r=await t.fetch(e);if(!await t.cachePut(e,r.clone()))throw new c("bad-precaching-response",{url:e.url,status:r.status});return r}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(let[r,s]of this.plugins.entries())s!==d.copyRedirectedCacheableResponsesPlugin&&(s===d.defaultPrecacheCacheabilityPlugin&&(e=r),s.cacheWillUpdate&&t++);t===0?this.plugins.push(d.defaultPrecacheCacheabilityPlugin):t>1&&e!==null&&this.plugins.splice(e,1)}};d.defaultPrecacheCacheabilityPlugin={async cacheWillUpdate({response:o}){return!o||o.status>=400?null:o}};d.copyRedirectedCacheableResponsesPlugin={async cacheWillUpdate({response:o}){return o.redirected?await I(o):o}};var E=class{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:r=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new d({cacheName:m.getPrecacheName(e),plugins:[...t,new L({precacheController:this})],fallbackToNetwork:r}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){let t=[];for(let r of e){typeof r=="string"?t.push(r):r&&r.revision===void 0&&t.push(r.url);let{cacheKey:s,url:a}=te(r),n=typeof r!="string"&&r.revision?"reload":"default";if(this._urlsToCacheKeys.has(a)&&this._urlsToCacheKeys.get(a)!==s)throw new c("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(a),secondEntry:s});if(typeof r!="string"&&r.integrity){if(this._cacheKeysToIntegrities.has(s)&&this._cacheKeysToIntegrities.get(s)!==r.integrity)throw new c("add-to-cache-list-conflicting-integrities",{url:a});this._cacheKeysToIntegrities.set(s,r.integrity)}if(this._urlsToCacheKeys.set(a,s),this._urlsToCacheModes.set(a,n),t.length>0){let i=`Workbox is precaching URLs without revision info: ${t.join(", ")}
This is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(i)}}}install(e){return $(e,async()=>{let t=new O;this.strategy.plugins.push(t);for(let[a,n]of this._urlsToCacheKeys){let i=this._cacheKeysToIntegrities.get(n),l=this._urlsToCacheModes.get(a),h=new Request(a,{integrity:i,cache:l,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:n},request:h,event:e}))}let{updatedURLs:r,notUpdatedURLs:s}=t;return{updatedURLs:r,notUpdatedURLs:s}})}activate(e){return $(e,async()=>{let t=await self.caches.open(this.strategy.cacheName),r=await t.keys(),s=new Set(this._urlsToCacheKeys.values()),a=[];for(let n of r)s.has(n.url)||(await t.delete(n),a.push(n.url));return{deletedURLs:a}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){let t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){let t=e instanceof Request?e.url:e,r=this.getCacheKeyForURL(t);if(r)return(await self.caches.open(this.strategy.cacheName)).match(r)}createHandlerBoundToURL(e){let t=this.getCacheKeyForURL(e);if(!t)throw new c("non-precached-url",{url:e});return r=>(r.request=new Request(e),r.params=Object.assign({cacheKey:t},r.params),this.strategy.handle(r))}};var j,w=()=>(j||(j=new E),j);try{self["workbox:routing:6.5.4"]&&_()}catch{}var q="GET";var y=o=>o&&typeof o=="object"?o:{handle:o};var f=class{constructor(e,t,r=q){this.handler=y(t),this.match=e,this.method=r}setCatchHandler(e){this.catchHandler=y(e)}};var C=class extends f{constructor(e,t,r){let s=({url:a})=>{let n=e.exec(a.href);if(!!n&&!(a.origin!==location.origin&&n.index!==0))return n.slice(1)};super(s,t,r)}};var x=class{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",e=>{let{request:t}=e,r=this.handleRequest({request:t,event:e});r&&e.respondWith(r)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&e.data.type==="CACHE_URLS"){let{payload:t}=e.data,r=Promise.all(t.urlsToCache.map(s=>{typeof s=="string"&&(s=[s]);let a=new Request(...s);return this.handleRequest({request:a,event:e})}));e.waitUntil(r),e.ports&&e.ports[0]&&r.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){let r=new URL(e.url,location.href);if(!r.protocol.startsWith("http"))return;let s=r.origin===location.origin,{params:a,route:n}=this.findMatchingRoute({event:t,request:e,sameOrigin:s,url:r}),i=n&&n.handler,l=[],h=e.method;if(!i&&this._defaultHandlerMap.has(h)&&(i=this._defaultHandlerMap.get(h)),!i)return;let p;try{p=i.handle({url:r,request:e,event:t,params:a})}catch(R){p=Promise.reject(R)}let u=n&&n.catchHandler;return p instanceof Promise&&(this._catchHandler||u)&&(p=p.catch(async R=>{if(u)try{return await u.handle({url:r,request:e,event:t,params:a})}catch(z){z instanceof Error&&(R=z)}if(this._catchHandler)return this._catchHandler.handle({url:r,request:e,event:t});throw R})),p}findMatchingRoute({url:e,sameOrigin:t,request:r,event:s}){let a=this._routes.get(r.method)||[];for(let n of a){let i,l=n.match({url:e,sameOrigin:t,request:r,event:s});if(l)return i=l,(Array.isArray(i)&&i.length===0||l.constructor===Object&&Object.keys(l).length===0||typeof l=="boolean")&&(i=void 0),{route:n,params:i}}return{}}setDefaultHandler(e,t=q){this._defaultHandlerMap.set(t,y(e))}setCatchHandler(e){this._catchHandler=y(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new c("unregister-route-but-not-found-with-method",{method:e.method});let t=this._routes.get(e.method).indexOf(e);if(t>-1)this._routes.get(e.method).splice(t,1);else throw new c("unregister-route-route-not-registered")}};var v,A=()=>(v||(v=new x,v.addFetchListener(),v.addCacheListener()),v);function B(o,e,t){let r;if(typeof o=="string"){let a=new URL(o,location.href),n=({url:i})=>i.href===a.href;r=new f(n,e,t)}else if(o instanceof RegExp)r=new C(o,e,t);else if(typeof o=="function")r=new f(o,e,t);else if(o instanceof f)r=o;else throw new c("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});return A().registerRoute(r),r}function re(o,e=[]){for(let t of[...o.searchParams.keys()])e.some(r=>r.test(t))&&o.searchParams.delete(t);return o}function*oe(o,{ignoreURLParametersMatching:e=[/^utm_/,/^fbclid$/],directoryIndex:t="index.html",cleanURLs:r=!0,urlManipulation:s}={}){let a=new URL(o,location.href);a.hash="",yield a.href;let n=re(a,e);if(yield n.href,t&&n.pathname.endsWith("/")){let i=new URL(n.href);i.pathname+=t,yield i.href}if(r){let i=new URL(n.href);i.pathname+=".html",yield i.href}if(s){let i=s({url:a});for(let l of i)yield l.href}}var U=class extends f{constructor(e,t){let r=({request:s})=>{let a=e.getURLsToCacheKeys();for(let n of oe(s.url,t)){let i=a.get(n);if(i){let l=e.getIntegrityForCacheKey(i);return{cacheKey:i,integrity:l}}}};super(r,e.strategy)}};function G(o){let e=w(),t=new U(e,o);B(t)}var le="-precache-",se=async(o,e=le)=>{let r=(await self.caches.keys()).filter(s=>s.includes(e)&&s.includes(self.registration.scope)&&s!==o);return await Promise.all(r.map(s=>self.caches.delete(s))),r};function Q(){self.addEventListener("activate",o=>{let e=m.getPrecacheName();o.waitUntil(se(e).then(t=>{}))})}function J(o){w().precache(o)}function Y(o,e){J(o),G(e)}self.skipWaiting();H();Y([{"revision":"8f845fa89ac4614ef25ac375fd676387","url":"assets/app.ea112d3e.js"},{"revision":"238f8585550d15655701e22d2a4c90d3","url":"assets/BetPage.6695994e.css"},{"revision":"e91ff0448cceda26735ad7947ca4bab9","url":"assets/BetPage.8dc6a551.js"},{"revision":"8d182c08b566b048b920db89003f60db","url":"assets/ClosePopup.148de6b4.js"},{"revision":"05c3bd7012f74730fcff2ab0fc56dbe0","url":"assets/ErrorNotFound.ee856d68.js"},{"revision":"3e1afe59fa075c9e04c436606b77f640","url":"assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNa.fd84f88b.woff"},{"revision":"a4160421d2605545f69a4cd6cd642902","url":"assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.4a4dbc62.woff2"},{"revision":"107ba820a4d1a5b82b1f0b5883b68ebf","url":"assets/GiftPage.0b11698e.css"},{"revision":"e11228ca33542dfc204fa5689ef9c17b","url":"assets/GiftPage.4b990d05.js"},{"revision":"48665dbfd1b1e368a1627e87f02949a2","url":"assets/i18n.17bdcfd4.js"},{"revision":"30d41dce743208a60fe52c11301a7b12","url":"assets/index.42c63d18.css"},{"revision":"d0404943606e101a9bc176772d73fcf4","url":"assets/index.c5fc1e0b.js"},{"revision":"db0148b6771cde9def2c079a26fea2b7","url":"assets/IndexPage.19c6a484.css"},{"revision":"cde27385a7b7599bcf80d6b84a2dc520","url":"assets/IndexPage.3491ce4a.js"},{"revision":"e626b81d7956dbd0e2e40fadf9f273a2","url":"assets/KEEPT___.b7e13769.TTF"},{"revision":"4aa2e69855e3b83110a251c47fdd05fc","url":"assets/KFOkCnqEu92Fr1MmgVxIIzQ.34e9582c.woff"},{"revision":"40bcb2b8cc5ed94c4c21d06128e0e532","url":"assets/KFOlCnqEu92Fr1MmEU9fBBc-.9ce7f3ac.woff"},{"revision":"ea60988be8d6faebb4bc2a55b1f76e22","url":"assets/KFOlCnqEu92Fr1MmSU5fBBc-.bf14c7d7.woff"},{"revision":"0774a8b7ca338dc1aba5a0ec8f2b9454","url":"assets/KFOlCnqEu92Fr1MmWUlfBBc-.e0fd57c0.woff"},{"revision":"bcb7c7e2499a055f0e2f93203bdb282b","url":"assets/KFOlCnqEu92Fr1MmYUtfBBc-.f6537e32.woff"},{"revision":"d3907d0ccd03b1134c24d3bcaf05b698","url":"assets/KFOmCnqEu92Fr1Mu4mxM.f2abf7fb.woff"},{"revision":"4387872ef1ca9d7cede9ba1fc8e832ec","url":"assets/LoginPage.303f14d7.js"},{"revision":"b8756119167044591bd93329314c700e","url":"assets/LoginPage.e2a35889.css"},{"revision":"f933224d809bb9226b70165bdd2c0458","url":"assets/MainLayout.607e54ab.css"},{"revision":"24c47ed8634bbfcd5f6e79ba2f9102f3","url":"assets/MainLayout.eb7cc549.js"},{"revision":"c324f3ccd748f99507ae95d89ceed435","url":"assets/picture.379b6070.js"},{"revision":"860b5445f8e365887c183806e0d77d7d","url":"assets/PicturePage.2775bdc0.js"},{"revision":"2450be93a63e15209a22eb3a1f75b6ef","url":"assets/PicturePage.c6ee2e59.css"},{"revision":"d139a87d089813d37506a80c791cd5e3","url":"assets/QPage.da39006d.js"},{"revision":"ca8a25bab33e8ae4a95254a0c5ab6f40","url":"assets/QSpinnerTail.270efa77.js"},{"revision":"3eb633511d06f7c721fcefb14f6ad29d","url":"assets/use-quasar.eae894f8.js"},{"revision":"5aaa5218fe725f4870f5e69a95b1b2e9","url":"assets/vue-i18n.0cb1d7c8.js"},{"revision":"44861bc9ebb69eedfbc3f3172e0657d4","url":"favicon.ico"},{"revision":"05af79cbbf8b942086d95ae740ae8aeb","url":"icons/apple-icon-120x120.png"},{"revision":"766a751e3d13a3663738076f1dc133a1","url":"icons/apple-icon-152x152.png"},{"revision":"c4604d042bae8b3ef925ed6f0336ed6d","url":"icons/apple-icon-167x167.png"},{"revision":"e97d6aab942a1523387d1197f742564f","url":"icons/apple-icon-180x180.png"},{"revision":"f0ad936a288de0a0d20ff8fb9620cae6","url":"icons/apple-launch-1080x2340.png"},{"revision":"9ed884ef3d18e65bb72be11cdc269680","url":"icons/apple-launch-1125x2436.png"},{"revision":"d0bd3aca44df4e87d3f3359faa136f2f","url":"icons/apple-launch-1170x2532.png"},{"revision":"5f25e75427df03b55b616c77637fb0b0","url":"icons/apple-launch-1179x2556.png"},{"revision":"0f77e3ddcfece3ea9897207812d7a536","url":"icons/apple-launch-1242x2208.png"},{"revision":"12c0b53c08813512ca00da4afb8cbe62","url":"icons/apple-launch-1242x2688.png"},{"revision":"2d9ba8227f1063760e45a4812f3f03d5","url":"icons/apple-launch-1284x2778.png"},{"revision":"157614fa5d05371dd9613d186c069ae3","url":"icons/apple-launch-1290x2796.png"},{"revision":"11d0c25314597a54f5e9af5b1d680b99","url":"icons/apple-launch-1536x2048.png"},{"revision":"1a4bca11ccd69d9e9a11ad63dfb0f451","url":"icons/apple-launch-1620x2160.png"},{"revision":"08567ce688cd68af31466c397a97cb5f","url":"icons/apple-launch-1668x2224.png"},{"revision":"5cb0c5667fa89dc6e9a79908f0d24fa1","url":"icons/apple-launch-1668x2388.png"},{"revision":"c6ad7ee7ea23965a5a7cc16c3a273a8a","url":"icons/apple-launch-2048x2732.png"},{"revision":"049dcf1fe1e5571da81c99a8d19e9532","url":"icons/apple-launch-750x1334.png"},{"revision":"149e04efcc55a0288560887029b7c867","url":"icons/apple-launch-828x1792.png"},{"revision":"e06471f5c94d2e08e756e1862b9df75e","url":"icons/favicon-128x128.png"},{"revision":"597112ea7847e86e11c919cc09a4900e","url":"icons/favicon-16x16.png"},{"revision":"21b423072de9bc31426f060d67ef5090","url":"icons/favicon-32x32.png"},{"revision":"a6bf6ed0933ab6a44b18722f5f07ff40","url":"icons/favicon-96x96.png"},{"revision":"e06471f5c94d2e08e756e1862b9df75e","url":"icons/icon-128x128.png"},{"revision":"aa5a34a0523767d6be27e0219f9090d2","url":"icons/icon-192x192.png"},{"revision":"84e2763decba8c42d858d7af8826e591","url":"icons/icon-256x256.png"},{"revision":"aa70daa3914977eaf184d56d7254b94c","url":"icons/icon-384x384.png"},{"revision":"b1800207d600bdb986e1df50f1762309","url":"icons/icon-512x512.png"},{"revision":"6b0caefdd9e512d608385842dd3cd506","url":"icons/ms-icon-144x144.png"},{"revision":"7bd4f6fcec726d1f652c683bb52f4e71","url":"icons/safari-pinned-tab.svg"},{"revision":"c155d7fde8c3f0c9fdee51bf59584d59","url":"index.html"},{"revision":"737513e04abb2b7b0b9ece1f001eb747","url":"manifest.json"}]);Q();self.addEventListener("push",o=>{let e={title:"New",content:"Something new posted"};if(o&&o.data){e=JSON.parse(o.data.text());let t={body:e.body,icon:"./icons/icon-192x192.png",dir:"ltr",lang:"en-US",vibrate:[100,50,200],badge:"./icons/icon-192x192.png",tag:"confirm-notification",renotify:!0,data:{dateOfArrival:Date.now(),primaryKey:1,url:e.openUrl,pictureId:e.pictureId}};e.actions&&(t.actions=[{action:"confirm",title:e.actions.confirm.title,icon:e.actions.confirm.icon}]),o.waitUntil(self.registration.showNotification(e.title,t))}self.onnotificationclick=t=>{let r=t.notification,s=t.action;if(!r.data.url){r.close();return}console.log({action:s}),console.log("notification.data.url",r.data.url);let a=new URL("https://borny.github.io/feijao-pwa/",self.location.origin).href,n=new URL(`https://borny.github.io/feijao-pwa/#/picture/${r.data.url}`,self.location.origin).href,i=clients.matchAll({type:"window",includeUncontrolled:!0}).then(l=>{let h=null;for(let p=0;p<l.length;p++){let u=l[p];if(console.log("BEFORE IF",u.url,a),console.log("BEFORE IF",u.url.includes(a)),u.url.includes(a)){h=u;break}}return h?(console.log({matchingClient:h}),h.navigate(n),h.focus()):(console.log("not matchingClient"),clients.openWindow(n))});r.close(),t.waitUntil(i)},self.onnotificationclose=t=>{console.log("On notification close: ",t.notification.tag)}});})();