import { EventItem } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";


interface EventCardProps {
  event: EventItem;
}

export function EventCard({ event }: EventCardProps) {
  const startDate = new Date(event.starts_at).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedPrice =
    Number(event.price) === 0
      ? "Free"
      : `${event.price} ${event.currency}`;

  return (
    <Card className="overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-200">
      <div className="relative h-48 w-full bg-zinc-100">
        {event.imageUrl ? (
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-400">
            No image
          </div>
        )}
        <Badge className="absolute top-3 right-3 capitalize" variant="neutral">
          {event.category}
        </Badge>
      </div>

      <CardHeader className="p-4 pb-2">
        <h3 className="font-semibold text-lg line-clamp-1">{event.title}</h3>
      </CardHeader>

      <CardContent className="p-4 pt-0 space-y-2 text-sm text-muted-foreground flex-1">
        <div className="flex items-center gap-1.5">
          <Calendar className="size-4 shrink-0" />
          <span>{startDate}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="size-4 shrink-0" />
          <span className="line-clamp-1">{event.location_name}</span>
        </div>
        {event.description && (
          <p className="line-clamp-2 text-xs pt-1 text-zinc-500">
            {event.description}
          </p>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-2 border-t flex items-center justify-between text-sm font-medium">
        <span>{formattedPrice}</span>
      </CardFooter>
    </Card>
  );
}
