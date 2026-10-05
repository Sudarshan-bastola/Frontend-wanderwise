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
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../lib/utils";

const Trip = () => {
  const navigate = useNavigate();
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
        toast.success("Trip deleted successfully");
        setDependency(dependancy + 1);
        navigate("/trips");
      } else {
        toast.error("Error deleting trip.");
      }
    } catch (error) {
      toast.error(error.message || "Error deleting trip");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-20 lg:py-24">
      <Card className="mx-auto w-full max-w-7xl">
        <CardHeader className="flex flex-col gap-4 border-b px-4 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <CardTitle className="text-xl sm:text-2xl">
              See your trips
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              View and manage all your trips
            </CardDescription>
          </div>

          <CardAction className="w-full md:w-auto">
            <a href="/trips/add" className="block w-full md:w-auto">
              <Button className="w-full md:w-auto">
                <Plus />
                Add Trip
              </Button>
            </a>
          </CardAction>
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
                    <CardHeader className="flex flex-row items-start justify-between gap-3 border-b px-4 sm:px-6">
                      <div className="min-w-0">
                        <CardTitle className="word text-lg sm:text-xl">
                          {trip.title}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {formatDate(trip.startDate)} -{" "}
                          {formatDate(trip.endDate)}
                        </CardDescription>
                      </div>

                      <CardAction className="shrink-0">
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            render={<Button variant="outline" size="icon" />}
                          >
                            <EllipsisVertical />
                          </DropdownMenuTrigger>

                          <DropdownMenuContent>
                            <DropdownMenuGroup>
                              <DropdownMenuLabel>Manage Trip</DropdownMenuLabel>

                              <DropdownMenuItem>
                                <a
                                  className="w-full"
                                  href={`/trips/${trip._id}`}
                                >
                                  View
                                </a>
                              </DropdownMenuItem>

                              <DropdownMenuItem>
                                <a
                                  className="w-full"
                                  href={`/trips/edit/${trip._id}`}
                                >
                                  Edit
                                </a>
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                onClick={() => {
                                  onDelete(trip._id);
                                }}
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </CardAction>
                    </CardHeader>

                    <CardContent className="flex flex-col gap-2 px-4 py-4 sm:px-6 sm:py-5">
                      <p className="wrap-break-word">
                        Budget: Rs. {trip.budget.total}
                      </p>
                      <p className="wrap-break-word">
                        Spent: Rs. {trip.budget.spent}
                      </p>
                    </CardContent>

                    <CardFooter className="px-4 pb-4 sm:px-6">
                      <p className="wrap-break-word">
                        Destinations: {trip.destinations.join(", ")}.
                      </p>
                    </CardFooter>
                  </Card>
                );
              })
            )}
          </div>
        </CardContent>

        <CardFooter className="px-4 sm:px-6">
          <p className="text-sm text-gray-500 sm:text-base">
            Total trips : {trips.length}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Trip;
