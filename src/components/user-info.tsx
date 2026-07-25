'use client';

import { CardDescription } from "./ui/card";
import { Badge } from "./ui/badge";
import { Skeleton } from "./ui/skeleton";
import { useMe } from "@/hooks/use-auth";

export default function UserInfo() {
  const { data: user, isLoading } = useMe();

  if (isLoading) {
    return (
      <CardDescription className="mt-3 flex gap-2">
        <Skeleton className="h-6 w-32 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </CardDescription>
    );
  }

  return (
    <CardDescription className="mt-3 flex gap-2">
      <Badge variant="secondary">
        Tenant: {user?.role === "SUPER_ADMIN" ? "N/A" : user?.tenant?.name}
      </Badge>

      <Badge>
        Role: {user?.role ?? "N/A"}
      </Badge>
    </CardDescription>
  );
}