import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const HeroSection: React.FC = ({}) => {
  return (
    <section className="from-primary/5 to-primary/10 container min-h-screen bg-gradient-to-tr py-24 md:py-32">
      <div className="flex flex-col items-center space-y-8 text-center">
        <Badge
          variant="secondary"
          className="bg-primary/25 px-4 py-2 font-semibold"
        >
          Classic Games, Modern Experience
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
          Play Your Favorite
          <span className="text-primary block">Classic Games</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl text-xl leading-relaxed">
          Rediscover the joy of timeless games like Tic-Tac-Toe and Checkers.
          Simple to learn, impossible to master, and endlessly entertaining.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button size="lg" className="px-8 py-6 text-lg" asChild>
            <Link href="/games">Play Now</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-transparent px-8 py-6 text-lg"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};
