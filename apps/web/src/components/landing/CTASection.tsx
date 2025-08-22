"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const CTASection: React.FC = ({}) => {
  return (
    <section className="bg-primary/5 container flex min-h-screen flex-col items-center justify-center px-4">
      <div className="text-center">
        <h2 className="text-primary mb-4 text-3xl font-bold md:text-4xl">
          Ready to Start Playing?
        </h2>
        <p className="mb-8 text-lg opacity-90">
          Join thousands of players enjoying classic games every day
        </p>
        <div className="flex flex-col justify-center gap-4">
          <Link href="/auth/signup">
            <Button
              size="lg"
              variant="secondary"
              className="w-full px-8 py-6 text-lg"
            >
              Create Free Account
            </Button>
          </Link>
          <Button size="lg" className="px-8 py-6 text-lg">
            Play as Guest
          </Button>
        </div>
      </div>
    </section>
  );
};
