"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fmt = exports.config = void 0;
if (!process.env.NODE_ENV) {
    const dotenv = require("dotenv");
    dotenv.config();
}
const formatter_1 = __importDefault(require("../src/utils/formatter"));
const config_1 = __importDefault(require("./config"));
const config = new config_1.default(process.env);
exports.config = config;
const fmt = new formatter_1.default();
exports.fmt = fmt;
