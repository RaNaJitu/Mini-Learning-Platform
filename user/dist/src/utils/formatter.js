"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePagination = exports.formatResponse = exports.handleError = exports.paginateResponse = void 0;
const config_1 = require("../../config");
const badrequest_exception_1 = require("../exception/badrequest.exception");
class Formatter {
    formatError = (error) => {
        const status = error.status || 500;
        const message = error.message || "Something went wrong";
        const code = error.code || "E500";
        const data = error.data || null;
        // const status_code = error.status_code || 500;
        const success = false;
        const description = error.description || "Unexpected Error occurred Try Again!";
        console.log(error);
        return {
            status,
            message,
            data,
            success,
            code,
            // status_code,
            description,
        };
    };
    formatResponse = (result, message, description) => {
        let data = null;
        let success = false;
        const code = "S200";
        data = result;
        success = true;
        const response = {
            data,
            message: message ? message : "",
            success,
            code,
        };
        // console.log("=============== ~ Formatter ~ response:", response.data)
        // console.log(response)
        return response;
    };
    getSwaggerResponse = (data) => {
        return {
            data,
            message: { type: "string" },
            success: { type: "boolean" },
            code: { type: "string" },
        };
    };
    getSwaggerErrorResponse = (errorCode, description) => {
        return {
            description,
            type: "object",
            properties: {
                statusCode: {
                    type: "number",
                    enum: [errorCode],
                },
                code: { type: "string" },
                error: { type: "string" },
                message: { type: "string" },
                description: { type: "string" },
            },
        };
    };
}
const paginateResponse = (page, perPage, totalCount, data) => {
    const totalPages = Math.ceil(totalCount / perPage);
    return {
        currentPage: page,
        perPage,
        totalPages,
        totalRecords: totalCount,
        data,
    };
};
exports.paginateResponse = paginateResponse;
const handleError = (error, message) => {
    console.error(message, error);
    throw new badrequest_exception_1.BadRequestException(config_1.fmt.formatError({
        message: message,
        description: error.message || "An error occurred.",
    }));
};
exports.handleError = handleError;
const formatResponse = (data, message) => {
    return config_1.fmt.formatResponse(data, message);
};
exports.formatResponse = formatResponse;
const handlePagination = (query) => ({
    page: query.page || 1,
    perPage: query.perPage || 10,
    fieldname: query.fieldname || "id",
    order: query.order || "desc",
});
exports.handlePagination = handlePagination;
exports.default = Formatter;
