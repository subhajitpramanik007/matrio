import { SuccessResponse } from '../response';

export abstract class BaseController {
  /**
   * If T is object use as data
   * If T is string use as message
   */
  protected success<T extends object | string>(
    value: T,
    message?: string,
    success: boolean = true,
  ) {
    if (typeof value === 'string') {
      return new SuccessResponse(undefined, value as string, success);
    }

    return new SuccessResponse(value, message, success);
  }
}
