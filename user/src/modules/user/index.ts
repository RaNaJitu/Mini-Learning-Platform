import { FastifyInstance } from "fastify";
import userRoutes from "./user.route";

export default async (fastify: FastifyInstance) => {
  for (const route of userRoutes) {
    if (Array.isArray(route.preHandler)) {
      route.preHandler = [...route.preHandler];
    }
    fastify.route(route);
  }
};
