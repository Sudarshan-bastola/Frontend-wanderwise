import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import api from "../../api/axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  title: z.string().min(3, "Title must be atleast 3 characters").trim(),
  date: z.string().min(1, "Date is required"),
  day: z.coerce.number().min(1, "Day must be atleast 1"),
});

const ItineraryForm = ({ itinerary }) => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: itinerary?.title || "",
      date: itinerary?.date?.split("T")[0] || "",
      day: itinerary?.day || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      let response;

      if (itinerary) {
        response = await api.patch(`/itineraries/${itinerary._id}`, data);
      } else {
        response = await api.post("/itineraries", data);
      }

      if (response.status === 200 || response.status === 201) {
        toast.success(
          itinerary
            ? "Itinerary updated successfully"
            : "Itinerary created successfully",
        );

        navigate("/itineraries");
      } else {
        toast.error("Error while saving itinerary");
      }
    } catch (error) {
      toast.error(error.message || "Error while saving itinerary");
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full px-4 py-8 sm:px-6 sm:py-12 md:px-10 lg:px-20"
    >
      <Card className="mx-auto w-full max-w-2xl">
        <CardHeader className="border-b px-4 sm:px-6">
          <CardTitle className="text-xl sm:text-2xl">
            {itinerary ? "Edit Itinerary" : "Create Itinerary"}
          </CardTitle>

          <CardDescription className="text-sm sm:text-base">
            Add the basic information for your itinerary.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5 px-4 py-6 sm:px-6">
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Itinerary Title</FieldLabel>

                <Input
                  {...field}
                  id={field.name}
                  type="text"
                  placeholder="Paris Adventure"
                  aria-invalid={fieldState.invalid}
                  className="w-full"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Controller
              name="date"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Date</FieldLabel>

                  <Input
                    {...field}
                    id={field.name}
                    type="date"
                    aria-invalid={fieldState.invalid}
                    className="w-full"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="day"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Day</FieldLabel>

                  <Input
                    {...field}
                    id={field.name}
                    type="number"
                    placeholder="1"
                    aria-invalid={fieldState.invalid}
                    className="w-full"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
        </CardContent>

        <CardFooter className="px-4 pb-6 sm:px-6">
          <Button type="submit" className="w-full">
            {itinerary ? "Update Itinerary" : "Create Itinerary"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default ItineraryForm;
