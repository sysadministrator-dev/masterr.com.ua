import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { createPhoto, deletePhoto } from "@/app/actions/photos";
import { FileDropzone } from "@/components/admin/FileDropzone";
import { VisibilityToggle } from "@/components/admin/VisibilityToggle";

const CATEGORY_LABELS: Record<string, string> = {
  DOORS: "Двері",
  WINDOWS: "Вікна",
  LARGE: "Великі розміри",
};

export default async function AdminPhotosPage() {
  const photos = await prisma.photo.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-900">Фото об&apos;єктів</h1>
        <span className="text-sm text-neutral-500">{photos.length} фото</span>
      </div>

      <details className="group rounded-2xl border border-neutral-200 bg-white">
        <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 [&::-webkit-details-marker]:hidden">
          <span className="flex items-center gap-2 text-sm font-semibold text-neutral-900">
            <Plus className="h-4 w-4" />
            Додати фото
          </span>
          <span className="text-neutral-400 transition-transform group-open:rotate-180">⌄</span>
        </summary>

        <form action={createPhoto} className="space-y-4 px-5 pb-5 pt-1">
          <div className="grid gap-4 sm:grid-cols-2">
            <FileDropzone name="imageFile" label="Файл зображення" />
            <div className="flex flex-col gap-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-500">або URL зображення</label>
                <input
                  name="imageUrl"
                  placeholder="/images/photo-1-600.jpg"
                  className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm focus:border-neutral-900 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-500">Підпис</label>
                <input
                  name="title"
                  required
                  className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm focus:border-neutral-900 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-end gap-4">
            <div className="min-w-[160px] flex-1">
              <label className="mb-1 block text-xs font-medium text-neutral-500">Категорія</label>
              <select name="category" className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm focus:border-neutral-900 focus:outline-none">
                <option value="DOORS">Двері</option>
                <option value="WINDOWS">Вікна</option>
                <option value="LARGE">Великі розміри</option>
              </select>
            </div>

            <label className="flex cursor-pointer flex-col gap-1.5">
              <span className="text-xs font-medium text-neutral-500">Показувати на сайті</span>
              <span className="relative h-6 w-11 shrink-0 rounded-full bg-neutral-300 transition-colors duration-300 after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition-transform after:duration-300 after:content-[''] has-checked:bg-emerald-500 has-checked:after:translate-x-5">
                <input type="checkbox" name="visible" value="true" defaultChecked className="sr-only" />
              </span>
            </label>

            <button
              type="submit"
              className="rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-700"
            >
              Додати
            </button>
          </div>
        </form>
      </details>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className={`flex items-center gap-3 rounded-xl border p-3 transition-opacity ${
              photo.visible ? "border-neutral-200 bg-white" : "border-neutral-200 bg-neutral-50 opacity-60"
            }`}
          >
            <Image
              src={photo.imageUrl}
              alt={photo.title}
              width={56}
              height={56}
              className="h-14 w-14 shrink-0 rounded-lg object-cover"
              unoptimized
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-neutral-900">{photo.title}</p>
              <p className="text-xs text-neutral-500">
                {CATEGORY_LABELS[photo.category]} · #{photo.order}
              </p>
              <div className="mt-1.5 flex items-center gap-3">
                <Link href={`/admin/photos/${photo.id}`} className="text-xs font-medium text-neutral-600 hover:text-neutral-900">
                  Редагувати
                </Link>
                <form action={deletePhoto.bind(null, photo.id)}>
                  <button type="submit" className="text-xs font-medium text-red-600 hover:text-red-800">
                    Видалити
                  </button>
                </form>
              </div>
            </div>
            <VisibilityToggle id={photo.id} visible={photo.visible} />
          </div>
        ))}
        {photos.length === 0 && (
          <p className="col-span-full rounded-xl border border-dashed border-neutral-300 p-6 text-center text-sm text-neutral-500">
            Фото ще не додано.
          </p>
        )}
      </div>
    </div>
  );
}
