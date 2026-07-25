'use client';
import Dashboard from "@/components/dashboard";
import SuperAdmin from "@/components/super-admin/super-admin";
import { useAuth } from "@/lib/auth-context";

export default function DashboardPage() {
  const { user } = useAuth();
  if (user === null) {
    return <div>Loading...</div>;
  }
  if (user?.role === "SUPER_ADMIN") {

    return (
      <div className="px-5">
        <SuperAdmin />
      </div>
    );
  } else {
    return <Dashboard />;
  }
}
