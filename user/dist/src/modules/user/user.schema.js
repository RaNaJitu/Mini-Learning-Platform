"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProfileSchema = void 0;
const userProfileResponse = {
    200: {
        description: "Successful response",
        type: "object",
        properties: {
            data: {
                type: "object",
                properties: {
                    id: { type: "integer" },
                    email: { type: "string" },
                    role: { type: "string" },
                    createdAt: { type: "string" }
                },
            },
            message: { type: "string" },
            success: { type: "boolean" },
            code: { type: "string" },
        },
    },
};
exports.userProfileSchema = {
    description: "User profile details",
    tags: ["User"],
    summary: "User Profile",
    response: userProfileResponse,
};
