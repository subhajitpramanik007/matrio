import { Gamepad2Icon, StarsIcon, Users2 } from "lucide-react";
import * as React from "react";
import { Card, CardContent } from "../ui/card";

export const FeaturesSection: React.FC = ({}) => {
  return (
    <section className="container py-16 min-h-screen bg-gradient-to-tr from-primary/5 to-primary/10">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Why Choose Matrio?
        </h2>
        <p className="text-lg text-muted-foreground">
          The perfect place for casual gaming
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 w-full max-w-7xl mx-auto px-4">
        <Card className="">
          <CardContent className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Gamepad2Icon className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Instant Play</h3>
            <p className="text-muted-foreground">
              No downloads required. Jump straight into your favorite games.
            </p>
          </CardContent>
        </Card>

        <Card className="">
          <CardContent className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Users2 className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Play with Friends</h3>
            <p className="text-muted-foreground">
              Challenge friends or play against our smart AI opponents.
            </p>
          </CardContent>
        </Card>

        <Card className="">
          <CardContent className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <StarsIcon className="w-8 h-8 text-primary" />
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
