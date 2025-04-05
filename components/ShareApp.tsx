"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ShareApp() {
  const [canShare, setCanShare] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setCanShare(!!navigator.share);
  }, []);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: "Todo List PWA",
        text: "Check out this awesome Todo List PWA!",
        url: window.location.href,
      });

      toast({
        title: "Success!",
        description: "Thanks for sharing the app!",
      });
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        toast({
          title: "Error",
          description: "Failed to share the app.",
          variant: "destructive",
        });
      }
    }
  };

  if (!canShare) return null;

  return (
    <Button
      onClick={handleShare}
      variant="outline"
      className="fixed bottom-4 left-4">
      <Share2 className="mr-2 h-4 w-4" />
      Share Apps
    </Button>
  );
}
