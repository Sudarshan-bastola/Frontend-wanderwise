import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";
import api from "../../api/axios";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle } from "../ui/card";


const formSchema = z.object({
  title: z.string().min(1, "Title is required").trim(),
  description: z.string().optional(),
  date: z.string().min(1, "Date is required"),
  activities: z.array(
    z.object({
      name: z.string().min(1, "Activity name is required").trim(),
      time: z.string().min(1, "Activity time is required").trim(),
      notes: z.array(z.string()).optional(),
    }),
  ),
});

const ItineraryForm = ({ tripId, itinerary }) => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: itinerary?.title || "",
      description: itinerary?.description || "",
      date: itinerary?.date?.split("T")[0] || "",
      activities: itinerary?.activities || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "activities",
  });

  const onSubmit = async (data) => {
    try {
      let response;

      if (itinerary) {
        response = await api.patch(
          `/trips/${tripId}/itinerary/${itinerary._id}`,
          data,
        );
      } else {
        response = await api.post(`/trips/${tripId}/itinerary`, data);
      }

      if (response.status === 200 || response.status === 201) {
        toast.success(
          itinerary
            ? "Itinerary updated successfully"
            : "Itinerary created successfully",
        );

        navigate(`/trips/${tripId}/itinerary`);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error while saving itinerary",
      );
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full px-4 py-8 sm:px-6 sm:py-12 md:px-10 lg:px-20"
    >
      <Card className="mx-auto w-full max-w-3xl">
        <CardHeader className="border-b px-4 sm:px-6">
          <CardTitle className="text-xl sm:text-2xl">
            {itinerary ? "Edit Itinerary" : "Create Itinerary"}
          </CardTitle>

          <CardDescription className="text-sm sm:text-base">
            Add your itinerary details and activities.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 px-4 py-6 sm:px-6">
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Title</FieldLabel>

                <Input
                  {...field}
                  id={field.name}
                  placeholder="Kathmandu Day 1"
                  aria-invalid={fieldState.invalid}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Description</FieldLabel>

                <Textarea
                  {...field}
                  id={field.name}
                  placeholder="Explore Kathmandu..."
                  aria-invalid={fieldState.invalid}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

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
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-semibold">Activities</h3>
                <p className="text-sm text-muted-foreground">
                  Add activities for this itinerary.
                </p>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  append({
                    name: "",
                    time: "",
                    notes: [],
                  })
                }
              >
                Add Activity
              </Button>
            </div>

            {fields.map((field, index) => (
              <Card key={field.id}>
                <CardContent className="space-y-4 p-4">
                  <Controller
                    name={`activities.${index}.name`}
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Activity Name</FieldLabel>

                        <Input
                          {...field}
                          placeholder="Visit Swayambhunath"
                          aria-invalid={fieldState.invalid}
                        />

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name={`activities.${index}.time`}
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Time</FieldLabel>

                        <Input
                          {...field}
                          placeholder="10:00 AM"
                          aria-invalid={fieldState.invalid}
                        />

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name={`activities.${index}.notes.0`}
                    control={form.control}
                    render={({ field }) => (
                      <Field>
                        <FieldLabel>Note</FieldLabel>

                        <Input {...field} placeholder="Take camera" />
                      </Field>
                    )}
                  />

                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => remove(index)}
                  >
                    Remove Activity
                  </Button>
                </CardContent>
              </Card>
            ))}
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
