import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { updateVideo } from "@/app/actions/videos";

export default async function EditVideoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const video = await prisma.video.findUnique({ where: { id: Number(id) } });
  if (!video) notFound();

  const updateVideoWithId = updateVideo.bind(null, video.id);

  return (
    <div className="space-y-6">
      <Link href="/admin/videos" className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-neutral-900">
        <ArrowLeft className="h-4 w-4" />
        До відео об&apos;єктів
      </Link>

      <div className="flex items-center gap-4">
        <Image src={video.thumbnailUrl} alt={video.title} width={72} height={72} className="h-18 w-18 shrink-0 rounded-xl object-cover" unoptimized />
        <div>
          <h1 className="text-xl font-bold text-neutral-900">Редагувати картку</h1>
          <p className="text-sm text-neutral-500">{video.title}</p>
        </div>
      </div>

      <form action={updateVideoWithId} className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-5">
        <div>
          <label className="mb-1 block text-xs font-medium text-neutral-500">Посилання на YouTube</label>
          <input
            name="videoUrl"
            defaultValue={video.videoUrl}
            placeholder="https://www.youtube.com/watch?v=..."
            required
            className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm focus:border-neutral-900 focus:outline-none"
          />
          <p className="mt-1 text-xs text-neutral-400">Прев&apos;ю картки підтягується автоматично з YouTube за цим посиланням.</p>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-neutral-500">Підпис</label>
          <input
            name="title"
            defaultValue={video.title}
            required
            className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm focus:border-neutral-900 focus:outline-none"
          />
        </div>

        <button type="submit" className="rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-700">
          Зберегти
        </button>
      </form>
    </div>
  );
}
