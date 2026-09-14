"use client";

import { useOptimistic, useTransition } from "react";
import { setPhotoVisibility } from "@/app/actions/photos";

export function VisibilityToggle({ id, visible }: { id: number; visible: boolean }) {
  const [isPending, startTransition] = useTransition();
  const [optimisticVisible, setOptimisticVisible] = useOptimistic(visible);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={optimisticVisible}
      aria-label={optimisticVisible ? "Приховати фото на сайті" : "Показати фото на сайті"}
      disabled={isPending}
      onClick={() => {
        const next = !optimisticVisible;
        startTransition(async () => {
          setOptimisticVisible(next);
          await setPhotoVisibility(id, next);
        });
      }}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300 ease-out disabled:opacity-60 ${
        optimisticVisible ? "bg-emerald-500" : "bg-neutral-300"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-300 ease-out ${
          optimisticVisible ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}
