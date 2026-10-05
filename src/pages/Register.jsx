import { useNavigate } from "react-router-dom";
import z from "zod";
import useAuth from "../hooks/useAuth";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../api/axios";
import { toast } from "sonner";
import { Card,CardAction,CardContent,CardDescription,CardTitle,CardFooter, CardHeader } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Field, FieldError, FieldLabel } from "../components/ui/field";
import { Button } from "../components/ui/button";


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

  const onSubmit = async (data) => {
    console.log(data);

    const { confirmPassword, ...newData } = data;

    try {
      const response = await api.post("/auth/register", newData);

      if (response.status === 201) {
        toast.success("Account registered successfully");
        navigate("/login");
      } else {
        toast.error(response.message || "Registration failed");
      }
    } catch (error) {
      toast.error(error.message || "Some error occured");
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-dvh w-full bg-emerald-800 md:pt-20">
      <div className="hidden md:block">
        <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto w-1/3">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Register To Wanderwise</CardTitle>
              <CardDescription>
                Enter Your credentials to continue.
              </CardDescription>
              <CardAction>
                <img
                  src="/wanderwiseLogo.png"
                  alt="wanderwise logo"
                  className="w-12"
                />
              </CardAction>
            </CardHeader>

            <CardContent className="space-y-4">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Enter Your Name
                    </FieldLabel>
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
                    <FieldLabel htmlFor={field.name}>
                      Enter Your Email
                    </FieldLabel>
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
                    <FieldLabel htmlFor={field.name}>
                      Enter Your password
                    </FieldLabel>
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
                    <FieldLabel htmlFor={field.name}>
                      Confirm Your password
                    </FieldLabel>
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
            </CardContent>

            <CardFooter className="flex flex-col">
              <Button type="submit" className="w-full">
                Register
              </Button>

              <p className="mt-4 text-sm">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="font-medium text-purple-600 hover:underline"
                >
                  Login
                </a>
              </p>
            </CardFooter>
          </Card>
        </form>
      </div>

      <div className="flex min-h-dvh items-center justify-center px-4 py-8 md:hidden">
        <div className="w-full max-w-md">
          <div className="mb-8 flex flex-col items-center text-center">
            <img
              src="/wanderwiseLogo.png"
              alt="wanderwise logo"
              className="mb-5 w-20"
            />

            <h1 className="text-3xl font-bold text-white">
              Create your account
            </h1>

            <p className="mt-2 text-sm text-emerald-100">
              Join Wanderwise and start planning your journeys.
            </p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="w-full rounded-2xl border-0 shadow-xl">
              <CardHeader className="px-5 pt-6">
                <CardTitle className="text-xl">
                  Register to Wanderwise
                </CardTitle>
                <CardDescription>
                  Enter your details to create your account.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-5 px-5">
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={`mobile-${field.name}`}>
                        Name
                      </FieldLabel>
                      <Input
                        {...field}
                        id={`mobile-${field.name}`}
                        type="text"
                        placeholder="Enter your name"
                        aria-invalid={fieldState.invalid}
                        className="h-11"
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
                      <FieldLabel htmlFor={`mobile-${field.name}`}>
                        Email
                      </FieldLabel>
                      <Input
                        {...field}
                        id={`mobile-${field.name}`}
                        type="email"
                        placeholder="Enter your email"
                        aria-invalid={fieldState.invalid}
                        className="h-11"
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
                      <FieldLabel htmlFor={`mobile-${field.name}`}>
                        Password
                      </FieldLabel>
                      <Input
                        {...field}
                        id={`mobile-${field.name}`}
                        type="password"
                        placeholder="********"
                        aria-invalid={fieldState.invalid}
                        className="h-11"
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
                      <FieldLabel htmlFor={`mobile-${field.name}`}>
                        Confirm Password
                      </FieldLabel>
                      <Input
                        {...field}
                        id={`mobile-${field.name}`}
                        type="password"
                        placeholder="********"
                        aria-invalid={fieldState.invalid}
                        className="h-11"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </CardContent>

              <CardFooter className="flex flex-col px-5 pb-6">
                <Button type="submit" className="h-11 w-full">
                  Register
                </Button>

                <p className="mt-5 text-center text-sm">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="font-medium text-purple-600 hover:underline"
                  >
                    Login
                  </a>
                </p>
              </CardFooter>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
