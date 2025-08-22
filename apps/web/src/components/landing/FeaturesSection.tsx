import { Gamepad2Icon, StarsIcon, Users2 } from "lucide-react";
import * as React from "react";
import { Card, CardContent } from "../ui/card";

export const FeaturesSection: React.FC = ({}) => {
  return (
    <section className="from-primary/5 to-primary/10 container min-h-screen bg-gradient-to-tr py-16">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          Why Choose Matrio?
        </h2>
        <p className="text-muted-foreground text-lg">
          The perfect place for casual gaming
        </p>
      </div>

      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 md:grid-cols-3">
        <Card className="">
          <CardContent className="space-y-4 text-center">
            <div className="bg-primary/10 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
              <Gamepad2Icon className="text-primary h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold">Instant Play</h3>
            <p className="text-muted-foreground">
              No downloads required. Jump straight into your favorite games.
            </p>
          </CardContent>
        </Card>

        <Card className="">
          <CardContent className="space-y-4 text-center">
            <div className="bg-primary/10 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
              <Users2 className="text-primary h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold">Play with Friends</h3>
            <p className="text-muted-foreground">
              Challenge friends or play against our smart AI opponents.
            </p>
          </CardContent>
        </Card>

        <Card className="">
          <CardContent className="space-y-4 text-center">
            <div className="bg-primary/10 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
              <StarsIcon className="text-primary h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold">Track Progress</h3>
            <p className="text-muted-foreground">
              Keep track of your wins, losses, and improve your skills.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
