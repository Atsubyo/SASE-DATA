/* eslint-disable no-var */
import { PrismaClient } from '@prisma/client';

// Type-safe declaration for the global property
declare global {
    var prisma: PrismaClient | undefined;
}

export let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    // Checking if prisma is already defined on globalThis to prevent multiple instances
    if (!globalThis.prisma) {
        globalThis.prisma = new PrismaClient();
    }
    prisma = global.prisma as PrismaClient;
}

export { };

export default prisma;
