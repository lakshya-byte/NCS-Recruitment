import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
// 1. Import from your NEW generated path
import { PrismaClient } from "@prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

// 2. Setup the PostgreSQL driver (Mandatory in v7)
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

declare global {
	// Use 'any' here or the actual type from the generated client
	var prisma: PrismaClient | undefined;
}

// 3. Pass the adapter to the constructor
export const prisma = global.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
