"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_interface_1 = require("../../interfaces/api.interface");
const validator_1 = require("../../utils/validator");
const auth_validation_1 = require("../auth/auth.validation");
const auth_controller_1 = require("../auth/auth.controller");
const auth_schema_1 = require("./auth.schema");
const AuthRoutes = [
    {
        url: "/register",
        handler: auth_controller_1.REGISTER_USER,
        schema: auth_schema_1.registerSchema,
        validatorCompiler: (0, validator_1.validator)({
            body: auth_validation_1.registerUserBodySchema,
        }),
        method: api_interface_1.API_METHODS.POST,
    },
    {
        url: "/login",
        handler: auth_controller_1.LOGIN,
        schema: auth_schema_1.loginSchema,
        validatorCompiler: (0, validator_1.validator)({
            body: auth_validation_1.loginUserBodySchema,
        }),
        method: api_interface_1.API_METHODS.POST,
    },
];
exports.default = AuthRoutes;
