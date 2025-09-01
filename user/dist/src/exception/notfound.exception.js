"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundException = void 0;
const http_exception_1 = require("./http.exception");
class NotFoundException extends http_exception_1.HttpException {
    constructor(params) {
        super({
            status: 404,
            code: "E404",
            message: params.message,
            data: params.data,
            description: params.description,
        });
    }
}
exports.NotFoundException = NotFoundException;
