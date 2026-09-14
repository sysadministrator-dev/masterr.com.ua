import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { createVideo } from "@/app/actions/videos";

export default async function AdminVideosPage() {
  const videos = await prisma.video.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-900">Відео об&apos;єктів</h1>
        <span className="text-sm text-neutral-500">{videos.length} відео</span>
      </div>
      <p className="text-sm text-neutral-500">
        Картки з розділу «Процес → Відео об&apos;єктів» на сайті. Тут можна додавати нові відео та редагувати посилання і підпис кожної картки.
      </p>

      <details className="group rounded-2xl border border-neutral-200 bg-white">
        <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 [&::-webkit-details-marker]:hidden">
          <span className="flex items-center gap-2 text-sm font-semibold text-neutral-900">
            <Plus className="h-4 w-4" />
            Додати відео
          </span>
          <span className="text-neutral-400 transition-transform group-open:rotate-180">⌄</span>
        </summary>

        <form action={createVideo} className="space-y-4 px-5 pb-5 pt-1">
          <div>
            <label className="mb-1 block text-xs font-medium text-neutral-500">Посилання на YouTube</label>
            <input
              name="videoUrl"
              placeholder="https://www.youtube.com/watch?v=..."
              required
              className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm focus:border-neutral-900 focus:outline-none"
            />
            <p className="mt-1 text-xs text-neutral-400">Прев&apos;ю картки підтягується автоматично з YouTube за цим посиланням.</p>
          </div>

          <div className="flex flex-wrap items-end gap-4">
            <div className="min-w-[200px] flex-1">
              <label className="mb-1 block text-xs font-medium text-neutral-500">Підпис</label>
              <input
                name="title"
                required
                className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm focus:border-neutral-900 focus:outline-none"
              />
            </div>
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
        {videos.map((video) => (
          <Link
            key={video.id}
            href={`/admin/videos/${video.id}`}
            className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white p-3 transition-colors hover:border-neutral-900"
          >
            <Image
              src={video.thumbnailUrl}
              alt={video.title}
              width={56}
              height={56}
              className="h-14 w-14 shrink-0 rounded-lg object-cover"
              unoptimized
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-neutral-900">{video.title}</p>
              <p className="truncate text-xs text-neutral-500">{video.videoUrl || "URL відео не вказано"}</p>
            </div>
          </Link>
        ))}
        {videos.length === 0 && (
          <p className="col-span-full rounded-xl border border-dashed border-neutral-300 p-6 text-center text-sm text-neutral-500">
            Відео ще не додано.
          </p>
        )}
      </div>
    </div>
  );
}
