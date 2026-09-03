"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import type { Photo } from "@/generated/prisma/client";
import { Gallery, GalleryGrid, GalleryImage } from "@/components/ui/shared-element-gallery";

const CATEGORY_LABELS: Record<string, string> = {
  ALL: "Всі фото",
  DOORS: "На двері",
  WINDOWS: "На вікна",
  LARGE: "Великі розміри",
};

// Кожна вкладка має власний ефект появи фото, що перегукується з її змістом.
const CATEGORY_VARIANTS: Record<string, Variants> = {
  // Всі фото — спокійна поява з лёгким масштабуванням
  ALL: {
    hidden: { opacity: 0, scale: 0.94 },
    show: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.03, duration: 0.4, ease: "easeOut" },
    }),
  },
  // На двері — фото "розчиняються" всередину, ніби двері, що відчиняються
  DOORS: {
    hidden: { opacity: 0, rotateY: -85, transformPerspective: 900 },
    show: (i: number) => ({
      opacity: 1,
      rotateY: 0,
      transformPerspective: 900,
      transition: { delay: i * 0.05, duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    }),
  },
  // На вікна — фото піднімаються знизу, ніби розсувна решітка/жалюзі
  WINDOWS: {
    hidden: { opacity: 0, y: 48 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.035, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    }),
  },
  // Великі розміри — фото "виростають" з пружним ефектом
  LARGE: {
    hidden: { opacity: 0, scale: 0.55 },
    show: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.03, type: "spring", stiffness: 220, damping: 20 },
    }),
  },
};

const NO_MOTION: Variants = {
  hidden: { opacity: 1 },
  show: { opacity: 1 },
};

export function PhotoGallery({ photos }: { photos: Photo[] }) {
  const [category, setCategory] = useState<string>("ALL");
  const reducedMotion = useRef(false);
  const filtered = category === "ALL" ? photos : photos.filter((p) => p.category === category);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const variants = reducedMotion.current ? NO_MOTION : CATEGORY_VARIANTS[category];

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-widest">
        {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setCategory(key)}
            className={`rounded-full border px-4 py-2 transition-colors ${
              category === key
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:border-primary hover:text-primary"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <Gallery>
        <GalleryGrid key={category}>
          {filtered.map((photo, i) => (
            <motion.div key={photo.id} custom={i} initial="hidden" animate="show" variants={variants}>
              <GalleryImage id={String(photo.id)} src={photo.imageUrl} alt={photo.title} />
            </motion.div>
          ))}
        </GalleryGrid>
      </Gallery>
    </div>
  );
}
