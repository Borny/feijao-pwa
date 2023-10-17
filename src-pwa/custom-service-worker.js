/* eslint-env serviceworker */

/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.config.js > pwa > workboxMode is set to "injectManifest"
 */

import { clientsClaim } from 'workbox-core'
import { precacheAndRoute, cleanupOutdatedCaches, createHandlerBoundToURL } from 'workbox-precaching'
import { registerRoute, NavigationRoute } from 'workbox-routing'

self.skipWaiting()
clientsClaim()

// Use with precache injection
precacheAndRoute(self.__WB_MANIFEST)

cleanupOutdatedCaches()

// Non-SSR fallback to index.html
// Production SSR fallback to offline.html (except for dev)
// if (process.env.MODE !== 'ssr' || process.env.PROD) {
//   registerRoute(
//     new NavigationRoute(
//       createHandlerBoundToURL(process.env.PWA_FALLBACK_HTML),
//       { denylist: [/sw\.js$/, /workbox-(.)*\.js$/] }
//     )
//   )
// }

// Notification
// self.addEventListener('notificationclick',  (event)=> {
//   console.log('notification', event)
//   console.log('notification', event.notification )
//   console.log('notification', event.action )
// })

// self.addEventListener('notificationclose',  (event)=> {
//   console.log('notification was closed', event)
// })


//Inside a service worker.
self.onnotificationclick = (event) => {
  console.log("On notification click: ", event.notification.tag);
};
self.onnotificationclose = (event) => {
  console.log("On notification close: ", event.notification.tag);
};

// PUSH
self.addEventListener('push', (event) => {
  console.log('Push notification received', event)

let data = {title: 'New', content: 'Something new posted'}

  if(event.data){
    data = JSON.parse(event.data.text())

    const options ={
      body: data.content,
      icon: './icons/icon-192x192.png',
    }

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    )
  }
})
