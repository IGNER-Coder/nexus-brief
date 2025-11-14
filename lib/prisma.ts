import { PrismaClient } from "@prisma/client";

// This code ensures that in a development environment,
// we don't create a new Prisma Client on every hot reload.
// In production, it just creates one.

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}