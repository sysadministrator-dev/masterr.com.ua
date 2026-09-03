"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function updateSettings(formData: FormData) {
  const pricePerM2 = Number(formData.get("pricePerM2") ?? 0);
  const phonePrimary = String(formData.get("phonePrimary") ?? "");
  const phoneSecondary = String(formData.get("phoneSecondary") ?? "");
  const workHours = String(formData.get("workHours") ?? "");
  const email = String(formData.get("email") ?? "");
  const emailSecondary = String(formData.get("emailSecondary") ?? "");
  const youtubeUrl = String(formData.get("youtubeUrl") ?? "");
  const facebookUrl = String(formData.get("facebookUrl") ?? "");

  const data = { pricePerM2, phonePrimary, phoneSecondary, workHours, email, emailSecondary, youtubeUrl, facebookUrl };

  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: data,
    create: { id: 1, ...data },
  });

  revalidatePath("/admin/settings");
  revalidatePath("/");
}
