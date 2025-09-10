import { ApiClient } from "./api.service";

export interface IAvatar {
  id: number;
  name: string;
  url: string;
}

class AvatarService extends ApiClient {
  getAvatars() {
    return this.get<{ avatars: IAvatar[] }>("/avatars");
  }
}

export const avatarService = new AvatarService({});
