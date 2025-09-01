"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomException = void 0;
class CustomException extends Error {
    status = 500;
    message = "Something went wrong";
    code = "E500";
    constructor(params) {
        super(params.message);
        this.status = params.status;
        this.code = params.code;
        this.message = params.message;
    }
}
exports.CustomException = CustomException;
