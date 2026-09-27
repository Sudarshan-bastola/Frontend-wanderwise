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

// ======================================================
// 1. BUDGET VALIDATION SCHEMA
// ======================================================

// This defines the validation rules for the budget object.
const budgetSchema = z.object({
  // z.coerce.number() converts the input value into a number.
  // Example: "5000" → 5000
  // min(1) means the value must be at least 1.
  total: z.coerce.number().min(1, "Must be atleast 1"),

  // spent is optional.
  spent: z.coerce.number().optional(),
});

// ======================================================
// 2. MAIN FORM VALIDATION SCHEMA
// ======================================================

// formSchema contains ALL validation rules for our form.
// Zod will check the submitted data against these rules.
const formSchema = z
  .object({
    // Title must be a string and at least 5 characters.
    title: z.string().min(5, "Must be atleast 5 characters"),

    // Description is optional.
    description: z.string().optional(),

    // Convert the input into a JavaScript Date.
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),

    // destinations must be an array.
    // Each destination must contain at least 3 characters.
    // At least one destination is required.
    destinations: z
      .array(z.string().min(3, "Must be atleast 3 characters"))
      .min(1, "Atleast one destination is required"),

    // Apply the budget validation rules defined above.
    budget: budgetSchema,
  })

  // refine() is used when we need a custom validation rule.
  .refine(
    (data) => {
      // Start date must be before or equal to end date.
      return data.startDate <= data.endDate;
    },
    {
      message: "Start date must be before end date",

      // Show this error on the startDate field.
      path: ["startDate"],
    },
  );

// ======================================================
// 3. TRIP FORM COMPONENT
// ======================================================

const TripForm = ({ tripDetails }) => {
  // Used to navigate to another page after creating/updating.
  const navigate = useNavigate();

  // ======================================================
  // 4. REACT HOOK FORM
  // ======================================================

  // useForm() creates the FORM MANAGER.
  //
  // formSchema = rules
  // form = manager
  //
  // zodResolver connects Zod with React Hook Form.
  const form = useForm({
    // React Hook Form will use formSchema
    // to validate the form.
    resolver: zodResolver(formSchema),

    // Initial values of the form.
    //
    // If tripDetails exists → we are editing an existing trip.
    // Otherwise → we are creating a new trip.
    defaultValues: tripDetails || {
      title: "",
      description: "",

      // Default today's date.
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date().toISOString().split("T")[0],

      // At least one destination input is displayed initially.
      destinations: [" "],

      budget: {
        total: "",
        spent: "",
      },
    },
  });

  // ======================================================
  // 5. DYNAMIC DESTINATIONS
  // ======================================================

  // useFieldArray is used when we have an array of inputs
  // that can be added or removed dynamically.
  //
  // Example:
  // destinations:
  // [
  //   "Kathmandu",
  //   "Pokhara",
  //   "Chitwan"
  // ]
  const { fields, append, remove } = useFieldArray({
    // Connect the field array with our form manager.
    control: form.control,

    // Tell React Hook Form which field is an array.
    name: "destinations",
  });

  // ======================================================
  // 6. CREATE TRIP
  // ======================================================

  const onSubmit = async (data) => {
    // data contains all validated form values.
    console.log(data);

    try {
      // Send the form data to our backend.
      //
      // api is our Axios instance.
      // POST /trips means create a new trip.
      const response = await api.post("/trips", data);

      if (response.status === 201) {
        toast.success("Trip created successfully");

        // After successful creation,
        // go to the trips page.
        navigate("/trips");
      } else {
        toast.error("Error creating trip.");
        console.log(response);
      }
    } catch (error) {
      // If the backend/API request fails.
      toast.error(error.message || "Error creating trip");

      console.log(error);
    }
  };

  // ======================================================
  // 7. EDIT TRIP
  // ======================================================

  const onEdit = async (data) => {
    try {
      // Create a new object from the submitted data.
      const updatedData = {
        ...data,

        // Convert JavaScript Date back into YYYY-MM-DD
        // before sending it to the backend.
        startDate: data.startDate.toISOString().split("T")[0],
        endDate: data.endDate.toISOString().split("T")[0],
      };

      // PATCH is used to update an existing trip.
      //
      // tripDetails._id identifies which trip to update.
      const response = await api.patch(
        `/trips/${tripDetails._id}`,
        updatedData,
      );

      if (response.status === 200) {
        toast.success("Trip updated successfully");

        // Go back to trips page after updating.
        navigate("/trips");
      }
    } catch (error) {
      console.log("Backend errors:", error.response?.data?.errors);

      toast.error(
        error.response?.data?.message || error.message || "Error updating trip",
      );
    }
  };

  // ======================================================
  // 8. RETURN / UI
  // ======================================================

  return (
    // This is the normal HTML form.
    //
    // form.handleSubmit() comes from React Hook Form.
    //
    // It:
    // 1. Gets form data
    // 2. Runs Zod validation
    // 3. If valid → calls onSubmit/onEdit
    // 4. If invalid → shows validation errors
    <form
      className="py-20"
      onSubmit={form.handleSubmit(tripDetails ? onEdit : onSubmit)}
    >
      <Card className="w-2/5 mx-auto">
        <CardHeader>
          <CardTitle>{tripDetails ? "Edit" : "Add"} your Trip</CardTitle>

          <CardDescription>
            Fill out the details of your next trip.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* ==================================================
              TITLE FIELD
              ================================================== */}

          <Controller
            // Connect this Controller to the "title" value.
            name="title"
            // Connect Controller to our form manager.
            control={form.control}
            // Controller gives us:
            // field      → connection between input and form
            // fieldState → validation state of this field
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Enter trip title</FieldLabel>

                <Input
                  // Very important:
                  //
                  // field contains things like:
                  // name
                  // value
                  // onChange
                  // onBlur
                  // ref
                  //
                  // Spreading it connects the Input
                  // with React Hook Form.
                  {...field}
                  id={field.name}
                  type="text"
                  placeholder="Trip to Nepal with Friends"
                  // Used for accessibility.
                  // true when this field has a validation error.
                  aria-invalid={fieldState.invalid}
                />

                {/* Show error only when validation fails. */}
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* ==================================================
              DESCRIPTION FIELD
              ================================================== */}

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
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* ==================================================
              START DATE
              ================================================== */}

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
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* ==================================================
              END DATE
              ================================================== */}

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
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* ==================================================
              DESTINATIONS
              ================================================== */}

          <div>
            <FieldLabel>Destinations</FieldLabel>

            {/* fields contains all destination inputs. */}
            {fields.map((item, index) => (
              // IMPORTANT:
              // useFieldArray gives every item a unique id.
              // Use that id as React's key.
              <div key={item.id} className="flex gap-2 mt-2">
                <Controller
                  name={`destinations.${index}`}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <div className="flex-1">
                      <Input
                        {...field}
                        placeholder="Kathmandu"
                        aria-invalid={fieldState.invalid}
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </div>
                  )}
                />

                {/* Remove this destination. */}
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => remove(index)}
                >
                  <X />
                </Button>
              </div>
            ))}

            {/* Add another destination. */}
            <Button type="button" className="mt-3" onClick={() => append("")}>
              Add Destination
            </Button>
          </div>

          {/* ==================================================
              BUDGET TOTAL
              ================================================== */}

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
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* ==================================================
              BUDGET SPENT
              ================================================== */}

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
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </CardContent>

        {/* ==================================================
            SUBMIT BUTTON
            ================================================== */}

        <CardFooter>
          <Button type="submit">
            {tripDetails ? "Update Trip" : "Create Trip"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default TripForm;
