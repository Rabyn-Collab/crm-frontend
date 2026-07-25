'use client';

import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";


import { useAuth } from "@/lib/auth-context";

export default function AddMember() {
  const { user } = useAuth();


  // Only admins can see this button
  if (user?.role !== "ADMIN") {
    return null;
  }

  return (
    <Link href="/members/new">
      <Button variant="outline" className="shadow-sm">
        <Plus className="mr-2 h-4 w-4" />
        Add Member
      </Button>
    </Link>
  );
}