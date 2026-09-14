-- CreateTable
CREATE TABLE `Photo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `imageUrl` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `category` ENUM('DOORS', 'WINDOWS', 'LARGE') NOT NULL,
    `order` INTEGER NOT NULL DEFAULT 0,
    `visible` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `primaryImage` VARCHAR(191) NOT NULL,
    `hoverImage` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `oldPrice` INTEGER NULL,
    `order` INTEGER NOT NULL DEFAULT 0,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Video` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `thumbnailUrl` VARCHAR(191) NOT NULL,
    `videoUrl` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SiteSettings` (
    `id` INTEGER NOT NULL DEFAULT 1,
    `pricePerM2` INTEGER NOT NULL DEFAULT 3500,
    `phonePrimary` VARCHAR(191) NOT NULL DEFAULT '+38-067-63-050-63',
    `phoneSecondary` VARCHAR(191) NOT NULL DEFAULT '+38-073-63-050-63',
    `workHours` VARCHAR(191) NOT NULL DEFAULT 'Пн - Сб: 9.00 - 19.00',
    `email` VARCHAR(191) NOT NULL DEFAULT 'dborcov@gmail.com',
    `emailSecondary` VARCHAR(191) NOT NULL DEFAULT '',
    `youtubeUrl` VARCHAR(191) NOT NULL DEFAULT 'https://www.youtube.com/channel/UCZC-khLJ_wAuLx2lR4hxcFA',
    `facebookUrl` VARCHAR(191) NOT NULL DEFAULT 'https://www.facebook.com/masterr.com.ua',
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

