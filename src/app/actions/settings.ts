"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function updateSettings(formData: FormData) {
  const pricePerM2 = Number(formData.get("pricePerM2") ?? 0);
  const phonePrimary = String(formData.get("phonePrimary") ?? "");
  const phoneSecondary = String(formData.get("phoneSecondary") ?? "");
  const workHours = String(formData.get("workHours") ?? "");
  const email = String(formData.get("email") ?? "");

  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: { pricePerM2, phonePrimary, phoneSecondary, workHours, email },
    create: { id: 1, pricePerM2, phonePrimary, phoneSecondary, workHours, email },
  });

  revalidatePath("/admin/settings");
  revalidatePath("/");
}
