"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

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
import { useCreateCustomer } from "@/hooks/use-customer";



const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters"),

  email: z
    .string()
    .email("Please enter a valid email address"),

  phone: z
    .string()
    .optional()
    .or(z.literal("")),
});

export type CustomerFormData = z.infer<typeof formSchema>;

export function CustomerForm() {
  const router = useRouter();
  const { mutateAsync: createCustomerAsync, isPending } = useCreateCustomer();

  const form = useForm<CustomerFormData>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit(data: CustomerFormData) {

    try {
      await createCustomerAsync({
        name: data.name,
        email: data.email,
        phone: data.phone || undefined,
      });

      toast.success("Customer created successfully");
      router.back();

    } catch (error) {
      console.error(error);
      toast.error("Error to create customer");
    }

  }

  return (
    <Card className="w-full max-w-lg shadow-lg px-5 pt-12=">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">
          Add Customer
        </CardTitle>

        <CardDescription>
          Create a new customer for your tenant
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="customer-form"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Name</FieldLabel>

                  <Input
                    {...field}
                    placeholder="John Doe"
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Email Address</FieldLabel>

                  <Input
                    {...field}
                    type="email"
                    placeholder="john@example.com"
                    autoComplete="email"
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />

            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Phone</FieldLabel>

                  <Input
                    {...field}
                    placeholder="+977 98XXXXXXXX"
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                    />
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
            isDisabled
          >
            <Spinner />
          </Button>
        ) : (
          <Button
            className="w-full"
            type="submit"
            form="customer-form"
          >
            Add Customer
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}