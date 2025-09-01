"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpException = void 0;
class HttpException extends Error {
    status = 500;
    message = "Something went wrong";
    code = "E500";
    data = null;
    success = false;
    description = "Unexpected Error occurred Try Again!";
    constructor(params) {
        super(params.message);
        this.status = params.status;
        this.code = params.code;
        this.message = params.message;
        this.data = params.data;
        this.description = params.description;
    }
}
exports.HttpException = HttpException;
