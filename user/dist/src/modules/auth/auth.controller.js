"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOGIN = exports.REGISTER_USER = void 0;
const config_1 = require("../../../config");
const auth_services_1 = require("./auth.services");
const custom_exception_1 = require("../../exception/custom.exception");
const jwt_1 = require("../../utils/jwt");
const hash_1 = require("../../utils/hash");
const forbidden_exception_1 = require("../../exception/forbidden.exception");
//#region REGISTER USER
const REGISTER_USER = async (request, reply) => {
    try {
        const { email } = request.body;
        const exists = await (0, auth_services_1.findUserByEmail)(email);
        if (exists) {
            throw new custom_exception_1.CustomException(config_1.fmt.formatError({
                status: 409,
                message: "Email is already exists",
                code: "E409",
            }));
        }
        const createUser = await (0, auth_services_1.RegisterUser)(request.body);
        reply
            .status(200)
            .send(config_1.fmt.formatResponse(createUser, "User Registration Successful!"));
    }
    catch (error) {
        console.log(error);
        return reply.code(500).send(error);
    }
};
exports.REGISTER_USER = REGISTER_USER;
//#endregion
//#region LOGIN
const LOGIN = async (request, reply) => {
    try {
        const { email, password } = request.body;
        const user = await (0, auth_services_1.findUserByEmail)(email);
        if (!user) {
            throw new Error("Invalid Email");
        }
        if (await (0, hash_1.verifyPassword)(password, user.password)) {
            throw new forbidden_exception_1.ForbiddenException(config_1.fmt.formatError({
                message: "Invalid Password!",
                description: "Invalid Password!",
            }));
        }
        const data = {
            id: user.id,
            email: user.email,
            role: user.role,
        };
        let accessToken = await (0, jwt_1.signJwt)({
            data,
        });
        reply.status(200).send(config_1.fmt.formatResponse({ accessToken, ...data }, "Login Successful!"));
    }
    catch (error) {
        console.log(error);
        return reply.code(500).send(error);
    }
};
exports.LOGIN = LOGIN;
//#endregion
