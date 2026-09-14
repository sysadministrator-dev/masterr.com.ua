"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

const YOUTUBE_ID_PATTERN = /(?:youtube\.com\/(?:shorts\/|watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{6,})/;

function youtubeThumbnailUrl(videoUrl: string): string | null {
  const match = videoUrl.match(YOUTUBE_ID_PATTERN);
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
}

export async function createVideo(formData: FormData) {
  const videoUrl = String(formData.get("videoUrl") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();

  if (!videoUrl || !title) return;

  const thumbnailUrl = youtubeThumbnailUrl(videoUrl);
  if (!thumbnailUrl) return;

  const last = await prisma.video.findFirst({ orderBy: { order: "desc" } });
  const order = (last?.order ?? 0) + 1;

  await prisma.video.create({ data: { thumbnailUrl, videoUrl, title, order } });
  revalidatePath("/admin/videos");
  revalidatePath("/");
}

export async function updateVideo(id: number, formData: FormData) {
  const videoUrl = String(formData.get("videoUrl") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();

  if (!videoUrl || !title) return;

  const thumbnailUrl = youtubeThumbnailUrl(videoUrl);
  if (!thumbnailUrl) return;

  await prisma.video.update({ where: { id }, data: { thumbnailUrl, videoUrl, title } });
  revalidatePath("/admin/videos");
  revalidatePath("/");
}
