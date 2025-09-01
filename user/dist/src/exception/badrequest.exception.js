"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestException = void 0;
const http_exception_1 = require("./http.exception");
class BadRequestException extends http_exception_1.HttpException {
    constructor(params) {
        super({
            status: 400,
            code: "E400",
            message: params.message,
            data: params.data,
            description: params.description,
        });
    }
}
exports.BadRequestException = BadRequestException;
