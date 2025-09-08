export interface IProfile {
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  joinDate: string;
  level: number;
  xp: number;
  xpToNext: number;
}

export interface IProfileSettings {
  soundEffects: boolean;
  notifications: boolean;
  autoSave: boolean;
  darkMode: boolean;
  showOnlineStatus: boolean;
}

export interface IProfileDataWithSettings {
  profile: Profile;
  settings: Settings;
}

export interface ISettingsResponse {
  settings: Settings;
}

export interface IProfileData {
  profile: Profile;
}

export interface Profile {
  id: string;
  userId: string;
  name: string | null;
  email: string;
  username: string;
  bio: string;
  coins: number;
  joinDate: Date;
  lastOnline: Date;
  rank: number;
  favoriteGame: string | null;
  avatar: string;
  xpInfo: XPInfo;
}

export interface XPInfo {
  xp: number;
  level: number;
  xpRequired: number;
  xpToNext: number;
}

export interface Settings {
  theme: "light" | "dark" | "system";
  locale: string;
  sound: boolean;
  autoSave: boolean;
  showOnlineStats: boolean;
  notification: boolean;
}

// Achievements
export interface AchievementsData {
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  condition: Condition;
  imageUrl: string | null;
  type: string;
  gameName: string | null;
  reward: Reward;
  unlocked: boolean;
  unlockedAt: Date | null;
  progress: number;
  completedCondition: Condition | null;
}

export interface Condition {
  type: string;
  value: number;
}

export interface Reward {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  coins: number;
  avatarId: number | null;
  xp: number;
  xpMultiplierAdd: XPMultiplierAdd | null;
  type: string | null;
}

export interface XPMultiplierAdd {
  value: number;
  expirationLimit?: number;
  isPermanent?: boolean;
}
