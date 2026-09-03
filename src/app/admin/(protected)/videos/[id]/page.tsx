import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { updateVideo, deleteVideo } from "@/app/actions/videos";

export default async function EditVideoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const video = await prisma.video.findUnique({ where: { id: Number(id) } });
  if (!video) notFound();

  const videoId = video.id;
  const updateVideoWithId = updateVideo.bind(null, videoId);

  async function deleteAndRedirect() {
    "use server";
    await deleteVideo(videoId);
    redirect("/admin/videos");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-neutral-900">Редагувати відео</h1>

      <Image src={video.thumbnailUrl} alt={video.title} width={160} height={160} className="h-40 w-40 rounded object-cover" unoptimized />

      <form action={updateVideoWithId} className="space-y-3 rounded-lg border border-neutral-200 bg-white p-6" encType="multipart/form-data">
        <div>
          <label className="block text-sm text-neutral-600">Новий файл прев&apos;ю (необов&apos;язково)</label>
          <input type="file" name="thumbnailFile" accept="image/*" className="mt-1 w-full text-sm" />
        </div>
        <div>
          <label className="block text-sm text-neutral-600">URL прев&apos;ю</label>
          <input name="thumbnailUrl" defaultValue={video.thumbnailUrl} className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm text-neutral-600">URL відео</label>
          <input name="videoUrl" defaultValue={video.videoUrl} className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm text-neutral-600">Підпис</label>
          <input name="title" defaultValue={video.title} required className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 text-sm" />
        </div>
        <div className="w-24">
          <label className="block text-sm text-neutral-600">Порядок</label>
          <input name="order" type="number" defaultValue={video.order} className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 text-sm" />
        </div>
        <button type="submit" className="rounded bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700">
          Зберегти
        </button>
      </form>

      <form action={deleteAndRedirect}>
        <button type="submit" className="text-sm text-red-600 hover:text-red-800">
          Видалити відео
        </button>
      </form>
    </div>
  );
}
