"use client";

import * as React from "react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Profile } from "@/types";
import { Calendar, CameraIcon, Clock, User2Icon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export function ProfileInfo({
  profileData,
  hoursPlayed,
  onSaveProfile,
}: {
  profileData: Profile;
  hoursPlayed: number;
  onSaveProfile: () => void;
}) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [profile, setProfile] = React.useState({
    ...profileData,
  });

  const handleSave = () => {
    onSaveProfile();
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Profile Information</CardTitle>
          <Button
            variant={isEditing ? "default" : "outline"}
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-6">
          {/* Profile Picture */}
          <div className="relative">
            <Avatar className="ring-muted bg-muted-foreground h-24 w-24 ring-1">
              <AvatarImage
                src={profile.avatar || "/placeholder.svg"}
                alt={profile.name || "Guest"}
              />
              <AvatarFallback>
                <User2Icon className="size-8" />
              </AvatarFallback>
            </Avatar>
            {isEditing && (
              <Button
                size="sm"
                className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full p-0"
                variant="secondary"
              >
                <CameraIcon className="h-4 w-4" />
              </Button>
            )}
          </div>

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
                      name: e.target.value,
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
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
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
