"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenException = void 0;
const http_exception_1 = require("./http.exception");
class ForbiddenException extends http_exception_1.HttpException {
    constructor(params) {
        super({
            status: 403,
            code: "E403",
            message: params.message,
            data: params.data,
            description: params.description,
        });
    }
}
exports.ForbiddenException = ForbiddenException;
