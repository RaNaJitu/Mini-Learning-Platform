import { fmt } from "../config";
import { BadRequestException } from "../exception/badrequest.exception";

class Formatter {
  public formatError = (error: any): any => {
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

  public formatResponse = (result: any, message?: string,description?:string): any => {
    let data: any = null;
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

  public getSwaggerResponse = (data: any) => {
    return {
      data,
      message: { type: "string" },
      success: { type: "boolean" },
      code: { type: "string" },
    };
  };
  public getSwaggerErrorResponse = (errorCode: number, description: string) => {
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
        description:{type:"string"},
      },
    };
  };
}


export interface Filters {
  page: number;
  perPage: number;
  fieldname: string;
  order: string;
}

export const paginateResponse = (page: number, perPage: number, totalCount: number, data: any) => {
  const totalPages = Math.ceil(totalCount / perPage);
  return {
    currentPage: page,
    perPage,
    totalPages,
    totalRecords: totalCount,
    data,
  };
};

export const handleError = (error: any, message: string) => {
  console.error(message, error);
  throw new BadRequestException(
    fmt.formatError({
      message: message,
      description: error.message || "An error occurred.",
    })
  );
};

export const formatResponse = (data: any, message: string) => {
  return fmt.formatResponse(data, message);
};

export const handlePagination = (query: Filters) => ({
  page: query.page || 1,
  perPage: query.perPage || 10,
  fieldname: query.fieldname || "id",
  order: query.order || "desc",
});




export default Formatter;
