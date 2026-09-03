"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { PhotoCategory } from "@/generated/prisma/client";
import { isUploadableFile, saveUploadedFile } from "@/lib/upload";

function parseCategory(value: FormDataEntryValue | null): PhotoCategory {
  if (value === "DOORS" || value === "WINDOWS" || value === "LARGE") return value;
  return "DOORS";
}

async function resolveImageUrl(formData: FormData): Promise<string> {
  const file = formData.get("imageFile");
  if (isUploadableFile(file)) return saveUploadedFile(file);
  return String(formData.get("imageUrl") ?? "");
}

export async function createPhoto(formData: FormData) {
  const imageUrl = await resolveImageUrl(formData);
  const title = String(formData.get("title") ?? "");
  const category = parseCategory(formData.get("category"));
  const order = Number(formData.get("order") ?? 0);

  if (!imageUrl || !title) return;

  await prisma.photo.create({ data: { imageUrl, title, category, order } });
  revalidatePath("/admin/photos");
  revalidatePath("/");
}

export async function updatePhoto(id: number, formData: FormData) {
  const imageUrl = await resolveImageUrl(formData);
  const title = String(formData.get("title") ?? "");
  const category = parseCategory(formData.get("category"));
  const order = Number(formData.get("order") ?? 0);

  if (!imageUrl || !title) return;

  await prisma.photo.update({ where: { id }, data: { imageUrl, title, category, order } });
  revalidatePath("/admin/photos");
  revalidatePath("/");
}

export async function deletePhoto(id: number) {
  await prisma.photo.delete({ where: { id } });
  revalidatePath("/admin/photos");
  revalidatePath("/");
}
