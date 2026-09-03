-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SiteSettings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "pricePerM2" INTEGER NOT NULL DEFAULT 3500,
    "phonePrimary" TEXT NOT NULL DEFAULT '+38-067-63-050-63',
    "phoneSecondary" TEXT NOT NULL DEFAULT '+38-073-63-050-63',
    "workHours" TEXT NOT NULL DEFAULT 'Пн - Сб: 9.00 - 19.00',
    "email" TEXT NOT NULL DEFAULT 'dborcov@gmail.com',
    "emailSecondary" TEXT NOT NULL DEFAULT 'inform@masterr.com.ua',
    "youtubeUrl" TEXT NOT NULL DEFAULT 'https://www.youtube.com/channel/UCMJ686uwV4tUQAuaVskW6dg',
    "facebookUrl" TEXT NOT NULL DEFAULT 'https://www.facebook.com/masterr.com.ua',
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_SiteSettings" ("email", "id", "phonePrimary", "phoneSecondary", "pricePerM2", "updatedAt", "workHours") SELECT "email", "id", "phonePrimary", "phoneSecondary", "pricePerM2", "updatedAt", "workHours" FROM "SiteSettings";
DROP TABLE "SiteSettings";
ALTER TABLE "new_SiteSettings" RENAME TO "SiteSettings";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
