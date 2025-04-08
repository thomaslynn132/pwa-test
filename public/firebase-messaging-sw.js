// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// Replace 10.13.2 with latest version of the Firebase JS SDK.
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyAECbu1tA8yRBG3gdGm-GLJBq4s0XVJHig",
  authDomain: "learn-english-with-thomas132.firebaseapp.com",
  databaseURL:
    "https://learn-english-with-thomas132-default-rtdb.firebaseio.com",
  projectId: "learn-english-with-thomas132",
  storageBucket: "learn-english-with-thomas132.firebasestorage.app",
  messagingSenderId: "1005202250499",
  appId: "1:1005202250499:web:de891f909006c2115c2736",
  measurementId: "G-XL40N1GVDE",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
