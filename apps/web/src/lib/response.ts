export class ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean = true;
  status: number;
  error?: never;
  constructor(status: number, data: T, message?: string) {
    this.data = data;
    this.message = message;
    this.status = status;
  }
}

export class ApiErrorResponse extends Error {
  success: boolean = false;
  error?: string;
  status: number = 500;
  data?: never;
  constructor(
    status: number,
    message?: string,
    error?: string,
    cause?: string,
  ) {
    super(message);
    this.error = error;
    this.status = status;
    if (cause) this.cause = cause;
  }
}

export type TResponse<T> = ApiResponse<T> | ApiErrorResponse;
