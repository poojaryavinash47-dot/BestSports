"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GalleryCardProps {
  media: {
    id: string;
    type: "image" | "video";
    src: string;
    title?: string;
    category: string;
  };
  onClick: () => void;
}

export function GalleryCard({ media, onClick }: GalleryCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      className="relative rounded-2xl shadow-lg overflow-hidden cursor-pointer group bg-white dark:bg-zinc-900 transition-all"
      onClick={onClick}
    >
      <div className="aspect-video w-full h-72 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
        {media.type === "image" ? (
          <Image
            src={media.src}
            alt={media.title || "Gallery image"}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 33vw"
            loading="lazy"
            placeholder="blur"
            blurDataURL="/placeholder.png"
          />
        ) : (
          <video
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
            muted
            playsInline
            preload="metadata"
            autoPlay
            loop
          >
            <source src={media.src} type="video/mp4" />
          </video>
        )}
        {/* Removed title overlay on hover */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" />
      </div>
      {/* Removed title and category below the image/video */}
    </motion.div>
  );
}
