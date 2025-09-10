import { ResponseDto } from '@/common/response/response.dto';
import { Profile, User, XpLevel, UserSettings } from '@matrio/db';
import { Expose, Type } from 'class-transformer';

export class ProfileDto {
  @Expose()
  id: Profile['id'];

  @Expose()
  userId: User['id'];

  @Expose()
  name: Profile['name'];

  @Expose()
  email: User['email'];

  @Expose()
  username: User['username'];

  @Expose()
  bio: Profile['bio'];

  @Expose()
  coins: Profile['coins'];

  @Expose()
  joinDate: Profile['joinDate'];

  @Expose()
  lastOnline: Profile['lastOnline'];

  @Expose()
  rank: Profile['rank'];

  @Expose()
  favoriteGame: Profile['favoriteGame'];

  @Expose()
  avatar?: string;

  @Expose()
  xpInfo: {
    level: Profile['level'];
    xp: Profile['xp'];
    xpRequired: XpLevel['xpRequired'];
    xpToNext: XpLevel['xpToNext'];
  };
}

export class Settings {
  @Expose()
  theme: UserSettings['theme'];

  @Expose()
  locale: UserSettings['locale'];

  @Expose()
  sound: UserSettings['sound'];

  @Expose()
  autoSave: UserSettings['autoSave'];

  @Expose()
  showOnlineStats: UserSettings['showOnlineStats'];

  @Expose()
  notification: UserSettings['notification'];
}

export class ProfileResponseDto extends ResponseDto {
  @Expose()
  @Type(() => ProfileDto)
  profile: ProfileDto;
}

export class ProfileWithSettingsResponseDto extends ProfileResponseDto {
  @Expose()
  @Type(() => Settings)
  settings: Settings;
}

export class SettingsDto extends ResponseDto {
  @Expose()
  @Type(() => Settings)
  settings: Settings;
}
