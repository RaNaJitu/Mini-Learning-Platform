"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChildLogger = void 0;
const winston_1 = __importDefault(require("winston"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
let baseLogger = null;
const logDirectory = path_1.default.resolve(__dirname, '..', '..', '..', '..', 'logs');
// Ensure logs directory exists
if (!fs_1.default.existsSync(logDirectory)) {
    fs_1.default.mkdirSync(logDirectory, { recursive: true });
}
// Safe stringify function to handle circular references and preserve arrays ( tested )
function safeStringify(obj) {
    const seen = new WeakSet();
    return JSON.stringify(obj, (key, value) => {
        if (value && typeof value === 'object') {
            if (seen.has(value)) {
                return '[Circular]';
            }
            seen.add(value);
        }
        return value;
    }, 2 // Pretty-print with indentation
    );
}
// Shared formatter function
const formatter = winston_1.default.format.printf(({ level, message, timestamp, reqId, ...meta }) => {
    const reqIdStr = reqId ? `| ${reqId}` : ''; // Include reqId if present
    const splat = meta[Symbol.for('splat')];
    let metaStr = '';
    if (splat && splat.length > 0) {
        if (splat.length === 1) {
            const singleMeta = splat[0];
            if (singleMeta instanceof Error) {
                metaStr = `\n${singleMeta.stack}`; // Include full stack trace for errors
            }
            else if (Array.isArray(singleMeta) || typeof singleMeta === 'object') {
                metaStr = safeStringify(singleMeta); // Properly serialize arrays/objects
            }
            else {
                metaStr = String(singleMeta); // Log all other values as strings (including `0`, `false`, etc.)
            }
        }
        else {
            metaStr = safeStringify(splat); // Serialize multiple splat elements
        }
    }
    else if (Object.keys(meta).length > 0) {
        metaStr = safeStringify(meta); // Ensure all metadata is serialized
    }
    return `${timestamp} [${level} ${reqIdStr}]: ${message} ${metaStr ? `${metaStr}` : ''}`;
});
// Create the base logger
baseLogger = winston_1.default.createLogger({
    level: 'info', // Set the log level
    format: winston_1.default.format.combine(winston_1.default.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }), // Human-readable timestamp
    formatter),
    transports: [
        // Console transport for colorized logs
        new winston_1.default.transports.Console({
            format: winston_1.default.format.combine(winston_1.default.format.colorize(), formatter),
        }),
        // Daily Rotate File transport for JSON logs
        new winston_daily_rotate_file_1.default({
            filename: path_1.default.join(logDirectory, 'output-%DATE%.log'),
            datePattern: 'YYYY-MM-DD', // Rotate files daily
            zippedArchive: false, // Compress old logs
            maxSize: '50m', // Maximum size of each log file
            maxFiles: '7d', // Retain logs for 14 days
        }),
    ],
});
baseLogger.info("Logger Initialized");
baseLogger.info(`Logs Directory: [${logDirectory}]`);
// Function to create a child logger
const createChildLogger = (metadata) => baseLogger.child(metadata);
exports.createChildLogger = createChildLogger;
exports.default = baseLogger;
