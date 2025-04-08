"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import { useTodos } from "@/hooks/useTodos";
import InstallPWA from "@/components/InstallPWA";
import ShareApp from "@/components/ShareApp";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { app } from "@/lib/firebaseConfig"; // Ensure this path is correct
// import SendPushNoti from "@/components/SendPushNoti";
// import { getAccessToken } from "@/lib/getFcmToken";

export default function Home() {
  const [newTodo, setNewTodo] = useState("");
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();
  // Function to handle notifications
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
  // Check for restrictions on phone and notify user (Optional, for devices that prevent fullscreen automatically)
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

  const handleSubmit = (e: React.FormEvent) => {
    // e.preventDefault();
    if (newTodo.trim()) {
      addTodo(newTodo.trim());
      setNewTodo("");
    }
  };
  const token = getFcmToken();

  console.log("first token", token);
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="max-w-md mx-auto space-y-6">
        <Card className="p-6">
          <h1 className="text-2xl font-bold text-center mb-6">Todo List</h1>

          <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
            <Input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new todo..."
              className="flex-1"
            />
            <Button type="submit">Add</Button>
          </form>

          <div className="space-y-2">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => toggleTodo(todo.id)}
                  />
                  <span
                    className={
                      todo.completed ? "line-through text-gray-500" : ""
                    }>
                    {todo.text}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteTodo(todo.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
      {/* <SendPushNoti /> */}
      <InstallPWA />
      <ShareApp />
    </main>
  );
}
