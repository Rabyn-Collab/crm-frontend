"use client";

import { LogOutIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useLogout } from "@/hooks/use-auth";
import { Spinner } from "./ui/spinner";
import { useAuth } from "@/lib/auth-context";

export default function LogOut() {

  const router = useRouter();
  const { isPending, isError, mutateAsync } = useLogout();
  const { logout: authLogout } = useAuth();

  async function handleLogout() {

    try {
      await mutateAsync();
      authLogout();
      router.replace('/login');
    } catch (err) {

    }


  }

  return (
    <Button isDisabled={isPending} variant="outline" onClick={() => handleLogout()}>
      <LogOutIcon className="mr-2 h-4 w-4" />
      {isPending ? <Spinner /> : 'Logout'}
    </Button>
  );
}