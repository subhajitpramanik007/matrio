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
