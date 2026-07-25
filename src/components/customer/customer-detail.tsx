"use client";

import { AlertCircle, Loader2, UserRound } from "lucide-react";

import { useCustomer } from "@/hooks/use-customer";
import { UpdateCustomerForm } from "./customer-update-form";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";


import { Skeleton } from "@/components/ui/skeleton";

export default function CustomerDetail({
  id,
}: {
  id: number;
}) {
  const { data, isPending, isError, error } = useCustomer(id);

  if (isPending) {
    return (
      <Card className="w-xl mx-auto">
        <CardHeader>
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-72" />
        </CardHeader>

        <CardContent className="space-y-6">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-32" />
        </CardContent>
      </Card>
    );
  }




  return (

    <UpdateCustomerForm customer={data!} />

  );
}