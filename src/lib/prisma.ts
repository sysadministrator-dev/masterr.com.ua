import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Prisma's CLI/config needs "mysql://" in DATABASE_URL, but the mariadb driver only parses "mariadb://".
const adapter = new PrismaMariaDb(process.env.DATABASE_URL!.replace(/^mysql:\/\//, "mariadb://"));

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
