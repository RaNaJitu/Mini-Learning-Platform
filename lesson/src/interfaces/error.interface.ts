export interface ErrorParams {
  status: number;
  message: string;
  code: string;
  data?: any;
  description:string;
}

export interface CustomErrorParams {
  status: number;
  message: string;
  code: string;
}
