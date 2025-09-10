import { Exclude } from 'class-transformer';

export class ResponseDto {
  @Exclude()
  message?: string;
}
