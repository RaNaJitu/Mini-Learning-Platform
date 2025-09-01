import { CustomErrorParams } from "../interfaces/error.interface";

export class CustomException extends Error {
  public status: number = 500;
  public message: string = "Something went wrong";
  public code: string = "E500";
  constructor(params: CustomErrorParams) {
    super(params.message);
    this.status = params.status;
    this.code = params.code;
    this.message = params.message;
  }
}
