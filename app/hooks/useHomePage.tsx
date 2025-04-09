"use client";
import { useEffect } from "react";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { app } from "@/lib/firebaseConfig"; // Ensure this path is correct

export default function useHomePage () {
  const onNotificationReceived = (callback: any) => {
    onMessage(messaging, (payload: any) => {
      console.log("Notification received:", payload);
      callback(payload);
    });
  };
  useEffect(() => {
    const handleNotification = (payload: any) => {
      console.log("Foreground notification received:", payload);

      // Example: Show a toast or alert
      alert(
        `Notification: ${payload.notification.title} - ${payload.notification.body}`
      );
    };

    onNotificationReceived(handleNotification);
  }, []);
  useEffect(() => {
    // Check for fullscreen permission or restrictions after component mount
    checkForFullscreenPermission();
  }, []);
  // Initialize Messaging
  let messaging: any;
  try {
    messaging = getMessaging(app);
  } catch (error) {
    console.error("Error initializing Firebase Messaging:", error);
  }
  console.log("first", messaging);
  // Function to get FCM Token
  const getFcmToken = async () => {
    const vapidKey =
      "BJ4HLzjXVEZHQu5EVnokmN2EgQUnNQ5ey-JgHzSaqz3WeAEKjmceAd-0w_8S6IAq-DVzOMQ7It2IZD28VGkBezs";
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const token = await getToken(messaging, { vapidKey });
        if (token) {
          console.log("FCM Token:", token);
          // You can now send this token to your backend for push notification targeting
          return token;
        } else {
          console.warn("No token received. Permission may not be granted.");
        }
      } else {
        console.warn("Notification permission denied");
      }
    } catch (error) {
      console.error("Error getting FCM token:", error);
    }
  };
  useEffect(() => {
    getFcmToken();
  }, []);

  const token = getFcmToken();

  console.log("first token", token);
  const checkForFullscreenPermission = () => {
    // Check if fullscreen is supported on mobile devices
    if (!document.documentElement.requestFullscreen) {
      alert("Your device does not support fullscreen mode.");
      return;
    }

    // You can also check for specific conditions here like screen size or device type if necessary
    if (window.innerWidth <= 768) {
      alert(
        "On mobile devices, fullscreen may not work automatically. Please click 'Go Fullscreen' to trigger."
      );
    }
  };
  return;
}
