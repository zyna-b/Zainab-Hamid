"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Share2,
  Copy,
  Twitter,
  Facebook,
  Linkedin,
  MessageCircle,
  Instagram,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface ShareButtonsProps {
  title: string;
  slug: string;
}

const SHARE_WINDOW_FEATURES = "noopener,noreferrer,width=650,height=500";

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [origin, setOrigin] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  const shareUrl = useMemo(() => {
    const base = process.env.NEXT_PUBLIC_SITE_URL || origin;
    if (!base) return "";
    return `${base.replace(/\/$/, "")}/blog/${slug}`;
  }, [origin, slug]);

  const getShareUrl = () => {
    if (shareUrl) return shareUrl;
    if (typeof window !== "undefined") {
      return `${window.location.origin}/blog/${slug}`;
    }
    return "";
  };

  const openShareWindow = (url: string) => {
    if (!url) return;
    window.open(url, "_blank", SHARE_WINDOW_FEATURES);
  };

  const handleCopy = async () => {
    const urlToCopy = getShareUrl();
    if (!urlToCopy) {
      toast({
        title: "Unable to copy",
        description: "Share link could not be generated.",
        variant: "destructive",
      });
      return;
    }
    try {
      await navigator.clipboard.writeText(urlToCopy);
      toast({
        title: "Link copied",
        description: "Share it anywhere you like!",
      });
    } catch {
      toast({
        title: "Copy failed",
        description: "Please copy the link manually.",
        variant: "destructive",
      });
    }
  };

  const handleNativeShare = async () => {
    const urlToShare = getShareUrl();
    if (!urlToShare) {
      handleCopy();
      return;
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: title,
          url: urlToShare,
        });
      } catch (error) {
        if (!(error instanceof DOMException)) {
          toast({
            title: "Unable to share",
            description: "Please try another option.",
            variant: "destructive",
          });
        }
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl bg-card/80 p-4 shadow-sm">
      <Button
        variant="secondary"
        onClick={handleNativeShare}
        className="bg-primary text-primary-foreground hover:bg-primary/90"
      >
        <Share2 className="mr-2 h-4 w-4" />
        Quick share
      </Button>

      <Button
        variant="outline"
        onClick={() =>
          openShareWindow(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(getShareUrl())}`
          )
        }
        className="border-primary/30 text-primary hover:bg-primary/10"
      >
        <Twitter className="mr-2 h-4 w-4" />
        X / Twitter
      </Button>

      <Button
        variant="outline"
        onClick={() =>
          openShareWindow(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getShareUrl())}`)
        }
        className="border-primary/30 text-primary hover:bg-primary/10"
      >
        <Linkedin className="mr-2 h-4 w-4" />
        LinkedIn
      </Button>

      <Button
        variant="outline"
        onClick={() =>
          openShareWindow(`https://wa.me/?text=${encodeURIComponent(`${title} ${getShareUrl()}`)}`)
        }
        className="border-primary/30 text-primary hover:bg-primary/10"
      >
        <MessageCircle className="mr-2 h-4 w-4" />
        WhatsApp
      </Button>

      <Button
        variant="outline"
        onClick={() =>
          openShareWindow(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getShareUrl())}`)
        }
        className="border-primary/30 text-primary hover:bg-primary/10"
      >
        <Facebook className="mr-2 h-4 w-4" />
        Facebook
      </Button>

      <Button
        variant="outline"
        onClick={async () => {
          const urlToShare = getShareUrl();
          if (!urlToShare) {
            handleCopy();
            return;
          }
          try {
            await navigator.clipboard.writeText(urlToShare);
            toast({
              title: "Copied for Instagram",
              description: "Paste the link into your story or bio.",
            });
          } catch {
            toast({
              title: "Copy failed",
              description: "Please copy the link manually.",
              variant: "destructive",
            });
          }
        }}
        className="border-primary/30 text-primary hover:bg-primary/10"
      >
        <Instagram className="mr-2 h-4 w-4" />
        Instagram
      </Button>

      <Button
        variant="outline"
        onClick={handleCopy}
        className="border-primary/30 text-primary hover:bg-primary/10"
      >
        <Copy className="mr-2 h-4 w-4" />
        Copy link
      </Button>
    </div>
  );
}
