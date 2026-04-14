
"use client";
import { useState, type FC } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { GalleryCard } from "@/components/gallery/GalleryCard";
import { Lightbox } from "@/components/gallery/Lightbox";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

type MediaType = {
  id: string;
  type: "image" | "video";
  src: string;
  category: string;
  title?: string;
};

const galleryData: MediaType[] = [
  {
    id: "1",
    type: "image" as const,
    src: "/c1.png",
    category: "Cricket",
  },
  {
    id: "2",
    type: "video" as const,
    src: "/b7.mp4",
    category: "Badminton",
  },
  {
    id: "3",
    type: "image" as const,
    src: "/c2.png",
    category: "Cricket",
  },
  {
    id: "4",
    type: "image" as const,
    src: "/b1.png",
    category: "Badminton",
  },
  {
    id: "5",
    type: "image" as const,
    src: "/c3.png",
    category: "Cricket",
  },
  {
    id: "6",
    type: "image" as const,
    src: "/b2.png",
    category: "Badminton",
  },
  {
    id: "7",
    type: "image" as const,
    src: "/b4.png",
    category: "Badminton",
  },
  {
    id: "8",
    type: "image" as const,
    src: "/b3.png",
    category: "Badminton",
  },
  {
    id: "9",
    type: "image" as const,
    src: "/b5.png",
    category: "Badminton",
  },
  {
    id: "10",
    type: "video" as const,
    src: "/b8.mp4",
    category: "Badminton",
  },
  {
    id: "11",
    type: "image" as const,
    src: "/b6.png",
    category: "Badminton",
  },
  {
    id: "12",
    type: "image" as const,
    src: "/c11.png",
    category: "Cricket",
  },
];

const categories = ["All", "Cricket", "Badminton"];

const GalleryPage: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [lightboxMedia, setLightboxMedia] = useState<MediaType | null>(null);

  const filteredData =
    selectedCategory === "All"
      ? galleryData
      : galleryData.filter((item) => item.category === selectedCategory);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 dark:from-blue-900 dark:to-blue-950 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center text-primary mb-8 uppercase tracking-tight italic drop-shadow-lg">
            Gallery
          </h1>
          {/* Filter Tabs */}
          <div className="flex justify-center gap-2 mb-8 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-5 py-2 rounded-full font-bold text-sm uppercase tracking-wider transition-all shadow-sm border-2 ${
                  selectedCategory === cat
                    ? "bg-primary text-white border-primary"
                    : "bg-white dark:bg-zinc-800 text-primary border-primary/30 hover:bg-primary/10"
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          {/* Masonry/Grid Layout */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
          >
            <AnimatePresence>
              {filteredData.map((media) => (
                <motion.div
                  key={media.id}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
                >
                  <GalleryCard media={media} onClick={() => setLightboxMedia(media)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
        <Lightbox open={!!lightboxMedia} media={lightboxMedia} onClose={() => setLightboxMedia(null)} />
      </div>
      <Footer />
    </>
  );
};

export default GalleryPage;
