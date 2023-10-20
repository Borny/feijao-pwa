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
        pictureId: data.pictureId,
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

  self.onnotificationclick = (event) => {
    const notification = event.notification;
    const action = event.action;

    if (!notification.data.url) {
      notification.close();
      return;
    }

    console.log({ action })

    // if (action === 'confirm') {
    //   notification.close();
    //   return;
    // } else {

    console.log('notification.data.url', notification.data.url)
    // console.log('notification.data.url', notification.data.pictureId)
    const urlToCheck = new URL(`https://borny.github.io/feijao-pwa/`, self.location.origin).href;
    // const urlToCheck = new URL(`http://localhost:9200/feijao-pwa/`, self.location.origin).href;
    const urlToOpen = new URL(`https://borny.github.io/feijao-pwa/#/picture/${notification.data.url}`, self.location.origin).href;
    // const urlToOpen = new URL(`http://localhost:9200/feijao-pwa/#/picture/${notification.data.url}`, self.location.origin).href;

    const promiseChain = clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    })
      .then((windowClients) => {
        let matchingClient = null;

        for (let i = 0; i < windowClients.length; i++) {
          const windowClient = windowClients[i];
          console.log('BEFORE IF', windowClient.url, urlToCheck)
          console.log('BEFORE IF', windowClient.url.includes(urlToCheck))
          // if (windowClient.url === urlToOpen) {
          if (windowClient.url.includes(urlToCheck)) {
            matchingClient = windowClient;
            break;
          }
        }

        if (matchingClient) {
          console.log({ matchingClient })
          matchingClient.navigate(urlToOpen)
          return matchingClient.focus();
        } else {
          console.log('not matchingClient')
          return clients.openWindow(urlToOpen);
        }
      });

    notification.close();

    event.waitUntil(promiseChain);

    // event.waitUntil(

    //   clients.matchAll().then((clis) => {
    //     console.log({ clis })
    //     const client = clis.find((c) => {
    //       return c.visibilityState === 'visible';
    //     });

    //     if (client !== undefined) {
    //       // client.navigate(`feijao-pwa/#/${notification.data.url}`);
    //       client.navigate(`feijao-pwa/#/${notification.data.url}`);
    //       // client.navigate(`${notification.data.url}`);
    //       client.focus();
    //     } else {
    //       client.openWindow(`feijao-pwa/#/${notification.data.url}`);
    //       // client.openWindow(`${notification.data.url}`);
    //     }
    //     notification.close();
    //   })
    // );
  }
  // };

  self.onnotificationclose = (event) => {
    console.log("On notification close: ", event.notification.tag);
  };
})
