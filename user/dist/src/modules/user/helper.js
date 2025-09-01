"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataFromRequestContext = getDataFromRequestContext;
const badrequest_exception_1 = require("../../exception/badrequest.exception");
const config_1 = require("../../../config");
function getDataFromRequestContext(request, key) {
    const data = request.requestContext.get(key);
    if (!data) {
        throw new badrequest_exception_1.BadRequestException(config_1.fmt.formatError({ message: `${key} not found in request context` }));
    }
    return data?.data;
}
