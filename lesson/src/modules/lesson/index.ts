import { FastifyInstance } from "fastify";
import lessonRoutes from "./lesson.route";

export default async (fastify: FastifyInstance) => {
  for (const route of lessonRoutes) {
    if (Array.isArray(route.preHandler)) {
      route.preHandler = [...route.preHandler];
    }
    fastify.route(route);
  }
};
