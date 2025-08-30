"use client";

import Link from "next/link";

import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function QuickActionsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
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
    </motion.div>
  );
}
