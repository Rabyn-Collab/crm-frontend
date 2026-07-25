"use client";

import Link from "next/link";
import { Loader2, AlertCircle, Pencil } from "lucide-react";

import { useCustomers } from "@/hooks/use-customer";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { RemoveCustomer } from "../remove-customer";
import { Button } from "../ui/button";

export default function CustomerList() {
  const {
    data: customers,
    isLoading,
    error,
  } = useCustomers();

  if (isLoading) {
    return (
      <>
        <div className="overflow-hidden rounded-lg border bg-white">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr className="border-b">
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Name
                </th>

                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Email
                </th>

                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Phone
                </th>

                <th className="px-6 py-3 text-right text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {Array.from({ length: 6 }).map((_, index) => (
                <tr key={index} className="border-b last:border-0">
                  <td className="px-6 py-4">
                    <Skeleton className="h-5 w-16" />
                  </td>

                  <td className="px-6 py-4">
                    <Skeleton className="h-5 w-16" />
                  </td>

                  <td className="px-6 py-4">
                    <Skeleton className="h-5 w-16" />
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <Skeleton className="h-9 w-9 rounded-md" />
                      <Skeleton className="h-9 w-9 rounded-md" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 flex items-center justify-center gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading customers...
        </div>
      </>
    );
  }

  if (error) {
    return (
      <Card className="shadow-sm">
        <CardHeader className="border-b bg-muted/30">
          <CardTitle>Customers</CardTitle>
        </CardHeader>

        <CardContent className="p-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Failed to load customers</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border bg-white">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr className="border-b">
            <th className="px-6 py-3 text-left text-sm font-semibold">
              Name
            </th>

            <th className="px-6 py-3 text-left text-sm font-semibold">
              Email
            </th>

            <th className="px-6 py-3 text-left text-sm font-semibold">
              Phone
            </th>

            <th className="px-6 py-3 text-right text-sm font-semibold">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {customers?.map((customer) => (
            <tr
              key={customer.id}
              className="border-b last:border-0 hover:bg-slate-50 transition-colors"
            >
              <td className="px-6 py-4 font-medium">
                {customer.name}
              </td>

              <td className="px-6 py-4 text-slate-600">
                {customer.email}
              </td>

              <td className="px-6 py-4 text-slate-600">
                {customer.phone || "-"}
              </td>

              <td className="px-6 py-4">
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/customers/${customer.id}`}
                  >
                    <Button
                      variant="outline"
                      size="icon"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </Link>

                  <RemoveCustomer
                    id={customer.id}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}