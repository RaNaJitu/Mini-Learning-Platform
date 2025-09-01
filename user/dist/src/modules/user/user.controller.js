"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_PROFILE = void 0;
const config_1 = require("../../../config");
const auth_services_1 = require("../auth/auth.services");
const helper_1 = require("./helper");
const notfound_exception_1 = require("../../exception/notfound.exception");
//#region user profile
const USER_PROFILE = async (request, reply) => {
    try {
        let auth_user = (0, helper_1.getDataFromRequestContext)(request, "data");
        const userData = await (0, auth_services_1.findUserByEmail)(auth_user.email);
        if (!userData) {
            throw new notfound_exception_1.NotFoundException(config_1.fmt.formatError({
                message: "user not found!",
                description: "user not found!",
            }));
        }
        reply
            .status(200)
            .send(config_1.fmt.formatResponse(userData, "User Profile Fetched Successfully!"));
    }
    catch (error) {
        console.log(error);
        return reply.code(500).send(error);
    }
};
exports.USER_PROFILE = USER_PROFILE;
//#endregion
