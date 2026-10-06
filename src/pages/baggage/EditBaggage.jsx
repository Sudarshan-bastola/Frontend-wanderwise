import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";

const EditBaggage = () => {
  const { tripId, baggageId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBaggage = async () => {
      try {
        const response = await api.get(`/${tripId}/baggages`);

        const baggage = response.data.find((item) => item._id === baggageId);

        if (!baggage) {
          toast.error("Baggage not found");
          navigate(`/baggage/${tripId}`);
          return;
        }

        setName(baggage.name);
        setCompleted(baggage.completed);
      } catch (error) {
        toast.error("Failed to fetch baggage");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBaggage();
  }, [tripId, baggageId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.patch(`/${tripId}/baggages/${baggageId}`, {
        name,
        completed,
      });

      if (response.status === 200) {
        toast.success("Baggage updated successfully");
        navigate(`/baggage/${tripId}`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update baggage");
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-lg font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 sm:py-16 md:px-10 lg:px-20">
      <Card className="mx-auto w-full max-w-xl">
        <CardHeader>
          <CardTitle>Edit Baggage</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="baggageName" className="mb-2">
                Name of item
              </Label>

              <Input
                id="baggageName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Medicine"
              />
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="flex-1">
                Update Baggage
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(`/baggage/${tripId}`)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditBaggage;
