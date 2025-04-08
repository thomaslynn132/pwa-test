// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAECbu1tA8yRBG3gdGm-GLJBq4s0XVJHig",
  authDomain: "learn-english-with-thomas132.firebaseapp.com",
  projectId: "learn-english-with-thomas132",
  storageBucket: "learn-english-with-thomas132.firebasestorage.app",
  messagingSenderId: "1005202250499",
  appId: "1:1005202250499:web:de891f909006c2115c2736",
  measurementId: "G-XL40N1GVDE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Messaging
// let messaging: any;
// try {
//   messaging = getMessaging(app);
// } catch (error) {
//   console.error("Error initializing Firebase Messaging:", error);
// }
// // Function to get FCM Token
// const getFcmToken = async () => {
//   const vapidKey =
//     "BJyIL2s4GyIHf3vvZgLCR4ZAB5Fg4yERF1IUbdrUId4SAt9w1fyPP37oEsMBlY5NV1EfjjFVeFsRnUlt1LErmCIg";
//   try {
//     const token = await getToken(messaging, {
//       vapidKey,
//     });
//     console.log("FCM Token:", token);
//     localStorage.setItem("fcm*Token:", token);

//     return token;
//   } catch (error) {
//     console.error("Error getting FCM token:", error);
//     return null;
//   }
// };

// // Function to handle notifications
// const onNotificationReceived = (callback: any) => {
//   onMessage(messaging, (payload: any) => {
//     console.log("Notification received:", payload);
//     callback(payload);
//   });
// };

export { app, analytics
  // , getFcmToken, onNotificationReceived 
};
