import { CalendarClock, MapPin } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";


const ActivityCard = ({ activity }) => {
  return (
    <Card className="w-full">
      <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="min-w-0">
          <h3 className="wrap-break-word text-lg font-semibold">
            {activity.title}
          </h3>

          {activity.location && (
            <p className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              <span className="wrap-break-word">{activity.location}</span>
            </p>
          )}

          {(activity.startTime || activity.endTime) && (
            <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarClock className="size-4 shrink-0" />
              {activity.startTime || "--"} - {activity.endTime || "--"}
            </p>
          )}

          {activity.notes && (
            <p className="mt-2 wrap-break-word text-sm text-muted-foreground">
              {activity.notes}
            </p>
          )}
        </div>

        <div className="flex w-full gap-2 sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none">
            Edit
          </Button>

          <Button variant="destructive" className="flex-1 sm:flex-none">
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
