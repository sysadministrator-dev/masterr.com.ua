"use client";

import { useState } from "react";
import type { Photo } from "@/generated/prisma/client";
import { Gallery, GalleryGrid, GalleryImage } from "@/components/ui/shared-element-gallery";

const CATEGORY_LABELS: Record<string, string> = {
  ALL: "Всі фото",
  DOORS: "На двері",
  WINDOWS: "На вікна",
  LARGE: "Великі розміри",
};

export function PhotoGallery({ photos }: { photos: Photo[] }) {
  const [category, setCategory] = useState<string>("ALL");
  const filtered = category === "ALL" ? photos : photos.filter((p) => p.category === category);

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
        <GalleryGrid>
          {filtered.map((photo) => (
            <GalleryImage key={photo.id} id={String(photo.id)} src={photo.imageUrl} alt={photo.title} />
          ))}
        </GalleryGrid>
      </Gallery>
    </div>
  );
}
