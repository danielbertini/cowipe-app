import firebase from 'firebase/app';
import 'firebase/messaging';

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

export const requestFirebaseNotificationPermission = () =>
  new Promise((resolve, reject) => {
    messaging
      .requestPermission()
      .then(() => messaging.getToken())
      .then((firebaseToken) => {
        resolve(firebaseToken);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      console.log(payload);
      resolve(payload);
    });
  });