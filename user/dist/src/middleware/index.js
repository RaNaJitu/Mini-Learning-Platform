"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractAndVerifyToken = exports.preUserHandler = void 0;
const unauthorized_exception_1 = require("../exception/unauthorized.exception");
const config_1 = require("../../config");
const jwt_1 = require("../utils/jwt");
const prisma_1 = __importDefault(require("../utils/prisma"));
const preUserHandler = async (request, reply) => {
    try {
        const token = request.headers.authorization;
        const decodeduser = await (0, exports.extractAndVerifyToken)(request);
        const { id, email, role } = decodeduser?.data;
        let user;
        user = await prisma_1.default.user.findUnique({
            where: { email, role },
        });
        if (!user) {
            throw new unauthorized_exception_1.UnauthorizedException(config_1.fmt.formatError({
                message: "Authentication Error!",
                description: "The token is not in valid format!",
            }));
        }
        request.requestContext.set("data", {
            ...decodeduser,
        });
    }
    catch (error) {
        console.log("Error: ===>", error);
        reply.status(401).send(config_1.fmt.formatError({
            message: error.message,
            description: error.description,
        }));
    }
};
exports.preUserHandler = preUserHandler;
const extractAndVerifyToken = async (request) => {
    const token = request.headers.authorization;
    if (!token) {
        throw new unauthorized_exception_1.UnauthorizedException(config_1.fmt.formatError({
            message: "Authentication Error!",
            description: "Authorization Token Required!",
        }));
    }
    if (typeof token !== "string") {
        throw new unauthorized_exception_1.UnauthorizedException(config_1.fmt.formatError({
            message: "Authentication Error!",
            description: "The token is not in valid format!",
        }));
    }
    const auth_token = token.split(" ")[1]; // in format Bearer token
    const decodeduser = await (0, jwt_1.verifyJwt)(auth_token);
    return decodeduser;
};
exports.extractAndVerifyToken = extractAndVerifyToken;
