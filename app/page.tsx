"use client"; // Use "use client" instead of "use server" for React components

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import { useTodos } from "@/hooks/useTodos";
import InstallPWA from "@/components/InstallPWA";
import ShareApp from "@/components/ShareApp";
import { useEffect, useState } from "react";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { app } from "@/lib/firebaseConfig";

const Home = () => {
  const { todos, addTodo, toggleTodo, deleteTodo, newTodo, setNewTodo } =
    useTodos();
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [notification, setNotification] = useState<any>(null);

  // Initialize Firebase Messaging
  let messaging: any;
  if (typeof window !== "undefined") {
    const messaging = getMessaging(app);
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
          setFcmToken(token); // Save the token in state
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

  // Function to handle foreground notifications
  const onNotificationReceived = (callback: (payload: any) => void) => {
    onMessage(messaging, (payload: any) => {
      console.log("Notification received:", payload);
      setNotification(payload); // Save the notification in state
      callback(payload);
    });
  };

  // Check for fullscreen permission or restrictions
  const checkForFullscreenPermission = () => {
    if (!document.documentElement.requestFullscreen) {
      alert("Your device does not support fullscreen mode.");
      return;
    }

    if (window.innerWidth <= 768) {
      alert(
        "On mobile devices, fullscreen may not work automatically. Please click 'Go Fullscreen' to trigger."
      );
    }
  };

  // Effects
  useEffect(() => {
    getFcmToken(); // Get the FCM token on mount
  }, []);

  useEffect(() => {
    const handleNotification = (payload: any) => {
      console.log("Foreground notification received:", payload);
      alert(
        `Notification: ${payload.notification.title} - ${payload.notification.body}`
      );
    };

    onNotificationReceived(handleNotification);
  }, []);

  useEffect(() => {
    checkForFullscreenPermission(); // Check fullscreen permission on mount
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (newTodo.trim()) {
      addTodo(newTodo.trim());
      setNewTodo("");
    }
  };

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
      <Card className="p-6 mt-6">
        <h2 className="text-xl font-bold mb-4">FCM Token</h2>
        <p className="text-gray-700">{fcmToken}</p>
      </Card>
      <InstallPWA />
      <ShareApp />
    </main>
  );
};

export default Home; // Export Home as the default export
