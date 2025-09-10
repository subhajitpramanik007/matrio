"use client";

import * as React from "react";
import { Profile } from "@/types";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DisplayThis } from "@/components/DisplayThis";
import { ButtonLoader } from "@/components/ButtonLoader";
import { Calendar, CameraIcon, Clock, User2Icon } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { AvatarsSheet } from "./avatars-sheet";

import { useUpdateProfile } from "@/hooks/profile/useUpdateProfile";
import { useAvatars, useUpdateAvatar } from "@/hooks/profile/useAvatar";

export function ProfileInfo({
  profileData,
  hoursPlayed,
}: {
  profileData: Profile;
  hoursPlayed: number;
  onSaveProfile: () => void;
}) {
  const { onSaveProfile, isPending, isError } = useUpdateProfile();
  const [isEditing, setIsEditing] = React.useState(false);
  const [profile, setProfile] = React.useState({
    ...profileData,
  });

  const isSame = () => JSON.stringify(profile) === JSON.stringify(profileData);

  const handleSave = () => {
    if (isSame()) {
      setIsEditing(false);
      return;
    }

    onSaveProfile({
      name: profile.name,
      bio: profile.bio,
      username: profile.username,
    });

    if (isError) {
      setProfile({ ...profileData });
      return;
    }
    setIsEditing(false);
  };

  function handleDiscard() {
    setProfile({ ...profileData });
    setIsEditing(false);
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Profile Information</CardTitle>
          <DisplayThis when={!isEditing}>
            <Button variant={"outline"} onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          </DisplayThis>
          <DisplayThis when={isEditing}>
            <div className="flex gap-3">
              <Button
                variant="destructive"
                onClick={handleDiscard}
                disabled={isPending}
              >
                Discard Changes
              </Button>
              <Button onClick={handleSave} disabled={isPending || isSame()}>
                <ButtonLoader isLoading={isPending} />
                Save Changes
              </Button>
            </div>
          </DisplayThis>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-6">
          {/* Profile Picture */}
          <UserAvatar avatar={profile.avatar} />

          {/* Profile Details */}
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={profile.username ?? ""}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email ?? ""}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Display Name</Label>
          <Input
            id="name"
            value={profile.name ?? ""}
            onChange={(e) =>
              setProfile((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            disabled={!isEditing}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={profile.bio}
            onChange={(e) =>
              setProfile((prev) => ({
                ...prev,
                bio: e.target.value,
              }))
            }
            disabled={!isEditing}
            rows={3}
          />
        </div>

        <div className="text-muted-foreground flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>
              Joined {new Date(profile.joinDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{hoursPlayed} hours played</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function UserAvatar({ avatar }: { avatar: Profile["avatar"] }) {
  const { updateAvatar, openAvatarSheet, setOpenAvatarSheet } =
    useUpdateAvatar();

  const { data: avatars } = useAvatars(openAvatarSheet);

  return (
    <div className="relative">
      <Avatar className="ring-muted bg-muted-foreground h-24 w-24 ring-1">
        <AvatarImage src={avatar || "/avatar1.png"} alt={"avatar"} />
        <AvatarFallback>
          <User2Icon className="size-8" />
        </AvatarFallback>
      </Avatar>
      <AvatarsSheet
        onSelect={updateAvatar}
        avatars={avatars}
        open={openAvatarSheet}
        onOpenChange={setOpenAvatarSheet}
        currentAvatarUrl={avatar}
      >
        <Button
          size="sm"
          className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full p-0"
          variant="secondary"
        >
          <CameraIcon className="h-4 w-4" />
        </Button>
      </AvatarsSheet>
    </div>
  );
}
