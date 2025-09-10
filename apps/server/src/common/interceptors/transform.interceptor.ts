import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { plainToInstance } from 'class-transformer';
import { SuccessResponse } from '../response';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(
        (data) =>
          new SuccessResponse(
            plainToInstance(this.dto, data, {
              excludeExtraneousValues: true,
            }),
            data?.message,
          ),
      ),
    );
  }
}
