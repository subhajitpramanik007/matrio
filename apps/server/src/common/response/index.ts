export class ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;

  constructor(data: T, message?: string, success: boolean = true) {
    this.data = data;
    this.success = success;
    if (message) this.message = message;
  }
}

export class SuccessResponse<T> extends ApiResponse<T> {
  constructor(data: T, message?: string, success: boolean = true) {
    super(data, message, success);
  }
}

function successResponse<T>(data: T, message?: string, success: boolean = true) {
  return new SuccessResponse(data, message, success);
}

export { successResponse };
