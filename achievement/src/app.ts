import { fastify, FastifyRequest, FastifyReply } from "fastify";
import fastifyRequestContext from "@fastify/request-context";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import Autoload from "@fastify/autoload";
import cors from "@fastify/cors";
import path from "path";
import { swaggerConfig, swaggerUiConfig } from "./config/swagger.config";
export const app = fastify({ logger:false });

// Healthcheck Route
app.get("/healthz", async () => ({ ok: true, service: "Achievement Server On" }));
app.get("/readyz", async () => ({ ok: true, service: "Achievement READY" }));

async function main() {
  
  const PORT = process.env.PORT || 3003;
  const HOST = process.env.HOST || "0.0.0.0";

  // Register plugins
  app.register(fastifyRequestContext, { defaultStoreValues: { data: "" } });
  app.register(fastifySwagger, swaggerConfig);
  app.register(fastifySwaggerUi, swaggerUiConfig);

  app.register(cors, {
    origin: "*",
    credentials: false,
    exposedHeaders: ["X-Access-Token"],
  });

  app.register(Autoload, {
    dir: path.join(__dirname, "modules"),
    options: { prefix: "/api/v1" },
  });


   
  await app.ready();

  try {
    await app.listen({ port: Number(PORT), host: HOST });
    console.log(`Server ready at http://${HOST}:${PORT}/healthz`);
  } catch (e: any) {
    console.error(`Error starting User server: ${e.stack || e}`);
  }

  // try {
  //   await app.listen({ port: Number(PORT), host: HOST });
  //   baseLogger.info(`Server ready at http://${HOST}:${PORT}/healthcheck`);
  // } catch (e: any) {
  //   baseLogger.error(`Error starting User server: ${e.stack || e}`);
  // }

 

}

main();