import { useEffect, useState } from "react";
import {
  Card,
} from "../../components/ui/card";
import ExpenseForm from "../../components/common/ExpenseForm";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import { toast } from "sonner";
import InviteForm from "../../components/common/InviteForm";
import TripInfo from "../../components/common/TripInfo";

const TripDetails = () => {
  const { id } = useParams();

  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await api.get(`/trips/${id}`);
        setTrip(response.data);
      } catch (error) {
        toast.error("Some error occured while fetching trips");
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
    <div className="flex w-full flex-col gap-6 px-4 py-8 sm:px-6 sm:py-12 md:px-10 lg:px-20 lg:py-16 xl:flex-row">
      <Card className="w-full xl:w-3/4">
        <TripInfo trip={trip} />
      </Card>

      <div className="flex w-full flex-col gap-6 xl:w-1/4">
        <ExpenseForm trip={trip} />
        <InviteForm trip={trip} />
      </div>
    </div>
  );
};

export default TripDetails;
