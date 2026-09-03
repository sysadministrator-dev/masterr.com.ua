"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Photo } from "@/generated/prisma/client";

const CATEGORY_LABELS: Record<string, string> = {
  ALL: "Всі фото",
  DOORS: "На двері",
  WINDOWS: "На вікна",
  LARGE: "Великі розміри",
};

export function PhotoGallery({ photos }: { photos: Photo[] }) {
  const [category, setCategory] = useState<string>("ALL");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const filtered = category === "ALL" ? photos : photos.filter((p) => p.category === category);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (openIndex === null) {
      dialog.close();
    } else if (!dialog.open) {
      dialog.showModal();
    }
  }, [openIndex]);

  const current = openIndex !== null ? filtered[openIndex] : null;

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-widest">
        {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
          <button
            key={key}
            onClick={() => {
              setCategory(key);
              setOpenIndex(null);
            }}
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

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {filtered.map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setOpenIndex(index)}
            className="group relative block aspect-square overflow-hidden rounded-theme bg-card text-left"
          >
            <Image
              src={photo.imageUrl}
              alt={photo.title}
              width={300}
              height={300}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              unoptimized
            />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-text/80 px-3 py-2 text-[11px] font-medium uppercase tracking-wide text-background transition-transform duration-300 group-hover:translate-y-0">
              {photo.title}
            </span>
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setOpenIndex(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) setOpenIndex(null);
        }}
        className="m-auto max-h-[90vh] w-[92vw] max-w-4xl overscroll-contain rounded-theme border-0 bg-transparent p-0 backdrop:bg-text/70"
      >
        {current && (
          <div className="relative overflow-hidden rounded-theme bg-card">
            <button
              type="button"
              onClick={() => setOpenIndex(null)}
              aria-label="Закрити"
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-card text-text shadow hover:text-primary"
            >
              ✕
            </button>
            {filtered.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setOpenIndex((i) => (i === null ? i : (i - 1 + filtered.length) % filtered.length))}
                  aria-label="Попереднє фото"
                  className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-card text-text shadow hover:text-primary"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() => setOpenIndex((i) => (i === null ? i : (i + 1) % filtered.length))}
                  aria-label="Наступне фото"
                  className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-card text-text shadow hover:text-primary"
                >
                  ›
                </button>
              </>
            )}
            <Image
              src={current.imageUrl}
              alt={current.title}
              width={1200}
              height={1200}
              className="max-h-[90vh] w-full object-contain"
              unoptimized
            />
            <p className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {current.title}
            </p>
          </div>
        )}
      </dialog>
    </div>
  );
}
