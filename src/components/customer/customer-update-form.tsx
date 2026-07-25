"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
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



import { Customer } from "@/types/customer";
import { useUpdateCustomer } from "@/hooks/use-customer";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional().or(z.literal("")),
});

type CustomerFormData = z.infer<typeof formSchema>;

interface UpdateCustomerFormProps {
  customer: Customer;
}

export function UpdateCustomerForm({
  customer,
}: UpdateCustomerFormProps) {
  const router = useRouter();
  const { mutateAsync, isPending } = useUpdateCustomer();
  const form = useForm<CustomerFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: customer.name,
      email: customer.email,
      phone: customer.phone ?? "",
    },
  });

  async function onSubmit(data: CustomerFormData) {

    try {

      await mutateAsync({
        id: customer.id,
        dto: {
          name: data.name,
          email: data.email,
          phone: data.phone || undefined,
        },
      });
      toast.success("Customer updated successfully");
      router.back();
    } catch (err) {
      toast.error("Failed to update customer");
    }

  }

  return (
    <Card className="w-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">
          Update Customer
        </CardTitle>

        <CardDescription>
          Update customer information
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
                  <FieldLabel>Email Address</FieldLabel>

                  <Input
                    {...field}
                    type="email"
                    placeholder="john@example.com"
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
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
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full"
          type="submit"
          form="customer-form"
          isDisabled={isPending}
        >
          {isPending ? <Spinner /> : "Update Customer"}
        </Button>
      </CardFooter>
    </Card>
  );
}