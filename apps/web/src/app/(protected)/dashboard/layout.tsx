import { getUser } from "@/lib/getUser";

export async function generateMetadata() {
  const user = await getUser();

  return {
    title: `${user?.username} | Dashboard`,
  };
}

export default function DashboardLayout({
  welcome,
  quickplay,
  recentgames,
  quickActions,
  achievements,
  stats,
}: Readonly<{
  welcome: React.ReactNode;
  quickplay: React.ReactNode;
  recentgames: React.ReactNode;
  quickActions: React.ReactNode;
  achievements: React.ReactNode;
  stats: React.ReactNode;
}>) {
  return (
    <div className="w-full max-w-7xl py-8">
      {welcome}
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          {quickplay}
          {recentgames}
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {stats}
          {achievements}
          {quickActions}
        </div>
      </div>
    </div>
  );
}
