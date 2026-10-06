import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import { toast } from "sonner";
import { Pencil, Trash2 } from "lucide-react";
import ActivityCard from "../../components/common/ActivityCard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";


const ItineraryDetails = () => {
  const { tripId, id } = useParams();
  const navigate = useNavigate();
  const [itinerary, setItinerary] = useState(null);

  const handleDelete = async () => {
    try {
      await api.delete(`/trips/${tripId}/itinerary/${id}`);
      toast.success("Itinerary deleted successfully");
      window.location.href = `/trips/${tripId}/itinerary`;
    } catch (error) {
      toast.error("Failed to delete itinerary");
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const response = await api.get(`/trips/${tripId}/itinerary/${id}`);
        setItinerary(response.data);
      } catch (error) {
        toast.error("Some error occured while fetching itinerary");
        console.log(error);
      }
    };

    fetchItinerary();
  }, [tripId, id]);

  if (!itinerary) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4 py-12 text-center text-lg font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-50/60 px-4 py-8 sm:px-6 sm:py-12 md:px-10 lg:px-20 lg:py-16">
      <Card className="mx-auto w-full max-w-5xl">
        <CardHeader className="border-b px-4 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <CardTitle className="wrap-break-word text-2xl sm:text-3xl">
                {itinerary.title}
              </CardTitle>

              <CardDescription className="text-sm sm:text-base">
                {itinerary.date}
              </CardDescription>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() =>
                  navigate(`/trips/${tripId}/itinerary/${id}/edit`)
                }
              >
                <Pencil />
                Edit
              </Button>

              <Button variant="destructive" onClick={handleDelete}>
                <Trash2 />
                Delete
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 px-4 py-6 sm:px-6">
          {itinerary.activities?.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              No activities added yet.
            </div>
          ) : (
            itinerary.activities?.map((activity, index) => (
              <ActivityCard key={activity._id || index} activity={activity} />
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ItineraryDetails;
