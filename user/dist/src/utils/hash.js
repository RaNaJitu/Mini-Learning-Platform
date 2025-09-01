"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.verifyPassword = verifyPassword;
const argon2_1 = __importDefault(require("argon2"));
async function hashPassword(password) {
    const hash = await argon2_1.default.hash(password);
    console.log("==LOG== ~ hashPassword ~ hash:", hash);
    return { hash };
}
async function verifyPassword(candidatePassword, hash) {
    const candidateHash = await argon2_1.default.verify(hash, candidatePassword);
    return candidateHash === hash;
}
