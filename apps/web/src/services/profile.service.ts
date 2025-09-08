import {
  AchievementsData,
  IGameStatsData,
  IProfileData,
  IProfileDataWithSettings,
  ISettingsResponse,
} from "@/types";
import { ApiClient } from "./api.service";
import { delay } from "@/lib/utils";

export class ProfileService extends ApiClient {
  async getMyProfile() {
    return this.get<IProfileDataWithSettings>("/profile/me");
  }

  async getProfile(id: string) {
    return this.get<IProfileData>(`/profile/${id}`);
  }

  async getAchievements() {
    return this.get<AchievementsData>("/profile/me/achievements");
  }

  async getSettings() {
    return this.get<ISettingsResponse>("/profile/me/settings");
  }

  async getStats() {
    return this.get<{ stats: IGameStatsData }>("/profile/me/stats");
  }
}

export const profileService = new ProfileService({});
