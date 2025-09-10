import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function QuickActionsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <Link href="/leaderboard">
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
              >
                View Leaderboard
              </Button>
            </Link>
          </div>
          <div>
            <Link href="/profile">
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
              >
                Edit Profile
              </Button>
            </Link>
          </div>
          <div>
            <Button
              variant="outline"
              className="w-full justify-start bg-transparent"
            >
              Invite Friends
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default QuickActionsCard;
