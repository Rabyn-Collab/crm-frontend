"use client";

import {
  Building2,
  CalendarDays,
  CheckCircle2,
  Globe,
  Mail,
  MapPin,
  Phone,
  Shield,
  Users,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function Tenant() {
  // Static Demo Data
  const tenant = {
    id: 1,
    name: "ABC International School",
    code: "ABC-001",
    email: "admin@abcschool.com",
    phone: "+977 9800000000",
    website: "www.abcschool.com",
    address: "Kathmandu, Nepal",
    status: "ACTIVE",
    createdAt: "22 Jul 2026",
    updatedAt: "25 Jul 2026",
    owner: "John Smith",
    totalUsers: 42,
    admins: 3,
    members: 39,
    customers: 540,
    description:
      "ABC International School is a premium educational institution using the CRM platform to manage students, staff, customers, and daily operations. The organization focuses on secure multi-tenant management and efficient collaboration.",
  };

  return (
    <div className="space-y-6 p-6">
      {/* Hero */}
      <Card className="overflow-hidden border-0 shadow-lg">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-8 text-white">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                <Building2 className="h-10 w-10" />
              </div>

              <div>
                <h1 className="text-3xl font-bold">
                  {tenant.name}
                </h1>

                <p className="mt-1 text-blue-100">
                  Tenant Code: {tenant.code}
                </p>
              </div>
            </div>

            <Badge className="bg-green-500 px-5 py-2 text-white hover:bg-green-500">
              {tenant.status}
            </Badge>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Users"
          value={tenant.totalUsers}
          icon={<Users className="h-6 w-6" />}
        />

        <StatCard
          title="Administrators"
          value={tenant.admins}
          icon={<Shield className="h-6 w-6" />}
        />

        <StatCard
          title="Members"
          value={tenant.members}
          icon={<Users className="h-6 w-6" />}
        />

        <StatCard
          title="Customers"
          value={tenant.customers}
          icon={<Building2 className="h-6 w-6" />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Tenant Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Tenant Information</CardTitle>

            <CardDescription>
              Organization details and contact information.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <InfoRow
              icon={<Building2 className="h-4 w-4" />}
              label="Organization"
              value={tenant.name}
            />

            <Separator />

            <InfoRow
              icon={<Users className="h-4 w-4" />}
              label="Owner"
              value={tenant.owner}
            />

            <Separator />

            <InfoRow
              icon={<Mail className="h-4 w-4" />}
              label="Email"
              value={tenant.email}
            />

            <Separator />

            <InfoRow
              icon={<Phone className="h-4 w-4" />}
              label="Phone"
              value={tenant.phone}
            />

            <Separator />

            <InfoRow
              icon={<Globe className="h-4 w-4" />}
              label="Website"
              value={tenant.website}
            />

            <Separator />

            <InfoRow
              icon={<MapPin className="h-4 w-4" />}
              label="Address"
              value={tenant.address}
            />

            <Separator />

            <InfoRow
              icon={<CalendarDays className="h-4 w-4" />}
              label="Created"
              value={tenant.createdAt}
            />

            <Separator />

            <InfoRow
              icon={<CalendarDays className="h-4 w-4" />}
              label="Last Updated"
              value={tenant.updatedAt}
            />
          </CardContent>
        </Card>

        {/* About */}
        <Card>
          <CardHeader>
            <CardTitle>About Tenant</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <Building2 className="h-8 w-8 text-primary" />
            </div>

            <p className="text-sm leading-7 text-muted-foreground">
              {tenant.description}
            </p>

            <div className="mt-6 rounded-lg border bg-muted/30 p-4">
              <div className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                System Status
              </div>

              <p className="mt-2 text-sm text-muted-foreground">
                Tenant is active and all services are operating
                normally.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <Card className="shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm text-muted-foreground">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {value}
          </h2>
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 text-muted-foreground">
        {icon}
        <span>{label}</span>
      </div>

      <span className="font-medium text-right">{value}</span>
    </div>
  );
}