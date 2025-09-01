"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = void 0;
const badrequest_exception_1 = require("../exception/badrequest.exception");
const config_1 = require("../../config");
const validator = (validators) => {
    return ({ httpPart }) => {
        return (data) => {
            if (httpPart === "params" && validators.params)
                return check(validators.params, data);
            if (httpPart === "body" && validators.body)
                return check(validators.body, data);
            if (httpPart === "querystring" && validators.queryString)
                return check(validators.queryString, data);
            return { value: data };
        };
    };
};
exports.validator = validator;
function check(schema, data) {
    const result = schema.safeParse(data);
    console.log(result.success);
    if (result.success)
        return { value: result.data };
    else {
        console.log(JSON.parse(result.error.message.replace(/\\n/g, "").replace(/\\/g, ""))[0]);
        const message = JSON.parse(result.error.message.replace(/\\n/g, "").replace(/\\/g, ""))[0].message;
        console.log(message);
        return {
            error: new badrequest_exception_1.BadRequestException(config_1.fmt.formatError({
                status: 400,
                code: "E400",
                message,
                data: result.error.flatten(),
            })),
        };
    }
}
