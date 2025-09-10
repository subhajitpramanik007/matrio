"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Profile } from "@/types";

export function WelcomeSection({ profileData }: { profileData: Profile }) {
  return (
    <div className="mb-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl">
            Welcome back,{" "}
            <span className="font-bold">{profileData.username}!</span>
          </h1>
          <p className="text-muted-foreground">
            Ready for another gaming session?
          </p>
        </div>
        <Badge variant="secondary" className="px-4 py-2 text-lg">
          Level {profileData.xpInfo.level}
        </Badge>
      </div>

      {/* XP Progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium">Experience Points</span>
            <span className="text-muted-foreground text-sm">
              {profileData.xpInfo.xp} / {profileData.xpInfo.xpToNext} XP
            </span>
          </div>
          <Progress
            value={(profileData.xpInfo.xp / profileData.xpInfo.xpToNext) * 100}
            className="h-2"
          />
        </CardContent>
      </Card>
    </div>
  );
}
