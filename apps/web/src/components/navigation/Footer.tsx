"use client";

import Link from "next/link";
import * as React from "react";

export const Footer: React.FC = ({}) => {
  return (
    <footer className="border-border bg-muted/30 border-t">
      <div className="container mx-auto w-full max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
                <span className="text-primary-foreground text-lg font-bold">
                  M
                </span>
              </div>
              <span className="text-xl font-bold">Matrio</span>
            </div>
            <p className="text-muted-foreground">
              Your destination for classic games and endless fun.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Games</h4>
            <ul className="text-muted-foreground space-y-2">
              <li>
                <Link
                  href="#"
                  className="hover:text-foreground transition-colors"
                >
                  Tic-Tac-Toe
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-foreground transition-colors"
                >
                  Checkers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-foreground transition-colors"
                >
                  Coming Soon
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Account</h4>
            <ul className="text-muted-foreground space-y-2">
              <li>
                <Link
                  href="/signin"
                  className="hover:text-foreground transition-colors"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="hover:text-foreground transition-colors"
                >
                  Sign Up
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-foreground transition-colors"
                >
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Support</h4>
            <ul className="text-muted-foreground space-y-2">
              <li>
                <Link
                  href="#"
                  className="hover:text-foreground transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-foreground transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-border text-muted-foreground mt-8 border-t pt-8 text-center">
          <p>&copy; 2025 Matrio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
