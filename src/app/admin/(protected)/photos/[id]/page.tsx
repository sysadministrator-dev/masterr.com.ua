import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { updatePhoto, deletePhoto } from "@/app/actions/photos";
import { FileDropzone } from "@/components/admin/FileDropzone";
import { VisibilityToggle } from "@/components/admin/VisibilityToggle";

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
      <Link href="/admin/photos" className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-neutral-900">
        <ArrowLeft className="h-4 w-4" />
        До списку фото
      </Link>

      <div className="flex items-center gap-4">
        <Image src={photo.imageUrl} alt={photo.title} width={72} height={72} className="h-18 w-18 shrink-0 rounded-xl object-cover" unoptimized />
        <div className="flex-1">
          <h1 className="text-xl font-bold text-neutral-900">Редагувати фото</h1>
          <p className="text-sm text-neutral-500">{photo.title}</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-neutral-500">
          <span>Показувати на сайті</span>
          <VisibilityToggle id={photo.id} visible={photo.visible} />
        </div>
      </div>

      <form action={updatePhotoWithId} className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-5">
        <FileDropzone name="imageFile" label="Новий файл зображення (необов'язково)" />
        <div>
          <label className="mb-1 block text-xs font-medium text-neutral-500">URL зображення</label>
          <input name="imageUrl" defaultValue={photo.imageUrl} className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm focus:border-neutral-900 focus:outline-none" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-neutral-500">Підпис</label>
          <input name="title" defaultValue={photo.title} required className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm focus:border-neutral-900 focus:outline-none" />
        </div>
        <div className="flex flex-wrap items-end gap-3">
          <div className="min-w-[160px] flex-1">
            <label className="mb-1 block text-xs font-medium text-neutral-500">Категорія</label>
            <select name="category" defaultValue={photo.category} className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm focus:border-neutral-900 focus:outline-none">
              <option value="DOORS">Двері</option>
              <option value="WINDOWS">Вікна</option>
              <option value="LARGE">Великі розміри</option>
            </select>
          </div>
          <div className="w-24">
            <label className="mb-1 block text-xs font-medium text-neutral-500">Порядок</label>
            <input name="order" type="number" defaultValue={photo.order} className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm focus:border-neutral-900 focus:outline-none" />
          </div>
          <button type="submit" className="rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-700">
            Зберегти
          </button>
        </div>
      </form>

      <form action={deleteAndRedirect}>
        <button type="submit" className="text-sm font-medium text-red-600 hover:text-red-800">
          Видалити фото
        </button>
      </form>
    </div>
  );
}
