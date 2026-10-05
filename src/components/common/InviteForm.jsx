import { zodResolver } from "@hookform/resolvers/zod";

import { Controller, useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Card,
  CardAction,
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

const formSchema = z.object({
  collaborators: z.array(z.string().email()).min(1, "Must contain one item"),
});

const InviteForm = ({ trip }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      collaborators: [""],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "collaborators",
  });

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const response = await api.post(`/trips/${trip._id}/invite`, {
        collaboratorEmails: data.collaborators,
      });

      if (response.status === 200) {
        toast.success("Invited successfully");
        form.reset();
      } else {
        toast.error("Error while inviting user");
      }
    } catch (error) {
      toast.error(error.message || "Error while inviting user");
      console.log(error);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
      <Card className="w-full">
        <CardHeader className="flex flex-col gap-3 border-b px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle className="text-lg sm:text-xl">
              Invite Collaborators
            </CardTitle>
            <CardDescription className="text-sm">
              Enter email address of collaborator
            </CardDescription>
          </div>

          <CardAction className="w-full md:w-auto">
            <Button
              type="button"
              className="w-full md:w-auto"
              onClick={() => {
                append("");
              }}
            >
              Add email
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent className="space-y-4 px-4 py-4 sm:px-6">
          {fields.map((field, index) => {
            return (
              <Controller
                key={field.id}
                name={`collaborators.${index}`}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Enter email</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="email"
                      placeholder="abc@gmail.com"
                      aria-invalid={fieldState.invalid}
                      className="w-full"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            );
          })}
        </CardContent>

        <CardFooter className="px-4 py-4 sm:px-6">
          <Button className="w-full" type="submit">
            Submit
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default InviteForm;
