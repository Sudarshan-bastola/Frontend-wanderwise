import { useEffect, useState } from "react";
import TripForm from "../../components/common/TripForm";
import api from "../../api/axios";
import { toast } from "sonner";
import { useParams } from "react-router-dom";

const EditTrip = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await api.get(`/trips/${id}`);
        setTrip(response.data);
      } catch (error) {
        toast.error("some error occured while fetching trips ");
        console.log(error);
      }
    };
    fetchTrips();
  }, []);

  if (!trip) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4 py-12 text-center text-lg font-semibold sm:text-xl">
        loading
      </div>
    );
  }

  return (
    <div className="w-full px-0 sm:px-2 md:px-4">
      <TripForm
        tripDetails={{
          ...trip,
          startDate: trip.startDate.split("T")[0],
          endDate: trip.endDate.split("T")[0],
        }}
      />
    </div>
  );
};

export default EditTrip;
