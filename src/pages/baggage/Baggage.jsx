import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import api from "../../api/axios";
import { toast } from "sonner";
import { formatDate } from "../../lib/utils";

const Baggage = () => {
  const [trips, setTrips] = useState([]);
  const [dependancy, setDependency] = useState(0);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await api.get("/trips");
        setTrips(response.data);
      } catch (error) {
        toast.error("Some error occured while fetching trips");
        console.log(error);
      }
    };

    fetchTrips();
  }, [dependancy]);

  const onDelete = async (tripId) => {
    try {
      const response = await api.delete(`/trips/${tripId}`);

      if (response.status === 200) {
        toast.success("Trip deleted successfully!!");
        setDependency(dependancy + 1);
      } else {
        toast.error("Error while deleting trip.");
      }
    } catch (error) {
      toast.error(error.message || "Error while creating trip");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-purple-100 px-4 py-12 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-20 lg:py-24">
      <Card className="mx-auto w-full max-w-7xl">
        <CardHeader className="border-b px-4 sm:px-6">
          <CardTitle className="text-xl sm:text-2xl">
            Select a trip to view baggage
          </CardTitle>

          <CardDescription className="text-sm sm:text-base">
            Click view baggage button to show baggages of this trip.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-4 py-6 sm:px-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {trips.length == 0 ? (
              <div className="col-span-full px-4 py-16 text-center text-xl font-semibold sm:py-20 sm:text-2xl md:text-3xl">
                You do not have any trips to show. Create a new trip first.
              </div>
            ) : (
              trips.map((trip) => {
                return (
                  <Card key={trip._id} className="min-w-0">
                    <CardHeader className="border-b px-4 sm:px-6">
                      <CardTitle className="wrap-break-word text-lg sm:text-xl">
                        {trip.title}
                      </CardTitle>

                      <CardDescription className="text-sm">
                        {formatDate(trip.startDate)} -{" "}
                        {formatDate(trip.endDate)}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-2 px-4 py-4 sm:px-6">
                      <p>Budget: Rs. {trip.budget.total}</p>
                      <p>Spent: Rs. {trip.budget.spent}</p>

                      <p className="wrap-break-word">
                        Destinations: {trip.destinations.join(", ")}
                      </p>
                    </CardContent>

                    <CardFooter className="px-4 pb-4 sm:px-6">
                      <a className="w-full" href={`/baggage/${trip._id}`}>
                        <Button className="w-full">View Baggage</Button>
                      </a>
                    </CardFooter>
                  </Card>
                );
              })
            )}
          </div>
        </CardContent>

        <CardFooter className="px-4 sm:px-6">
          <p className="text-sm text-gray-500 sm:text-base">
            Total trips: {trips.length}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Baggage;
