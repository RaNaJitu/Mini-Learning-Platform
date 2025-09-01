import Fastify from "fastify";
import * as dotenv from "dotenv";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import rateLimit from "@fastify/rate-limit";
import replyFrom from "@fastify/reply-from";
import { routeAwareGuard } from "./auth";
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

dotenv.config();
const app = Fastify({ logger: true });


// Healthcheck Route
app.get("/healthcheck", async (request, reply) => {
    reply.send({ hello: "Gateway Server On" });
});

async function main() {
    await app.register(swagger, {
        openapi: { info: { title: "API Gateway", version: "0.1.0" } },
    });
    await app.register(swaggerUi, { routePrefix: "/docs" });
    await app.register(rateLimit, {
        max: Number(process.env.RATE_LIMIT_MAX || 200),
        timeWindow: process.env.RATE_LIMIT_TIME_WINDOW || "1 minute",
    });
    await app.register(replyFrom);

    app.get("/healthz", async () => ({ ok: true }));
    app.get("/readyz", async () => ({ ready: true }));

    const USER = process.env.USER_SVC_URL || "http://user:3001";
    const LESSON = process.env.LESSON_SVC_URL || "http://lesson:3002";
    const ACH =
        process.env.ACHIEVEMENT_SVC_URL || "http://achievement:3003";


    // app.addHook("preHandler", routeAwareGuard);
    app.addHook("onRequest", async (req) => {
        req.log.info(
            { originalUrl: req.raw.url, method: req.method },
            "incoming====>"
        );
    });


    // helper: mount a proxy that strips the prefix and keeps the rest (incl. query)
    function mountPrefix(app: any, prefix: string, target: string) {
    
    app.all(prefix, async (req: FastifyRequest, reply: FastifyReply) => {
        const search = req.raw.url && req.raw.url.includes("?")
        ? req.raw.url.slice(req.raw.url.indexOf("?"))
        : "";
        const url = `${target}/` + search;
        req.log.info({ original: req.raw.url, proxyTo: url }, "proxy");
        return reply.from(url);
    });

    // /users/* → target + "/*"
    app.all(`${prefix}/*`, async (req: FastifyRequest, reply: FastifyReply) => {
        const tail = (req.params as any)["*"] || "";
        const search = req.raw.url && req.raw.url.includes("?")
        ? req.raw.url.slice(req.raw.url.indexOf("?"))
        : "";
        const url = `${target}/${tail}${search}`;
        req.log.info({ original: req.raw.url, tail, proxyTo: url }, "proxy");
        return reply.from(url);
    });
    }

    // mount dynamic prefixes
    mountPrefix(app, "/users",        USER);
    mountPrefix(app, "/lessons",      LESSON);
    mountPrefix(app, "/achievements", ACH);

    const port = Number(process.env.PORT || 3000);
    app.listen({ port, host: "0.0.0.0" }).catch((err) => {
        app.log.error(err);
        process.exit(1);
    });
}

main();
