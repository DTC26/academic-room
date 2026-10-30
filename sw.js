/* DTC Academic Room · service worker (GitHub front door).
 * It only shows DTC notifications and opens the app when one is tapped. It stores nothing and does not touch the class data. */
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('push', function (e) {
  var d = {};
  try { d = e.data ? e.data.json() : {}; } catch (x) { d = {body: e.data ? e.data.text() : ''}; }
  e.waitUntil(self.registration.showNotification(d.title || 'DTC Academic Room', {
    body: d.body || '', tag: d.tag || 'dtc', renotify: true, icon: 'icon-192.png', badge: 'icon-192.png',
    data: {url: d.url || './?app'}
  }));
});
self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  var url = (e.notification.data && e.notification.data.url) || './?app';
  e.waitUntil(self.clients.openWindow(url));
});
