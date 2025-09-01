"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const fastify_1 = require("fastify");
const request_context_1 = __importDefault(require("@fastify/request-context"));
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const autoload_1 = __importDefault(require("@fastify/autoload"));
const cors_1 = __importDefault(require("@fastify/cors"));
const path_1 = __importDefault(require("path"));
const swagger_config_1 = require("../config/swagger.config");
exports.app = (0, fastify_1.fastify)({ logger: false });
// Healthcheck Route
exports.app.get("/healthz", async () => ({ ok: true, service: "USER" }));
exports.app.get("/readyz", async () => ({ ok: true, service: "USER READY" }));
async function main() {
    const PORT = process.env.PORT || 3001;
    const HOST = process.env.HOST || "0.0.0.0";
    // Register plugins
    exports.app.register(request_context_1.default, { defaultStoreValues: { data: "" } });
    exports.app.register(swagger_1.default, swagger_config_1.swaggerConfig);
    exports.app.register(swagger_ui_1.default, swagger_config_1.swaggerUiConfig);
    exports.app.register(cors_1.default, {
        origin: "*",
        credentials: false,
        exposedHeaders: ["X-Access-Token"],
    });
    exports.app.register(autoload_1.default, {
        dir: path_1.default.join(__dirname, "modules"),
        options: { prefix: "/api/v1" },
    });
    await exports.app.ready();
    exports.app.swagger();
    try {
        await exports.app.listen({ port: Number(PORT), host: HOST });
        console.log(`Server ready at http://${HOST}:${PORT}/healthz`);
    }
    catch (e) {
        console.error(`Error starting User server: ${e.stack || e}`);
    }
}
main();
