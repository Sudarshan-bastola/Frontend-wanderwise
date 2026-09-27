import { useEffect, useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { EllipsisVertical, Plus } from "lucide-react";
import api from "../../api/axios";
import { toast } from "sonner";
import { formatDate } from "../../lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    <div className="px-20 py-24 bg-purple-100">
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Select a trip to view baggage</CardTitle>
          <CardDescription>
            Click view baggage button to show baggages of this trip.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-3 gap-6">
            {trips.length == 0 ? (
              <div className="text-3xl font-semibold text-center py-20">
                You do not have any trips to show. Create a new trip first.
              </div>
            ) : (
              trips.map((trip) => {
                return (
                  <Card key={trip._id}>
                    <CardHeader className="border-b">
                      <CardTitle>{trip.title}</CardTitle>
                      <CardDescription>
                        {formatDate(trip.startDate)} -{" "}
                        {formatDate(trip.endDate)}{" "}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Budget: Rs. {trip.budget.total}</p>
                      <p>Spent: Rs. {trip.budget.spent}</p>
                      <p>Destinations: {trip.destinations.join(", ")}</p>
                    </CardContent>
                    <CardFooter>
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

        <CardFooter>
          <p className="text-gray-500">Total trips: {trips.length}</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Baggage;
