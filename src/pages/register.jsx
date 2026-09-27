import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Field, FieldError, FieldLabel } from "../components/ui/field";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import api from "../api/axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import useAuth from '../hooks/useAuth';

const formSchema = z
  .object({
    name: z.string().min(5, "Name must be atleast 5 characters").trim(),
    email: z.string().email().min(8, "Email too short").trim(),
    password: z.string().min(8, "Must be atleast 8 characters").trim(),
    confirmPassword: z.string().min(8, "Must be atleast 8 characters").trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords didn't matched",
    path: ["confirmPassword"],
  });

const Register = () => {

  const navigate = useNavigate();


    const { token } = useAuth();

    if (token) {
      navigate("/dashboard");
    }

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit =  async (data) => {
    console.log(data);

    const { confirmPassword, ...newData } = data;

    try {
      
      const response = await api.post("/auth/register", newData);

      if (response.status === 201) {
        toast.success("Account registered successfully");
        navigate("/login");
      }
      else {
        toast.error(response.message || "Registration failed");
      }

    } catch (error) {
      toast.error(error.message || "Some error occured");
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Card className={"w-1/4 mx-auto mt-20"}>
        <CardHeader>
          <CardTitle>Register To Wanderwise </CardTitle>
          <CardDescription>Enter Your credentials to continue.</CardDescription>
          <CardAction>
            <img
              src="wanderwiseLogo.png"
              alt="wanderwise logo"
              className="w-12"
            />
          </CardAction>
        </CardHeader>

        <CardContent className={"space-y-4"}>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Enter Your Name</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="text"
                  placeholder="Enter your name"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Enter Your Email</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="email"
                  placeholder="Enter your email"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Enter Your password</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="password"
                  placeholder="********"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>confirm Your password</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="password"
                  placeholder="*********"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </CardContent>

        <CardFooter>
          <Button type="submit">Register</Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default Register;
