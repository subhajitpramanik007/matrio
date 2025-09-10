"use client";

import React from "react";
import { UserSettings } from "./user-settings";
import { AccountActions } from "./account-actions";

export default function ProfileSettings() {
  return (
    <div className="space-y-6">
      <UserSettings />
      <AccountActions />
    </div>
  );
}
