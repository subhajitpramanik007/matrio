import { Avatar, Profile, User } from '@matrio/db';
import { Expose, Type, Transform } from 'class-transformer';

export class AvatarDto {
  @Expose()
  id: Avatar['id'];

  @Expose()
  name: Avatar['name'];

  @Expose()
  url: Avatar['url'];
}

export class XpDto {
  @Expose()
  level: number;

  @Expose()
  xpRequired: number;

  @Expose()
  xpToNext: number;
}

export class ProfileDto {
  @Expose()
  name: string;

  @Expose()
  bio: string;

  @Expose()
  favoriteGame: string;

  @Expose()
  joinDate: string;

  @Expose()
  level: number;

  @Expose()
  xp: number;

  @Expose()
  rank: number;

  @Expose()
  @Type(() => XpDto)
  xpInfo: XpDto;
}

export class UserDto {
  @Expose()
  id: User['id'];

  @Expose()
  username: User['username'];

  @Expose()
  email: User['email'];

  @Expose()
  role: User['role'];

  @Expose()
  @Type(() => AvatarDto)
  avatar: AvatarDto;

  @Expose()
  createdAt: User['createdAt'];

  // Spread profile key values
  @Expose()
  name: Profile['name'];

  @Expose()
  level: Profile['level'];

  @Expose()
  coins: Profile['coins'];
}

export class GuestUserDto {
  @Expose()
  id: User['id'];

  @Expose()
  username: User['username'];

  @Expose()
  role: User['role'];

  @Expose()
  @Type(() => AvatarDto)
  avatar: AvatarDto;
}
