"use client";

import * as React from "react";
import { Input } from "../ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export const PasswordInput = ({
  className,
  ...props
}: React.ComponentProps<typeof Input>) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="relative">
      <Input
        className={className}
        {...props}
        type={showPassword ? "text" : "password"}
        placeholder="Enter your password"
        data-slot="password-input"
      />
      <button
        data-slot="password-toggle"
        className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
        type="button"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <EyeIcon className="text-muted-foreground size-4" />
        ) : (
          <EyeOffIcon className="text-muted-foreground size-4" />
        )}
      </button>
    </div>
  );
};
