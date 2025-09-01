"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_route_1 = __importDefault(require("./auth.route"));
exports.default = async (fastify) => {
    for (const route of auth_route_1.default) {
        if (Array.isArray(route.preHandler)) {
            route.preHandler = [...route.preHandler];
        }
        fastify.route(route);
    }
};
