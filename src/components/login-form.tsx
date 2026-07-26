"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "./ui/spinner"
import { useRouter } from "next/navigation"
import { useLogin } from "@/hooks/use-auth"
import { useAuth } from "@/lib/auth-context"
import Cookies from "js-cookie";

const formSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
})

export type LoginFormData = z.infer<typeof formSchema>


export function LoginForm() {
  const router = useRouter();
  const { login: authLogin } = useAuth();
  const { mutate: login, isPending } = useLogin();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  })


  async function onSubmit(
    data: z.infer<typeof formSchema>
  ) {
    login(data, {
      onSuccess: (response) => {
        Cookies.set('jwt', response.accessToken, {
          secure: true,
          sameSite: "none",
          expires: new Date("2099-12-31T23:59:59.999Z"),
        });
        authLogin(response);
        router.replace('/');
      },
      onError: () => {
        toast.error('Invalid email or password');
      }
    });
  }


  return (



    <Card className="w-full max-w-lg shadow-lg px-5 pt-12  ">

      <CardHeader className="text-center">

        <CardTitle className="text-2xl">
          CRM Login
        </CardTitle>

        <CardDescription>
          Sign in to access your CRM dashboard
        </CardDescription>

      </CardHeader>


      <CardContent>

        <form
          id="crm-login-form"
          onSubmit={form.handleSubmit(onSubmit)}
        >

          <FieldGroup>


            <Controller
              name="email"
              control={form.control}

              render={({ field, fieldState }) => (

                <Field
                  data-invalid={fieldState.invalid}
                >

                  <FieldLabel>
                    Email Address
                  </FieldLabel>


                  <Input
                    {...field}
                    type="email"
                    placeholder="admin@company.com"
                    autoComplete="email"
                    aria-invalid={
                      fieldState.invalid
                    }
                  />


                  {
                    fieldState.invalid &&
                    (
                      <FieldError
                        errors={[
                          fieldState.error
                        ]}
                      />
                    )
                  }

                </Field>

              )}

            />



            <Controller
              name="password"
              control={form.control}

              render={({ field, fieldState }) => (

                <Field
                  data-invalid={fieldState.invalid}
                >

                  <FieldLabel>
                    Password
                  </FieldLabel>


                  <Input
                    {...field}
                    type="password"
                    placeholder="********"
                    autoComplete="current-password"
                    aria-invalid={
                      fieldState.invalid
                    }
                  />


                  {
                    fieldState.invalid &&
                    (
                      <FieldError
                        errors={[
                          fieldState.error
                        ]}
                      />
                    )
                  }

                </Field>

              )}

            />


          </FieldGroup>


        </form>

      </CardContent>



      <CardFooter className="mb-10">

        {isPending ? (
          <Button
            isDisabled={true}
            className="w-full"

          >
            <Spinner />
          </Button>
        ) : (
          <Button
            className="w-full"
            type="submit"
            form="crm-login-form"
          >
            Login
          </Button>
        )}




      </CardFooter>


    </Card>



  )
}