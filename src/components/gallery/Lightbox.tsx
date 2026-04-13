"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface LightboxProps {
  open: boolean;
  media: {
    id: string;
    type: "image" | "video";
    src: string;
    title?: string;
    category: string;
  } | null;
  onClose: () => void;
}

export function Lightbox({ open, media, onClose }: LightboxProps) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open || !media) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative max-w-3xl w-full mx-4 bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={e => e.stopPropagation()}
        >
          <button
            className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition"
            onClick={onClose}
            aria-label="Close"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex flex-col items-center justify-center p-6">
            <div className="w-full aspect-video flex items-center justify-center bg-zinc-800 rounded-xl overflow-hidden">
              {media.type === "image" ? (
                <Image
                  src={media.src}
                  alt={media.title || "Gallery image"}
                  width={900}
                  height={500}
                  className="object-contain w-full h-full"
                  loading="lazy"
                />
              ) : (
                <video
                  src={media.src}
                  className="object-contain w-full h-full"
                  controls
                  autoPlay
                  poster="/placeholder.png"
                />
              )}
            </div>
            <div className="mt-4 text-center">
              <div className="text-xl font-bold text-white mb-1">{media.title}</div>
              <div className="text-sm text-primary font-semibold uppercase tracking-wider">{media.category}</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
