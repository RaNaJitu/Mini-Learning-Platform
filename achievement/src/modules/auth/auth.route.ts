import { API_METHODS } from "../../interfaces/api.interface";
import { IRouteOptions } from "../../interfaces/fatstify.interface";

import {
  LOGIN,
  
} from "../auth/auth.controller";

const AuthRoutes: IRouteOptions<{
  Params: any;
  Body: any;
  Querystring: any;
}>[] = [
  {
    url: "/login",
    handler: LOGIN,
    // schema: loginSchema,
    method: API_METHODS.GET,
  },
  
];

export default AuthRoutes;
