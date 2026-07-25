"use client";

import { AlertCircle, Loader2 } from "lucide-react";

import { useUsers } from "@/hooks/use-users";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

import { Skeleton } from "@/components/ui/skeleton";

export default function SuperAdmin() {
  const {
    data: users = [],
    isLoading,
    error,
  } = useUsers();

  if (isLoading) {
    return (
      <>
        <Card className="shadow-sm">
          <CardHeader className="border-b bg-muted/30">
            <CardTitle className="text-lg">
              Users Management
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="max-w-[700px] w-full">
                <thead className="bg-muted/50">
                  <tr className="border-b">
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide">
                      Tenant
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide">
                      Email
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide">
                      Role
                    </th>

                  </tr>
                </thead>

                <tbody>
                  {Array.from({ length: 8 }).map((_, index) => (
                    <tr
                      key={index}
                      className="border-b"
                    >
                      <td className="px-5 py-4">
                        <Skeleton className="h-6 w-24 rounded-full" />
                      </td>

                      <td className="px-5 py-4">
                        <Skeleton className="h-4 w-56" />
                      </td>

                      <td className="px-5 py-4">
                        <Skeleton className="h-6 w-24 rounded-full" />
                      </td>


                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="mt-5 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading users...
        </div>
      </>
    );
  }

  if (error) {
    return (
      <Card className="shadow-sm">
        <CardHeader className="border-b bg-muted/30">
          <CardTitle>Users</CardTitle>
        </CardHeader>

        <CardContent className="p-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />

            <AlertTitle>Failed to load users</AlertTitle>

            <AlertDescription>
              {error.message}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden shadow-sm">
      <CardHeader className="flex flex-col gap-2 border-b bg-muted/30 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="text-lg font-semibold">
            Users Management
          </CardTitle>

          <p className="mt-1 text-xs text-muted-foreground">
            Manage all users across tenants
          </p>
        </div>

        <div className="rounded-md bg-primary/10 px-3 py-2 text-center">
          <p className="text-xs text-muted-foreground">
            Total Users
          </p>

          <p className="text-xl font-bold">
            {users.length}
          </p>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="max-w-[750px] w-full">
            <thead className="sticky top-0 bg-muted/50">
              <tr className="border-b">
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Tenant
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Email
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Role
                </th>


              </tr>
            </thead>

            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="py-12 text-center text-sm text-muted-foreground"
                  >
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b transition-colors hover:bg-muted/30"
                  >
                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                        {user.tenant?.name ?? "System"}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {user.email}
                        </span>

                        <span className="text-xs text-muted-foreground">
                          ID #{user.id}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${user.role === "SUPER_ADMIN"
                          ? "bg-red-100 text-red-700"
                          : user.role === "ADMIN"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                          }`}
                      >
                        {user.role.replace("_", " ")}
                      </span>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}