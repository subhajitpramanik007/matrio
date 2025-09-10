"use client";

import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const AccountActions: React.FC = () => {
  return (
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
  );
};
