import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Hero } from "@/components/landing/hero";
import { Navbar } from "@/components/common/navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f7f5]">
      <Navbar
        action={
          <Button size="sm">Get started</Button>
        }
      />

      <Hero
        eyebrow="Plan together"
        title="Make plans your whole group can agree on."
        description="Discover activities, vote with your friends, and turn the winning idea into a shared plan."
        primaryAction={
          <Button size="lg">Get started</Button>
        }
        secondaryAction={
          <Button variant="secondary" size="lg">
            Explore groups
          </Button>
        }
        visual={
          <Card className="overflow-hidden border-zinc-200/80 p-0">
            <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-5">
              <div>
                <p className="text-sm font-medium text-zinc-950">Weekend plans</p>
                <p className="mt-1 text-sm text-zinc-500">Friends in Warsaw</p>
              </div>
              <Badge variant="outline">4 members</Badge>
            </div>

            <div className="space-y-3 p-4">
              <div className="rounded-xl border border-zinc-200 bg-zinc-50/70 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-zinc-950">Riverside cinema</p>
                    <p className="mt-1 text-sm text-zinc-500">Saturday · 19:30</p>
                  </div>
                  <span className="text-sm font-medium text-zinc-950">3 / 4</span>
                </div>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-zinc-200">
                  <div className="h-full w-3/4 rounded-full bg-zinc-900" />
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-zinc-800">Sunday brunch</p>
                  <p className="mt-1 text-sm text-zinc-500">2 votes so far</p>
                </div>
                <span className="text-sm text-zinc-400">Open</span>
              </div>
            </div>

            <div className="border-t border-zinc-100 px-6 py-4 text-sm text-zinc-500">
              One shared decision, no group-chat noise.
            </div>
          </Card>
        }
      />
    </main>
  );
}
