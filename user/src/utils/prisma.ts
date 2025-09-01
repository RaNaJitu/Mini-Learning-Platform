import { PrismaClient } from "@prisma/client";

const prisma  = createPrismaClient(process.env.DATABASE_URL as string);
export default prisma

function createPrismaClient(databaseUrl: string): PrismaClient {
  return new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
  });
}





