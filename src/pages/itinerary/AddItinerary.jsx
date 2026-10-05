import { useParams } from "react-router-dom";
import ItineraryForm from "../../components/common/ItineraryForm";


const AddItinerary = () => {
  const { tripId } = useParams();

  return (
    <div className="w-full">
      <ItineraryForm tripId={tripId} />
    </div>
  );
};

export default AddItinerary;
