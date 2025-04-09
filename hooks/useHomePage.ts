// "use client";

// import { useEffect, useState } from "react";
// import { getMessaging, getToken, onMessage } from "firebase/messaging";
// import { app } from "@/lib/firebaseConfig"; // Ensure this path is correct

// export function useHomePage() {
//   const [fcmToken, setFcmToken] = useState<string | null>(null);
//   const [notification, setNotification] = useState<any>(null);

//   // Initialize Firebase Messaging
//   let messaging: any;
//   try {
//     messaging = getMessaging(app);
//   } catch (error) {
//     console.error("Error initializing Firebase Messaging:", error);
//   }

//   // Function to get FCM Token
//   const getFcmToken = async () => {
//     const vapidKey =
//       "BJ4HLzjXVEZHQu5EVnokmN2EgQUnNQ5ey-JgHzSaqz3WeAEKjmceAd-0w_8S6IAq-DVzOMQ7It2IZD28VGkBezs";
//     try {
//       const permission = await Notification.requestPermission();
//       if (permission === "granted") {
//         const token = await getToken(messaging, { vapidKey });
//         if (token) {
//           setFcmToken(token); // Save the token in state
//           return token;
//         } else {
//           console.warn("No token received. Permission may not be granted.");
//         }
//       } else {
//         console.warn("Notification permission denied");
//       }
//     } catch (error) {
//       console.error("Error getting FCM token:", error);
//     }
//   };

//   // Function to handle foreground notifications
//   const onNotificationReceived = (callback: (payload: any) => void) => {
//     onMessage(messaging, (payload: any) => {
//       console.log("Notification received:", payload);
//       setNotification(payload); // Save the notification in state
//       callback(payload);
//     });
//   };

//   // Check for fullscreen permission or restrictions
//   const checkForFullscreenPermission = () => {
//     if (!document.documentElement.requestFullscreen) {
//       alert("Your device does not support fullscreen mode.");
//       return;
//     }

//     if (window.innerWidth <= 768) {
//       alert(
//         "On mobile devices, fullscreen may not work automatically. Please click 'Go Fullscreen' to trigger."
//       );
//     }
//   };

//   // Effects
//   useEffect(() => {
//     getFcmToken(); // Get the FCM token on mount
//   }, []);

//   useEffect(() => {
//     const handleNotification = (payload: any) => {
//       console.log("Foreground notification received:", payload);
//       alert(
//         `Notification: ${payload.notification.title} - ${payload.notification.body}`
//       );
//     };

//     onNotificationReceived(handleNotification);
//   }, []);

//   useEffect(() => {
//     checkForFullscreenPermission(); // Check fullscreen permission on mount
//   }, []);

//   // Return reusable values and functions
//   return {
//     fcmToken, // The FCM token
//     notification, // The latest notification received
//     getFcmToken, // Function to manually get the FCM token
//     onNotificationReceived, // Function to handle notifications
//     checkForFullscreenPermission, // Function to check fullscreen permissions
//   };
// }
