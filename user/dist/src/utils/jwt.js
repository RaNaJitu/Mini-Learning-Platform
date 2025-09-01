"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseJwt = void 0;
exports.signJwt = signJwt;
exports.verifyJwt = verifyJwt;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config");
const unauthorized_exception_1 = require("../exception/unauthorized.exception");
//expiry time and other parameters
function signJwt(params) {
    const { data, expiresIn = "8h" } = params;
    return jsonwebtoken_1.default.sign({ data }, config_1.config.jwt_secret, { expiresIn });
}
function verifyJwt(token) {
    try {
        return jsonwebtoken_1.default.verify(token, config_1.config.jwt_secret);
    }
    catch (error) {
        throw new unauthorized_exception_1.UnauthorizedException(config_1.fmt.formatError({
            message: "Authentication Error!",
            description: error.name,
        }));
    }
}
const parseJwt = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.decode(token, { complete: true });
        return decoded;
    }
    catch (error) {
        return null;
    }
};
exports.parseJwt = parseJwt;
