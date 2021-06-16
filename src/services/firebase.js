import firebase from "firebase/app";
import "firebase/messaging";

const config = {
  apiKey: "AIzaSyAS-bWK7bHmYkG6HlviS2XoaNyQMj33FeY",
  authDomain: "cowipe-e932b.firebaseapp.com",
  projectId: "cowipe-e932b",
  storageBucket: "cowipe-e932b.appspot.com",
  messagingSenderId: "836780867601",
  appId: "1:836780867601:web:a1872f02025c002cc0b1b0",
  measurementId: "G-85Y4TBLGBF",
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
} else {
  firebase.app(config);
}

var messaging = firebase.messaging.isSupported() ? firebase.messaging() : null;

export const requestFirebaseNotificationPermission = () =>
  new Promise((resolve, reject) => {
    if (firebase.messaging.isSupported()) {
      messaging
        .requestPermission()
        .then(() => messaging.getToken())
        .then((firebaseToken) => {
          resolve(firebaseToken);
        })
        .catch((err) => {
          reject(err);
        });
    } else {
      reject("Browser não suportado pelo Firebase Messaging.");
    }
  });

export const onMessageListener = () =>
  new Promise((resolve, reject) => {
    if (firebase.messaging.isSupported()) {
      messaging.onMessage((payload) => {
        console.log(payload);
        resolve(payload);
      });
    } else {
      reject("Browser não suportado pelo Firebase Messaging.");
    }
  });
