import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { updatePhoto, deletePhoto } from "@/app/actions/photos";

export default async function EditPhotoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const photo = await prisma.photo.findUnique({ where: { id: Number(id) } });
  if (!photo) notFound();

  const photoId = photo.id;
  const updatePhotoWithId = updatePhoto.bind(null, photoId);

  async function deleteAndRedirect() {
    "use server";
    await deletePhoto(photoId);
    redirect("/admin/photos");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-neutral-900">Редагувати фото</h1>

      <Image src={photo.imageUrl} alt={photo.title} width={160} height={160} className="h-40 w-40 rounded object-cover" unoptimized />

      <form action={updatePhotoWithId} className="space-y-3 rounded-lg border border-neutral-200 bg-white p-6" encType="multipart/form-data">
        <div>
          <label className="block text-sm text-neutral-600">Новий файл зображення (необов&apos;язково)</label>
          <input type="file" name="imageFile" accept="image/*" className="mt-1 w-full text-sm" />
        </div>
        <div>
          <label className="block text-sm text-neutral-600">URL зображення</label>
          <input name="imageUrl" defaultValue={photo.imageUrl} className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm text-neutral-600">Підпис</label>
          <input name="title" defaultValue={photo.title} required className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 text-sm" />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm text-neutral-600">Категорія</label>
            <select name="category" defaultValue={photo.category} className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 text-sm">
              <option value="DOORS">Двері</option>
              <option value="WINDOWS">Вікна</option>
              <option value="LARGE">Великі розміри</option>
            </select>
          </div>
          <div className="w-24">
            <label className="block text-sm text-neutral-600">Порядок</label>
            <input name="order" type="number" defaultValue={photo.order} className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 text-sm" />
          </div>
        </div>
        <div className="flex gap-3">
          <button type="submit" className="rounded bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700">
            Зберегти
          </button>
        </div>
      </form>

      <form action={deleteAndRedirect}>
        <button type="submit" className="text-sm text-red-600 hover:text-red-800">
          Видалити фото
        </button>
      </form>
    </div>
  );
}
