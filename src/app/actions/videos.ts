"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { isUploadableFile, saveUploadedFile } from "@/lib/upload";

async function resolveThumbnailUrl(formData: FormData): Promise<string> {
  const file = formData.get("thumbnailFile");
  if (isUploadableFile(file)) return saveUploadedFile(file);
  return String(formData.get("thumbnailUrl") ?? "");
}

export async function createVideo(formData: FormData) {
  const thumbnailUrl = await resolveThumbnailUrl(formData);
  const videoUrl = String(formData.get("videoUrl") ?? "");
  const title = String(formData.get("title") ?? "");
  const order = Number(formData.get("order") ?? 0);

  if (!thumbnailUrl || !title) return;

  await prisma.video.create({ data: { thumbnailUrl, videoUrl, title, order } });
  revalidatePath("/admin/videos");
  revalidatePath("/");
}

export async function updateVideo(id: number, formData: FormData) {
  const thumbnailUrl = await resolveThumbnailUrl(formData);
  const videoUrl = String(formData.get("videoUrl") ?? "");
  const title = String(formData.get("title") ?? "");
  const order = Number(formData.get("order") ?? 0);

  if (!thumbnailUrl || !title) return;

  await prisma.video.update({ where: { id }, data: { thumbnailUrl, videoUrl, title, order } });
  revalidatePath("/admin/videos");
  revalidatePath("/");
}

export async function deleteVideo(id: number) {
  await prisma.video.delete({ where: { id } });
  revalidatePath("/admin/videos");
  revalidatePath("/");
}
