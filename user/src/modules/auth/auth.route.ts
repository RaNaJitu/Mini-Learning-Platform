import { API_METHODS } from "../../interfaces/api.interface";
import { IRouteOptions } from "../../interfaces/fatstify.interface";
import { validator } from "../../utils/validator";
import { loginUserBodySchema, registerUserBodySchema } from "../auth/auth.validation";

import { LOGIN, REGISTER_USER } from "../auth/auth.controller";
import { loginSchema, registerSchema } from "./auth.schema";

const AuthRoutes: IRouteOptions<{
    Params: any;
    Body: any;
    Querystring: any;
}>[] = [
    {
        url: "/register",
        handler: REGISTER_USER,
        schema: registerSchema,
        validatorCompiler: validator({
            body: registerUserBodySchema,
        }),
        method: API_METHODS.POST,
    },
    {
        url: "/login",
        handler: LOGIN,
        schema: loginSchema,
        validatorCompiler: validator({
            body: loginUserBodySchema,
        }),
        method: API_METHODS.POST,
    },
    
];

export default AuthRoutes;
