export interface IApiSuccessResponse<T = unknown> {
  success: true;
  statusCode: number;
  message: string;
  data: T;
}

export interface IApiErrorResponse {
  success: false;
  statusCode: number;
  message: string | string[];
  error: string;
}

export type IApiResponse<T = unknown> =
  IApiSuccessResponse<T> | IApiErrorResponse;
