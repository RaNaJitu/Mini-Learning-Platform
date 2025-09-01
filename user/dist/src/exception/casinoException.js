"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CasinoCommonException = exports.PokerCasinoException = exports.GapCasinoException = exports.CasinoException = void 0;
class CasinoException extends Error {
    error_message = "Something went wrong";
    status = 1;
    StatusCode = 401;
    constructor(params) {
        super(params.error_message);
        this.StatusCode = params.StatusCode;
        this.status = params.status;
        this.error_message = params.error_message;
    }
}
exports.CasinoException = CasinoException;
class GapCasinoException extends Error {
    balance;
    status;
    constructor(params) {
        super(params.status);
        this.status = params.status;
        this.balance = params.balance;
    }
}
exports.GapCasinoException = GapCasinoException;
class PokerCasinoException extends Error {
    balance;
    status;
    constructor(params) {
        super(params.status);
        this.name = "PokerCasinoException";
        this.status = params.status;
        this.balance = params.balance;
        // Restore prototype chain
        Object.setPrototypeOf(this, PokerCasinoException.prototype);
    }
    toResponse() {
        return {
            status: 1,
            message: this.status,
            wallet: this.balance,
        };
    }
}
exports.PokerCasinoException = PokerCasinoException;
class CasinoCommonException extends Error {
    balance;
    status;
    constructor(params) {
        super(params.status);
        this.status = params.status;
        this.balance = params.balance;
    }
}
exports.CasinoCommonException = CasinoCommonException;
