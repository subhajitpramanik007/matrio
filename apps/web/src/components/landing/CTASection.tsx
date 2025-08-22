"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const CTASection: React.FC = ({}) => {
  return (
    <section className="container flex flex-col items-center justify-center min-h-screen bg-primary/5 px-4">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
          Ready to Start Playing?
        </h2>
        <p className="text-lg mb-8 opacity-90">
          Join thousands of players enjoying classic games every day
        </p>
        <div className="flex flex-col gap-4 justify-center">
          <Link href="/auth/signup">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-6 w-full"
            >
              Create Free Account
            </Button>
          </Link>
          <Button size="lg" className="text-lg px-8 py-6">
            Play as Guest
          </Button>
        </div>
      </div>
    </section>
  );
};
