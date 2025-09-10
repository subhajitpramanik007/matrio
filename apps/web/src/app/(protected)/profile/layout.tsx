import { Metadata } from "next";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Profile",
  description: "The profile page of the matrio game platform",
};

export default function ProfileLayout({
  overview,
  achievements,
  settings,
  gamestats,
}: Readonly<{
  overview: React.ReactNode;
  achievements: React.ReactNode;
  settings: React.ReactNode;
  gamestats: React.ReactNode;
}>) {
  return (
    <div className="bg-background container mx-auto min-h-screen w-full max-w-7xl py-4">
      <div className="container w-full max-w-7xl py-8">
        <div className="mx-auto max-w-5xl">
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="stats">Statistics</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-8">
              {overview}
            </TabsContent>
            <TabsContent value="stats" className="space-y-8">
              {gamestats}
            </TabsContent>
            <TabsContent value="achievements" className="space-y-8">
              {achievements}
            </TabsContent>
            <TabsContent value="settings" className="space-y-8">
              {settings}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
