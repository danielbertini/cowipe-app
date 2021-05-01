importScripts('https://www.gstatic.com/firebasejs/8.4.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.4.2/firebase-messaging.js');

const config = {
  apiKey: "AIzaSyAS-bWK7bHmYkG6HlviS2XoaNyQMj33FeY",
  authDomain: "cowipe-e932b.firebaseapp.com",
  projectId: "cowipe-e932b",
  storageBucket: "cowipe-e932b.appspot.com",
  messagingSenderId: "836780867601",
  appId: "1:836780867601:web:a1872f02025c002cc0b1b0",
  measurementId: "G-85Y4TBLGBF"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
} else {
  firebase.app(config);
}
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: 'https://cdn.cowipe.com/ui/logo512.png',
    data: {
      url: 'https://cowipe.com'
    }
  };
  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});

self.addEventListener('notificationclick', event => {
  let url = 'https://cowipe.com';
  event.notification.close();
  event.waitUntil(
    clients.matchAll({type: 'window'}).then( windowClients => {
        for (var i = 0; i < windowClients.length; i++) {
            var client = windowClients[i];
            if (client.url === url && 'focus' in client) {
                return client.focus();
            }
        }
        if (clients.openWindow) {
            return clients.openWindow(url);
        }
    })
);
  return event;
});