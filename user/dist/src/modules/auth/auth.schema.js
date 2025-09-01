"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = exports.registerUserBody = exports.loginSchema = exports.loginUserBody = void 0;
exports.loginUserBody = {
    type: "object",
    required: ["email", "password"],
    properties: {
        email: {
            type: "string",
            minLength: 4,
            default: "student@gmail.com"
        },
        password: {
            type: "string",
            minLength: 8,
            default: "Pass@123"
        }
    },
};
const loginResponse = {
    200: {
        description: "Successful response",
        type: "object",
        properties: {
            data: {
                type: "object",
                properties: {
                    accessToken: { type: "string" },
                    id: { type: "integer" },
                    email: { type: "string" },
                    role: { type: "string" }
                },
            },
            message: { type: "string" },
            success: { type: "boolean" },
            code: { type: "string" },
        },
    },
};
exports.loginSchema = {
    description: "User login",
    tags: ["Auth"],
    summary: "User Login",
    body: exports.loginUserBody,
    response: loginResponse,
};
exports.registerUserBody = {
    type: "object",
    required: ["email", "password"],
    properties: {
        email: {
            type: "string",
            default: "student@gmail.com",
            minLength: 4,
        },
        password: {
            type: "string",
            default: "Pass@123",
            minLength: 8,
        },
        role: {
            type: "string",
            enum: ["ADMIN", "STUDENT"],
            default: "STUDENT"
        }
    },
};
const registerResponse = {
    200: {
        description: "Successful response",
        type: "object",
        properties: {
            data: {
                type: "object",
                properties: {
                    id: { type: "integer" },
                    email: { type: "string" },
                    role: { type: "string" }
                },
            },
            message: { type: "string" },
            success: { type: "boolean" },
            code: { type: "string" },
        },
    },
};
exports.registerSchema = {
    description: "User register",
    tags: ["Auth"],
    summary: "User Register",
    body: exports.registerUserBody,
    response: registerResponse,
};
