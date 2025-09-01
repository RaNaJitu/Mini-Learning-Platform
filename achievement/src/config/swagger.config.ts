import { SwaggerOptions } from "@fastify/swagger";
import { FastifySwaggerUiOptions } from "@fastify/swagger-ui";

export const swaggerConfig: SwaggerOptions = {
  swagger: {
    info: {
      title: "Lesson Service API",
      description: "API documentation for the Lesson Service",
      version: "1.0.0",
    },
    externalDocs: {
      url: "https://swagger.io",
      description: "Development server",
    },
    consumes: ["application/json"],
    produces: ["application/json"],
    schemes: ['http', 'https'],
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
        description: "Enter your bearer token in the format **Bearer &lt;token&gt;**"
      }
    },
    //  security: [{ bearerAuth: [] }],
   
  },
};

export const swaggerUiConfig:FastifySwaggerUiOptions ={
  routePrefix: "/swagger/docs",
  uiConfig: {
    docExpansion: "full",
    deepLinking: false,
  },
  staticCSP: false,
}
