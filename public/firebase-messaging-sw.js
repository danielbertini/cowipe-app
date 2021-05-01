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
    icon: '/firebase-logo.png'
  };
  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});

self.addEventListener('notificationclick', event => {
  console.log(event)
  return event;
});