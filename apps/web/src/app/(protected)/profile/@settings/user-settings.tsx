"use client";

import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Settings } from "@/types";
import { useSettings, useUpdateSettings } from "@/hooks/profile/useSettings";
import { useTheme } from "next-themes";

export const UserSettings: React.FC = ({}) => {
  const { setTheme } = useTheme();
  const { data } = useSettings();
  const { mutate: updateSettings } = useUpdateSettings();

  const [settings, setSettings] = React.useState<Settings>(data.data.settings);

  function handleSettingChange<T extends keyof Settings>(
    setting: T,
    value: Settings[T],
  ) {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [setting]: value,
    }));
  }

  function onThemeChange(value: string) {
    setTheme(value);
    handleSettingChange("theme", value as any);
  }

  function handleSaveSettings() {
    if (isSettingsChanged()) {
      updateSettings({
        autoSave: settings.autoSave,
        showOnlineStats: settings.showOnlineStats,
        sound: settings.sound,
        notification: settings.notification,
        theme: settings.theme,
      });
    }
  }

  function isSettingsChanged() {
    return JSON.stringify(settings) !== JSON.stringify(data.data.settings);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <SettingsIcon className="mr-2 h-5 w-5" />
          Game Settings
        </CardTitle>
        <CardDescription>Customize your gaming experience</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Theme */}
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="theme">Theme</Label>
            <p className="text-muted-foreground text-sm">
              Choose your preferred theme
            </p>
          </div>
          <Select value={settings.theme} onValueChange={onThemeChange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select a theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="sound-effects">Sound Effects</Label>
            <p className="text-muted-foreground text-sm">
              Play sound effects during games
            </p>
          </div>
          <Switch
            id="sound-effects"
            checked={settings.sound}
            onCheckedChange={(checked) => handleSettingChange("sound", checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="notifications">Notifications</Label>
            <p className="text-muted-foreground text-sm">
              Receive game notifications
            </p>
          </div>
          <Switch
            id="notifications"
            checked={settings.notification}
            onCheckedChange={(checked) =>
              handleSettingChange("notification", checked)
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="auto-save">Auto Save</Label>
            <p className="text-muted-foreground text-sm">
              Automatically save game progress
            </p>
          </div>
          <Switch
            id="auto-save"
            checked={settings.autoSave}
            onCheckedChange={(checked) =>
              handleSettingChange("autoSave", checked)
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="online-status">Show Online Status</Label>
            <p className="text-muted-foreground text-sm">
              Let others see when you are online
            </p>
          </div>
          <Switch
            id="online-status"
            checked={settings.showOnlineStats}
            onCheckedChange={(checked) =>
              handleSettingChange("showOnlineStats", checked)
            }
          />
        </div>

        {isSettingsChanged() ? (
          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={() => setSettings(data.data.settings)}
            >
              Discard Changes
            </Button>
            <Button
              onClick={handleSaveSettings}
              disabled={!isSettingsChanged()}
              className=""
            >
              Save Settings
            </Button>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};
