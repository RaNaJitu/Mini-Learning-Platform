"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_interface_1 = require("../../interfaces/api.interface");
const user_controller_1 = require("./user.controller");
const middleware_1 = require("../../middleware");
const user_schema_1 = require("./user.schema");
const UserRoutes = [
    {
        url: "/me",
        handler: user_controller_1.USER_PROFILE,
        preHandler: [middleware_1.preUserHandler],
        schema: user_schema_1.userProfileSchema,
        method: api_interface_1.API_METHODS.GET,
    },
];
exports.default = UserRoutes;
