-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "PhotoCategory" AS ENUM ('DOORS', 'WINDOWS', 'LARGE');

-- CreateTable
CREATE TABLE "Photo" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" "PhotoCategory" NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Video" (
    "id" SERIAL NOT NULL,
    "thumbnailUrl" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "pricePerM2" INTEGER NOT NULL DEFAULT 3500,
    "phonePrimary" TEXT NOT NULL DEFAULT '+38-067-63-050-63',
    "phoneSecondary" TEXT NOT NULL DEFAULT '+38-073-63-050-63',
    "workHours" TEXT NOT NULL DEFAULT 'Пн - Сб: 9.00 - 19.00',
    "email" TEXT NOT NULL DEFAULT 'dborcov@gmail.com',
    "emailSecondary" TEXT NOT NULL DEFAULT 'inform@masterr.com.ua',
    "youtubeUrl" TEXT NOT NULL DEFAULT 'https://www.youtube.com/channel/UCMJ686uwV4tUQAuaVskW6dg',
    "facebookUrl" TEXT NOT NULL DEFAULT 'https://www.facebook.com/masterr.com.ua',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);

