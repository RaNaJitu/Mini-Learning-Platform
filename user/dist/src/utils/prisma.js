"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = createPrismaClient(process.env.DATABASE_URL);
exports.default = prisma;
function createPrismaClient(databaseUrl) {
    return new client_1.PrismaClient({
        datasources: {
            db: {
                url: databaseUrl,
            },
        },
    });
}
