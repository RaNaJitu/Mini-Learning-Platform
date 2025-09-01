"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerUiConfig = exports.swaggerConfig = void 0;
exports.swaggerConfig = {
    swagger: {
        info: {
            title: "P636 API Service",
            description: "P63 swagger API",
            version: "0.1.0",
        },
        externalDocs: {
            url: "https://swagger.io",
            description: "Find more info here",
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
        // definitions: {
        //   WhiteLableUserAuth: loginUserBody,
        //   Wallet: getTransferWhitelabelBody,
        //   WhiteLabel: getWhiteLabelByIdResponse,
        //   Transaction:meQuery,
        // }
    },
};
exports.swaggerUiConfig = {
    routePrefix: "/swagger/docs",
    uiConfig: {
        docExpansion: "full",
        deepLinking: false,
    },
    staticCSP: false,
};
