import { User } from '@matrio/db';

export type UserJWTPayload = Omit<User, 'userPassword' | 'createdAt' | 'updatedAt'> & {
  sub: string;
};
