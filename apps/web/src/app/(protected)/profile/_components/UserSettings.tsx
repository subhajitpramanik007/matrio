"use client";

import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IProfileSettings } from "@/types";

interface UserSettingsProps {
  settings: IProfileSettings;
  handleSettingChange: (
    setting: keyof IProfileSettings,
    value: boolean,
  ) => void;
}

export const UserSettings: React.FC<UserSettingsProps> = ({
  settings,
  handleSettingChange,
}) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="mr-2 h-5 w-5" />
            Game Settings
          </CardTitle>
          <CardDescription>Customize your gaming experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="sound-effects">Sound Effects</Label>
              <p className="text-muted-foreground text-sm">
                Play sound effects during games
              </p>
            </div>
            <Switch
              id="sound-effects"
              checked={settings.soundEffects}
              onCheckedChange={(checked) =>
                handleSettingChange("soundEffects", checked)
              }
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
              checked={settings.notifications}
              onCheckedChange={(checked) =>
                handleSettingChange("notifications", checked)
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
              checked={settings.showOnlineStatus}
              onCheckedChange={(checked) =>
                handleSettingChange("showOnlineStatus", checked)
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Actions</CardTitle>
          <CardDescription>Manage your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full justify-start bg-transparent"
          >
            Change Password
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start bg-transparent"
          >
            Export Game Data
          </Button>
          <Button variant="destructive" className="w-full justify-start">
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
