import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { createPhoto, deletePhoto } from "@/app/actions/photos";

const CATEGORY_LABELS: Record<string, string> = {
  DOORS: "Двері",
  WINDOWS: "Вікна",
  LARGE: "Великі розміри",
};

export default async function AdminPhotosPage() {
  const photos = await prisma.photo.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold text-neutral-900">Фото об&apos;єктів</h1>

      <form
        action={createPhoto}
        className="space-y-3 rounded-lg border border-neutral-200 bg-white p-6"
        encType="multipart/form-data"
      >
        <h2 className="font-medium text-neutral-900">Додати фото</h2>
        <div>
          <label className="block text-sm text-neutral-600">Файл зображення</label>
          <input type="file" name="imageFile" accept="image/*" className="mt-1 w-full text-sm" />
        </div>
        <div>
          <label className="block text-sm text-neutral-600">або URL зображення</label>
          <input name="imageUrl" placeholder="/images/photo-1-600.jpg" className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm text-neutral-600">Підпис</label>
          <input name="title" required className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 text-sm" />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm text-neutral-600">Категорія</label>
            <select name="category" className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 text-sm">
              <option value="DOORS">Двері</option>
              <option value="WINDOWS">Вікна</option>
              <option value="LARGE">Великі розміри</option>
            </select>
          </div>
          <div className="w-24">
            <label className="block text-sm text-neutral-600">Порядок</label>
            <input name="order" type="number" defaultValue={0} className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 text-sm" />
          </div>
        </div>
        <button type="submit" className="rounded bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700">
          Додати
        </button>
      </form>

      <ul className="divide-y divide-neutral-200 rounded-lg border border-neutral-200 bg-white">
        {photos.map((photo) => (
          <li key={photo.id} className="flex items-center gap-4 p-4">
            <Image src={photo.imageUrl} alt={photo.title} width={64} height={64} className="h-16 w-16 rounded object-cover" unoptimized />
            <div className="flex-1">
              <p className="font-medium text-neutral-900">{photo.title}</p>
              <p className="text-sm text-neutral-500">{CATEGORY_LABELS[photo.category]} · порядок {photo.order}</p>
            </div>
            <Link href={`/admin/photos/${photo.id}`} className="text-sm text-neutral-600 hover:text-neutral-900">
              Редагувати
            </Link>
            <form action={deletePhoto.bind(null, photo.id)}>
              <button type="submit" className="text-sm text-red-600 hover:text-red-800">
                Видалити
              </button>
            </form>
          </li>
        ))}
        {photos.length === 0 && <li className="p-4 text-sm text-neutral-500">Фото ще не додано.</li>}
      </ul>
    </div>
  );
}
