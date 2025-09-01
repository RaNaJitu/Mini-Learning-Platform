"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserBodySchema = exports.registerUserBodySchema = void 0;
const zod_1 = require("zod");
exports.registerUserBodySchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .email("Invalid email format")
        .min(6, "The email should have at least 6 characters or more.")
        .max(100, "The email cannot exceed more than 100 characters!"),
    password: zod_1.z
        .string()
        .min(6, "The password should have at least 6 characters or more.")
        .max(16, "The password cannot exceed more than 16 characters!")
        .regex(/^[a-zA-Z0-9@!#$&]+$/, "The Password can only contain letters, numbers, and the symbols @, !, #, $, &"),
    role: zod_1.z.enum(["ADMIN", "STUDENT"]).optional(),
});
exports.loginUserBodySchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .email("Invalid email format"),
    password: zod_1.z
        .string()
        .min(6, "The password should have at least 6 characters or more.")
        .max(16, "The password cannot exceed more than 16 characters!")
        .regex(/^[a-zA-Z0-9@!#$&]+$/, "The Password can only contain letters, numbers, and the symbols @, !, #, $, &"),
});
