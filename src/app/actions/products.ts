"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { isUploadableFile, saveUploadedFile } from "@/lib/upload";

async function resolveImage(formData: FormData, fileField: string, urlField: string, fallback: string): Promise<string> {
  const file = formData.get(fileField);
  if (isUploadableFile(file)) return saveUploadedFile(file);
  const url = String(formData.get(urlField) ?? "").trim();
  return url || fallback;
}

export async function updateProduct(id: number, formData: FormData) {
  const current = await prisma.product.findUnique({ where: { id } });
  if (!current) return;

  const primaryImage = await resolveImage(formData, "primaryImageFile", "primaryImageUrl", current.primaryImage);
  const hoverImage = await resolveImage(formData, "hoverImageFile", "hoverImageUrl", current.hoverImage);
  const title = String(formData.get("title") ?? "").trim();
  const price = Number(formData.get("price") ?? current.price);
  const oldPriceRaw = String(formData.get("oldPrice") ?? "").trim();
  const oldPrice = oldPriceRaw ? Number(oldPriceRaw) : null;

  if (!primaryImage || !hoverImage || !title || !price) return;

  await prisma.product.update({
    where: { id },
    data: { primaryImage, hoverImage, title, price, oldPrice },
  });

  revalidatePath("/admin/products");
  revalidatePath("/");
}
