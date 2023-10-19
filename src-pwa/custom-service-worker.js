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

// PUSH
self.addEventListener('push', (event) => {
  let data = { title: 'New', content: 'Something new posted' }
  if (event && event.data) {
    data = JSON.parse(event.data.text())

    const options = {
      body: data.body,
      icon: './icons/icon-192x192.png',
      // image: './kalalau-beach.2009ff86.jpg',
      dir: 'ltr',
      lang: 'en-US',
      vibrate: [100, 50, 200],
      badge: './icons/icon-192x192.png',
      tag: 'confirm-notification', // if set will stack the notifications, they won't show
      renotify: true,
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1,
        url: data.openUrl,
      },
    }

    if (data.actions) {
      options.actions = [
        { action: 'confirm', title: data.actions.confirm.title, icon: data.actions.confirm.icon },
        // { action: 'cancel', title: data.actions.cancel.title, icon: data.actions.confirm.icon }
      ]
    }

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    )
  }

  //Inside a service worker.
  self.onnotificationclick = (event) => {
    const notification = event.notification;
    const action = event.action;

    if(action === 'confirm') {
      notification.close();
    } else{


      if(notification.data.url === undefined) {
        notification.close();
        return;
      }

      event.waitUntil(
        clients.matchAll().then((clis) => {
          const client = clis.find((c) => {
            return c.visibilityState === 'visible';
          });

          if(client !== undefined) {
            client.navigate(`feijao-pwa/#/${notification.data.url}`);
            client.focus();
          } else {
            client.navigate(`feijao-pwa/#/${notification.data.url}`);
          }
          notification.close();
        })
      );
    }
  };

  self.onnotificationclose = (event) => {
    console.log("On notification close: ", event.notification.tag);
  };
})
