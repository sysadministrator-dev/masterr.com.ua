"use client";

import { useState, type ChangeEvent } from "react";
import { Upload } from "lucide-react";

export function FileDropzone({ name, label }: { name: string; label: string }) {
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <label className="group flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-neutral-300 bg-neutral-50 px-4 py-6 text-center transition-colors hover:border-neutral-900 hover:bg-neutral-100">
      <Upload className="h-5 w-5 text-neutral-400 transition-colors group-hover:text-neutral-700" />
      <span className="text-sm font-medium text-neutral-700">{fileName ?? label}</span>
      <span className="text-xs text-neutral-400">Натисніть, щоб обрати файл</span>
      <input
        type="file"
        name={name}
        accept="image/*"
        className="sr-only"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setFileName(e.target.files?.[0]?.name ?? null)}
      />
    </label>
  );
}
