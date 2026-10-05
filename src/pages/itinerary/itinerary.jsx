import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import api from "../../api/axios";
import { CalendarDays, MapPin, Plus } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from "../../components/ui/card";
import { formatDate } from "../../lib/utils";


const Itineraries = () => {
  const { tripId } = useParams();
  const [itineraries, setItineraries] = useState([]);
  const [dependancy, setDependency] = useState(0);

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const response = await api.get(`/trips/${tripId}/itinerary`);
        setItineraries(response.data);
      } catch (error) {
        toast.error("Some error occured while fetching itineraries");
        console.log(error);
      }
    };

    fetchItineraries();
  }, [tripId, dependancy]);

  return (
    <div className="min-h-screen bg-purple-50/60 px-4 py-12 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-20 lg:py-24">
      <Card className="mx-auto w-full max-w-7xl">
        <CardHeader className="flex flex-col gap-4 border-b px-4 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <CardTitle className="text-xl sm:text-2xl">
              Your Itineraries
            </CardTitle>

            <CardDescription className="text-sm sm:text-base">
              View and manage your travel itineraries.
            </CardDescription>
          </div>

          <a href={`/trips/${tripId}/itinerary/add`}>
            <Button className="w-full md:w-auto">
              <Plus />
              Add Itinerary
            </Button>
          </a>
        </CardHeader>

        <CardContent className="px-4 py-6 sm:px-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {itineraries.length === 0 ? (
              <div className="col-span-full px-4 py-16 text-center sm:py-20">
                <MapPin className="mx-auto mb-4 size-10 text-purple-500" />

                <h2 className="text-xl font-semibold sm:text-2xl">
                  No itineraries yet
                </h2>

                <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                  Create an itinerary to start planning your activities.
                </p>

                <a href={`/trips/${tripId}/itinerary/add`}>
                  <Button>
                    <Plus />
                    Create Itinerary
                  </Button>
                </a>
              </div>
            ) : (
              itineraries.map((itinerary) => (
                <Card
                  key={itinerary._id}
                  className="min-w-0 overflow-hidden transition-shadow hover:shadow-md"
                >
                  <CardHeader className="border-b px-4 sm:px-6">
                    <CardTitle className="wrap-break-word text-lg sm:text-xl">
                      {itinerary.title}
                    </CardTitle>

                    <CardDescription className="flex flex-wrap items-center gap-1 text-sm">
                      <CalendarDays className="size-4 shrink-0" />
                      {itinerary.date
                        ? formatDate(itinerary.date)
                        : "Date not available"}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-3 px-4 py-4 sm:px-6 sm:py-5">
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="mt-0.5 size-4 shrink-0 text-purple-600" />

                      <span className="wrap-break-word text-muted-foreground">
                        {itinerary.activities?.length || 0} Activities
                      </span>
                    </div>

                    <a
                      href={`/trips/${tripId}/itinerary/${itinerary._id}`}
                      className="block pt-2"
                    >
                      <Button className="w-full">View Itinerary</Button>
                    </a>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>

        <div className="border-t px-4 py-4 sm:px-6">
          <p className="text-sm text-gray-500 sm:text-base">
            Total itineraries: {itineraries.length}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Itineraries;
