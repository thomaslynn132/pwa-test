"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      toast({
        title: "Success!",
        description: "The app has been installed on your device.",
      });
    }
    setDeferredPrompt(null);
  };

  if (!deferredPrompt) return null;

  return (
    <Button
      onClick={handleInstall}
      variant="outline"
      className="fixed bottom-4 right-4">
      <Download className="mr-2 h-4 w-4" />
      Install App
    </Button>
  );
}
