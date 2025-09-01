"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const argon2_1 = __importDefault(require("argon2"));
const prisma = new client_1.PrismaClient();
async function main() {
    const adminHash = await argon2_1.default.hash('Admin@123');
    const studentHash = await argon2_1.default.hash('Pass@123');
    await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: { email: 'admin@example.com', password: adminHash, role: client_1.Role.ADMIN }
    });
    await prisma.user.upsert({
        where: { email: 'student@example.com' },
        update: {},
        create: { email: 'student@example.com', password: studentHash, role: client_1.Role.STUDENT }
    });
}
main().finally(() => prisma.$disconnect());
