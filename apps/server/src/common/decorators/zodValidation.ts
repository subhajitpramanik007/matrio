import { applyDecorators } from '@nestjs/common';
import { Body, Query, Param } from '@nestjs/common';
import { ZodAny, ZodObject, ZodSchema } from 'zod';
import { ZodValidationPipe } from '../pipes';

// Generic factory
function createZodDecorator(paramDecorator: any) {
  return (schema: ZodSchema): ParameterDecorator =>
    (target, propertyKey, parameterIndex) => {
      paramDecorator(new ZodValidationPipe(schema))(target, propertyKey, parameterIndex);
    };
}

// Specific shortcuts
export const ZodBody = createZodDecorator(Body);
export const ZodQuery = createZodDecorator(Query);
export const ZodParam = createZodDecorator(Param);
