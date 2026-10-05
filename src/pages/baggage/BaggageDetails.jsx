import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import { toast } from "sonner";
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
import { Checkbox } from "../../components/ui/checkbox";
import { SquarePen, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";

const BaggageDetails = () => {
  const { id } = useParams();

  const [baggages, setBaggages] = useState([]);
  const [dependancy, setDependency] = useState(0);

  useEffect(() => {
    const fetchBaggages = async () => {
      try {
        const response = await api.get(`/${id}/baggages`);
        setBaggages(response.data);
      } catch (error) {
        toast.error(error.message || "Error while fetching trips");
      }
    };

    fetchBaggages();
  }, [dependancy]);

  const addBaggage = async () => {
    const name = document.getElementById("baggageInput");

    try {
      const response = await api.post(`/${id}/baggages`, { name: name.value });

      if (response.status === 201) {
        toast.success("Baggage added successfully");
        name.value = "";
        setDependency(dependancy + 1);
      } else {
        toast.error("Error while adding baggage");
      }
    } catch (error) {
      toast.error(error.message || "Error while adding baggage");
      console.log(error);
    }
  };

  const onDelete = async (baggageId) => {
    try {
      const response = await api.delete(`/${id}/baggages/${baggageId}`);

      if (response.status === 200) {
        toast.success("Baggage deleted successfully!!");
        setDependency(dependancy + 1);
      } else {
        toast.error("Error while deleting baggage.");
      }
    } catch (error) {
      toast.error(error.message || "Error while creating baggage");
      console.log(error);
    }
  };

  const onCheck = async (baggageId, completed) => {
    try {
      const response = await api.patch(`/${id}/baggages/${baggageId}`, {
        completed: !completed,
      });

      if (response.status === 200) {
        toast.success("Baggage packed successfully!!");
        setDependency(dependancy + 1);
      } else {
        toast.error("Error while packed baggage.");
      }
    } catch (error) {
      toast.error(error.message || "Error while packed baggage");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-20 lg:py-24">
      <Card className="mx-auto w-full max-w-7xl">
        <CardHeader className="flex flex-col gap-4 border-b px-4 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <CardTitle className="text-xl sm:text-2xl">
              See Baggages for this trip
            </CardTitle>

            <CardDescription className="mt-1 text-sm sm:text-base">
              View and manage baggages.
            </CardDescription>
          </div>

          <CardAction className="w-full md:w-auto">
            <Dialog>
              <DialogTrigger render={<Button className="w-full md:w-auto" />}>
                Add Baggage
              </DialogTrigger>

              <DialogContent className="w-[calc(100%-2rem)] max-w-md">
                <DialogHeader>
                  <DialogTitle>Add Baggage</DialogTitle>

                  <DialogDescription>
                    Provide the name of item you want to pack for this trip.
                  </DialogDescription>
                </DialogHeader>

                <div>
                  <Label htmlFor="baggageInput" className="mb-2">
                    Name of item
                  </Label>

                  <Input
                    type="text"
                    placeholder="medicine"
                    id="baggageInput"
                    className="w-full"
                  />
                </div>

                <Button onClick={addBaggage} className="w-full">
                  Submit
                </Button>
              </DialogContent>
            </Dialog>
          </CardAction>
        </CardHeader>

        <CardContent className="px-4 py-6 sm:px-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {baggages.length == 0 ? (
              <div className="col-span-full py-10 text-center text-lg font-semibold sm:text-xl">
                No baggages to show, create one first.
              </div>
            ) : (
              baggages.map((item) => {
                return (
                  <div
                    key={item._id}
                    className={`flex min-w-0 items-center justify-between gap-3 rounded border p-4 ${
                      item.completed ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <Checkbox
                        onCheckedChange={() => {
                          onCheck(item._id, item.completed);
                        }}
                        checked={item.completed}
                      />

                      <p className="wrap-break-word text-base font-medium sm:text-lg">
                        {item.name}
                      </p>
                    </div>

                    <div className="flex shrink-0 gap-1">
                      <Button variant="outline" size="icon">
                        <SquarePen />
                      </Button>

                      <Button
                        onClick={() => {
                          onDelete(item._id);
                        }}
                        variant="outline"
                        size="icon"
                      >
                        <Trash2 className="text-red-700" />
                      </Button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>

        <CardFooter className="px-4 sm:px-6">
          <p className="text-sm sm:text-base">
            Total Baggages: {baggages.length}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BaggageDetails;
