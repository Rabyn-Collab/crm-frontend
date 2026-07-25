"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useCreateUser, useMe } from "@/hooks/use-auth";



const formSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),

  role: z.enum(["ADMIN", "MEMBER"]),
});

export type UserFormData = z.infer<typeof formSchema>;

export function UserForm() {
  const router = useRouter();

  const { data: me } = useMe();
  const { mutateAsync: createUserAsync, isPending } = useCreateUser();

  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "MEMBER",
    },
  });

  async function onSubmit(data: UserFormData) {
    try {
      await createUserAsync({
        ...data,
        tenantId: me?.tenantId || 0,
      });

      toast.success("Member created successfully");
      router.back();
    } catch (error) {
      toast.error("Failed to create member");
    }
  }

  return (
    <Card className="w-full max-w-lg shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">
          Add Member
        </CardTitle>

        <CardDescription>
          Create a new member for your tenant.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="user-form"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FieldGroup>
            {/* Email */}
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Email Address</FieldLabel>

                  <Input
                    {...field}
                    type="email"
                    placeholder="member@example.com"
                    autoComplete="email"
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Password */}
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Password</FieldLabel>

                  <Input
                    {...field}
                    type="password"
                    placeholder="Enter password"
                    autoComplete="new-password"
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />


          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        {isPending ? (
          <Button
            className="w-full"
            isDisabled={isPending}
          >
            <Spinner />
          </Button>
        ) : (
          <Button
            className="w-full"
            type="submit"
            form="user-form"
          >
            Create Member
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}