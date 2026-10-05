import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Card,CardAction,CardContent,CardDescription,CardFooter,CardHeader,CardTitle } from "../components/ui/card";
import api from "../api/axios";
import { Input } from "../components/ui/input";
import { Field, FieldError, FieldLabel } from "../components/ui/field";
import { Button } from "../components/ui/button";
import z from "zod";

const formSchema = z.object({
  email: z.string().email().min(5, "Must be atleast 5 characters").trim(),
  password: z.string().min(8, "Must be atleast 8 characters").trim(),
});

const Login = () => {
  const navigate = useNavigate();

  const { onLogin, token } = useAuth();

  if (token) {
    navigate("/dashboard");
  }

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const response = await api.post("/auth/login", data);

      if (response.status === 200) {
        toast.success("Logged in successfully");

        onLogin(response.data.token, data);

        navigate("/dashboard");
      } else {
        toast.error(response.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.message || "Some error occured");
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-dvh w-full bg-emerald-800 md:pt-30">
      <div className="hidden md:block">
        <div className="mx-auto grid h-[60dvh] w-1/2 grid-cols-2 overflow-hidden rounded-lg bg-white">
          <div className="w-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="wanderwise login page"
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <form className="h-full" onSubmit={form.handleSubmit(onSubmit)}>
              <Card className="flex h-full flex-col justify-evenly">
                <CardHeader>
                  <CardTitle>Login to Wanderwise</CardTitle>
                  <CardDescription>
                    Enter your credentials to continue.
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
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                          Enter your email
                        </FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          type="email"
                          placeholder="abc@gmail.com"
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
                          Enter your password
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
                  <Button type="submit" className="mb-4 w-full">
                    Login
                  </Button>

                  <p>
                    Don't have an account? <a href="/register">Register</a>
                  </p>
                </CardFooter>
              </Card>
            </form>
          </div>
        </div>
      </div>

      <div className="flex min-h-dvh items-center justify-center px-4 py-8 md:hidden">
        <div className="w-full max-w-md">
          <div className="mb-8 flex flex-col items-center text-center">
            <img
              src="/wanderwiseLogo.png"
              alt="wanderwise logo"
              className="mb-5 w-20"
            />

            <h1 className="text-3xl font-bold text-white">Welcome back</h1>

            <p className="mt-2 text-sm text-emerald-100">
              Login to continue your journey with Wanderwise.
            </p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="w-full rounded-2xl border-0 shadow-xl">
              <CardHeader className="px-5 pt-6">
                <CardTitle className="text-xl">Login to your account</CardTitle>
                <CardDescription>Enter your credentials below.</CardDescription>
              </CardHeader>

              <CardContent className="space-y-5 px-5">
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
                        placeholder="abc@gmail.com"
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
              </CardContent>

              <CardFooter className="flex flex-col px-5 pb-6">
                <Button type="submit" className="mb-5 h-11 w-full">
                  Login
                </Button>

                <p className="text-center text-sm">
                  Don't have an account?{" "}
                  <a
                    href="/register"
                    className="font-medium text-purple-600 hover:underline"
                  >
                    Register
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

export default Login;
