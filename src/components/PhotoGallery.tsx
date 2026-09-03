"use client";

import { useState } from "react";
import Image from "next/image";
import type { Photo } from "@/generated/prisma/client";

const CATEGORY_LABELS: Record<string, string> = {
  ALL: "Всі фото",
  DOORS: "Розсувні решітки на двері",
  WINDOWS: "Розсувні решітки на вікна",
  LARGE: "Розсувні решітки великих розмірів",
};

export function PhotoGallery({ photos }: { photos: Photo[] }) {
  const [category, setCategory] = useState<string>("ALL");
  const filtered = category === "ALL" ? photos : photos.filter((p) => p.category === category);

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-3">
        {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setCategory(key)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              category === key
                ? "border-neutral-900 bg-neutral-900 text-white"
                : "border-neutral-300 text-neutral-700 hover:border-neutral-500"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {filtered.map((photo) => (
          <a
            key={photo.id}
            href={photo.imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block overflow-hidden rounded-lg bg-neutral-100"
          >
            <Image
              src={photo.imageUrl}
              alt={photo.title}
              width={300}
              height={300}
              className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
              unoptimized
            />
            <span className="absolute inset-x-0 bottom-0 bg-black/60 px-2 py-1.5 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
              {photo.title}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
