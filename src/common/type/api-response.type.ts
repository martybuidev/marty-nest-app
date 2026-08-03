export interface IApiSuccessResponse<T = unknown> {
  statusCode: number;
  message: string;
  data: T;
}

export interface IApiErrorResponse {
  statusCode: number;
  message: string | string[];
  error: string;
}

export type IApiResponse<T = unknown> =
  IApiSuccessResponse<T> | IApiErrorResponse;
