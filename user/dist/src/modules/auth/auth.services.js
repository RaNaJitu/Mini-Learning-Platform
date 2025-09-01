"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUser = void 0;
exports.findUserByEmail = findUserByEmail;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const hash_1 = require("../../utils/hash");
async function findUserByEmail(email) {
    const user = await prisma_1.default.user.findUnique({
        where: {
            email
        }
    });
    return user;
}
const RegisterUser = async (body) => {
    let { email, password, role } = body;
    const { hash } = await (0, hash_1.hashPassword)(password);
    const created_user = await prisma_1.default.user.create({
        data: { email, role: role || "STUDENT", password: hash },
    });
    return {
        id: created_user.id,
        email: created_user.email,
        role: created_user.role
    };
};
exports.RegisterUser = RegisterUser;
