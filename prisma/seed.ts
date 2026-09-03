import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

const photos: {
  imageUrl: string;
  title: string;
  category: "DOORS" | "WINDOWS" | "LARGE";
  order: number;
}[] = [
  { imageUrl: "/images/photo-1-600.jpg", title: "Приватний будинок", category: "DOORS", order: 1 },
  { imageUrl: "/images/photo-2-600.jpg", title: "Салон мобільного зв'язку", category: "WINDOWS", order: 2 },
  { imageUrl: "/images/photo-31bo-600.jpg", title: "Торговий павільйон", category: "LARGE", order: 3 },
  { imageUrl: "/images/photo-4-600.jpg", title: "Приватний будинок", category: "DOORS", order: 4 },
  { imageUrl: "/images/photo-5-600.jpg", title: "Магазин електроніки", category: "WINDOWS", order: 5 },
  { imageUrl: "/images/photo-32bo-600.jpg", title: "Магазин побутової техніки", category: "DOORS", order: 6 },
  { imageUrl: "/images/photo-7-600.jpg", title: "Торгівельне приміщення", category: "LARGE", order: 7 },
  { imageUrl: "/images/photo-8-600.jpg", title: "Приватний будинок", category: "WINDOWS", order: 8 },
  { imageUrl: "/images/photo-33bo-600.jpg", title: "Салон мобільного зв'язку", category: "LARGE", order: 9 },
  { imageUrl: "/images/photo-10-600.jpg", title: "Кріплення порогу до підлоги", category: "DOORS", order: 10 },
  { imageUrl: "/images/photo-11-600.jpg", title: "Магазин побутової техніки", category: "WINDOWS", order: 11 },
  { imageUrl: "/images/photo-12-600.jpg", title: "Торгівельний павільйон", category: "LARGE", order: 12 },
  { imageUrl: "/images/photo-13-600.jpg", title: "З'ємний поріг розсувної решітки", category: "DOORS", order: 13 },
  { imageUrl: "/images/photo-14-600.jpg", title: "Торгівельне приміщення", category: "DOORS", order: 14 },
  { imageUrl: "/images/photo-15-600.jpg", title: "Магазин електроніки", category: "LARGE", order: 15 },
  { imageUrl: "/images/photo-16-600.jpg", title: "Невдала спроба взлому", category: "DOORS", order: 16 },
  { imageUrl: "/images/photo-17-600.jpg", title: "Врізний замок для розсувної решітки", category: "DOORS", order: 17 },
  { imageUrl: "/images/photo-18-600.jpg", title: "Салон мобільного зв'язку", category: "LARGE", order: 18 },
];

const videos: {
  thumbnailUrl: string;
  videoUrl: string;
  title: string;
  order: number;
}[] = [
  { thumbnailUrl: "/images/preview-video1.jpg", videoUrl: "https://youtu.be/LCzymiEiY0U", title: "Процес виготовлення розсувних решіток", order: 1 },
  { thumbnailUrl: "/images/preview-video2.jpg", videoUrl: "https://youtu.be/VU2g9u_BeAY", title: "Процес відкриття розсувної решітки", order: 2 },
  { thumbnailUrl: "/images/preview-video3.jpg", videoUrl: "https://youtu.be/-8DFHqdSkZg", title: "Відкриття-зачинення розсувної решітки", order: 3 },
  { thumbnailUrl: "/images/preview-video4.jpg", videoUrl: "https://youtu.be/w3WxF7YAF-M", title: "Робота розсувної решітки в зборі", order: 4 },
];

async function main() {
  await prisma.photo.deleteMany();
  await prisma.video.deleteMany();

  await prisma.photo.createMany({ data: photos });
  await prisma.video.createMany({ data: videos });

  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1 },
  });

  console.log(`Seeded ${photos.length} photos, ${videos.length} videos, site settings.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
