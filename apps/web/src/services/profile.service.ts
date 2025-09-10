"use client";

import {
  AchievementsData,
  IGameStatsData,
  IProfileData,
  IProfileDataWithSettings,
  IProfileRecentActivity,
  ISettingsResponse,
} from "@/types";
import { ApiClient } from "./api.service";

import {
  type TUpdateProfile,
  type TUpdateSettings,
} from "@matrio/shared/schemas/profile.schemas";

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

  async getGameActivities() {
    return this.get<IProfileRecentActivity>("/profile/me/game-history");
  }

  // Update
  async updateProfile(values: TUpdateProfile) {
    return this.patch(`/profile/me`, values);
  }

  async updateSettings(values: TUpdateSettings) {
    return this.patch(`/profile/me/settings`, values);
  }

  async updateAvatar(avatarId: number) {
    return this.patch(`/profile/me/avatar`, { avatarId });
  }
}

export const profileService = new ProfileService({});
