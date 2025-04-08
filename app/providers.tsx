"use client";

import { useEffect } from "react";
import { register } from "./sw";

export function Providers({ children }: { children: React.ReactNode }) {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/firebase-messaging-sw.js")
      .then((registration) => {
        console.log("Service Worker registered:", registration);
      })
      .catch((err) => {
        console.error("Service Worker registration failed:", err);
      });
  }

  useEffect(() => {
    register();
  }, []);

  return <>{children}</>;
}
