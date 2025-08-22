import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const HeroSection: React.FC = ({}) => {
  return (
    <section className="container py-24 md:py-32 min-h-screen bg-gradient-to-tr from-primary/5 to-primary/10">
      <div className="flex flex-col items-center text-center space-y-8">
        <Badge
          variant="secondary"
          className="px-4 py-2 bg-primary/25 font-semibold"
        >
          Classic Games, Modern Experience
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Play Your Favorite
          <span className="text-primary block">Classic Games</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          Rediscover the joy of timeless games like Tic-Tac-Toe and Checkers.
          Simple to learn, impossible to master, and endlessly entertaining.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="text-lg px-8 py-6" asChild>
            <Link href="/games">Play Now</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-6 bg-transparent"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};
