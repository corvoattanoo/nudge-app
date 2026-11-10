"use client";

import { useQuery } from "@tanstack/react-query";
import { getEvents } from "@/lib/api";
import { EventCard } from "@/components/events/event-card";
import { Loader2 } from "lucide-react";

export default function EventsPage() {
  const { data: events, isLoading, isError, error } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });

  return (
    <main className="container max-w-6xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Discover Events</h1>
        <p className="text-muted-foreground mt-1">
          Explore what is happening around Warsaw and share them with your group.
        </p>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="size-8 animate-spin text-zinc-400" />
        </div>
      )}

      {isError && (
        <div className="p-4 rounded-md bg-destructive/10 text-destructive text-sm">
          Failed to load events: {error instanceof Error ? error.message : "Unknown error"}
        </div>
      )}

      {events && events.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          No events found at the moment.
        </div>
      )}

      {events && events.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </main>
  );
}