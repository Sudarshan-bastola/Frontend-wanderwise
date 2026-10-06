import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import { toast } from "sonner";
import ItineraryForm from "../../components/common/ItineraryForm";

const EditItinerary = () => {
  const { tripId, id } = useParams();
  const [itinerary, setItinerary] = useState(null);

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
    <div className="w-full">
      <ItineraryForm tripId={tripId} itinerary={itinerary} />
    </div>
  );
};

export default EditItinerary;
