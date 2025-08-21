import { PipeTransform, ArgumentMetadata, BadRequestException, Injectable } from '@nestjs/common';
import type { ZodSchema } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: any, _metadata: ArgumentMetadata) {
    const parsedValue = this.schema.safeParse(value);
    if (!parsedValue.success) {
      const errMsg = parsedValue.error.issues[0].message || 'Validation failed';
      throw new BadRequestException(errMsg);
    }
    return parsedValue.data;
  }
}
