import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
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
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

import api from "../../api/axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const budgetSchema = z.object({
  total: z.coerce.number().min(1, "Must be atleast 1"),
  spent: z.coerce.number().optional(),
});

const formSchema = z
  .object({
    title: z.string().min(5, "Must be atleast 5 characters"),
    description: z.string().optional(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    destinations: z
      .array(z.string().min(3, "Must be atleast 3 characters"))
      .min(1, "Atleast one destination is required"),
    budget: budgetSchema,
  })
  .refine(
    (data) => {
      return data.startDate <= data.endDate;
    },
    {
      message: "Start date must be before end date",
      path: ["startDate"],
    },
  );

const TripForm = ({ tripDetails }) => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: tripDetails || {
      title: "",
      description: "",
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date().toISOString().split("T")[0],
      destinations: [" "],
      budget: {
        total: "",
        spent: "",
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "destinations",
  });

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const response = await api.post("/trips", data);

      if (response.status === 201) {
        toast.success("Trip created successfully");
        navigate("/trips");
      } else {
        toast.error("Error creating trip.");
        console.log(response);
      }
    } catch (error) {
      toast.error(error.message || "Error creating trip");
      console.log(error);
    }
  };

  const onEdit = async (data) => {
    try {
      const updatedData = {
        ...data,
        startDate: data.startDate.toISOString().split("T")[0],
        endDate: data.endDate.toISOString().split("T")[0],
      };

      const response = await api.patch(
        `/trips/${tripDetails._id}`,
        updatedData,
      );

      if (response.status === 200) {
        toast.success("Trip updated successfully");
        navigate("/trips");
      }
    } catch (error) {
      console.log("Backend errors:", error.response?.data?.errors);

      toast.error(
        error.response?.data?.message || error.message || "Error updating trip",
      );
    }
  };

  return (
    <form
      className="w-full px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16 lg:py-20"
      onSubmit={form.handleSubmit(tripDetails ? onEdit : onSubmit)}
    >
      <Card className="mx-auto w-full max-w-2xl">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="text-xl sm:text-2xl">
            {tripDetails ? "Edit" : "Add"} your Trip
          </CardTitle>

          <CardDescription className="text-sm sm:text-base">
            Fill out the details of your next trip.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 px-4 sm:px-6">
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Enter trip title</FieldLabel>

                <Input
                  {...field}
                  id={field.name}
                  type="text"
                  placeholder="Trip to Nepal with Friends"
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
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Description</FieldLabel>

                <Textarea
                  {...field}
                  id={field.name}
                  placeholder="Describe your trip..."
                  aria-invalid={fieldState.invalid}
                  className="min-h-24 w-full"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Controller
              name="startDate"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Start Date</FieldLabel>

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
              name="endDate"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>End Date</FieldLabel>

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
          </div>

          <div>
            <FieldLabel>Destinations</FieldLabel>

            <div className="space-y-3">
              {fields.map((item, index) => (
                <div key={item.id} className="flex w-full items-start gap-2">
                  <Controller
                    name={`destinations.${index}`}
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <div className="min-w-0 flex-1">
                        <Input
                          {...field}
                          placeholder="Kathmandu"
                          aria-invalid={fieldState.invalid}
                          className="w-full"
                        />

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </div>
                    )}
                  />

                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="shrink-0"
                    onClick={() => remove(index)}
                  >
                    <X />
                  </Button>
                </div>
              ))}
            </div>

            <Button
              type="button"
              className="mt-3 w-full sm:w-auto"
              onClick={() => append("")}
            >
              Add Destination
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Controller
              name="budget.total"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Total Budget</FieldLabel>

                  <Input
                    {...field}
                    id={field.name}
                    type="number"
                    placeholder="50000"
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
              name="budget.spent"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Amount Spent</FieldLabel>

                  <Input
                    {...field}
                    id={field.name}
                    type="number"
                    placeholder="10000"
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

        <CardFooter className="px-4 sm:px-6">
          <Button type="submit" className="w-full sm:w-auto">
            {tripDetails ? "Update Trip" : "Create Trip"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default TripForm;
