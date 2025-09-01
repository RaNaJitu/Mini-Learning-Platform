"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedException = void 0;
const http_exception_1 = require("./http.exception");
class UnauthorizedException extends http_exception_1.HttpException {
    constructor(params) {
        super({
            status: 401,
            code: "E401",
            message: params.message,
            data: params.data,
            description: params.description,
        });
    }
}
exports.UnauthorizedException = UnauthorizedException;
