import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { createVideo, deleteVideo } from "@/app/actions/videos";

export default async function AdminVideosPage() {
  const videos = await prisma.video.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold text-neutral-900">Відео об&apos;єктів</h1>

      <form
        action={createVideo}
        className="space-y-3 rounded-lg border border-neutral-200 bg-white p-6"
        encType="multipart/form-data"
      >
        <h2 className="font-medium text-neutral-900">Додати відео</h2>
        <div>
          <label className="block text-sm text-neutral-600">Файл прев&apos;ю (зображення)</label>
          <input type="file" name="thumbnailFile" accept="image/*" className="mt-1 w-full text-sm" />
        </div>
        <div>
          <label className="block text-sm text-neutral-600">або URL прев&apos;ю</label>
          <input name="thumbnailUrl" placeholder="/images/preview-video1.jpg" className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm text-neutral-600">URL відео (YouTube, mp4 тощо)</label>
          <input name="videoUrl" placeholder="https://..." className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm text-neutral-600">Підпис</label>
          <input name="title" required className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 text-sm" />
        </div>
        <div className="w-24">
          <label className="block text-sm text-neutral-600">Порядок</label>
          <input name="order" type="number" defaultValue={0} className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 text-sm" />
        </div>
        <button type="submit" className="rounded bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700">
          Додати
        </button>
      </form>

      <ul className="divide-y divide-neutral-200 rounded-lg border border-neutral-200 bg-white">
        {videos.map((video) => (
          <li key={video.id} className="flex items-center gap-4 p-4">
            <Image src={video.thumbnailUrl} alt={video.title} width={64} height={64} className="h-16 w-16 rounded object-cover" unoptimized />
            <div className="flex-1">
              <p className="font-medium text-neutral-900">{video.title}</p>
              <p className="text-sm text-neutral-500">
                {video.videoUrl ? video.videoUrl : "URL відео не вказано"} · порядок {video.order}
              </p>
            </div>
            <Link href={`/admin/videos/${video.id}`} className="text-sm text-neutral-600 hover:text-neutral-900">
              Редагувати
            </Link>
            <form action={deleteVideo.bind(null, video.id)}>
              <button type="submit" className="text-sm text-red-600 hover:text-red-800">
                Видалити
              </button>
            </form>
          </li>
        ))}
        {videos.length === 0 && <li className="p-4 text-sm text-neutral-500">Відео ще не додано.</li>}
      </ul>
    </div>
  );
}
