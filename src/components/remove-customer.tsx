'use client'

import { Button } from "./ui/button"
import { Trash2 } from "lucide-react"

import { Spinner } from "./ui/spinner"
import { toast } from "sonner"
import { useDeleteCustomer } from "@/hooks/use-customer"


export function RemoveCustomer({ id }: { id: number }) {
  const { mutateAsync: removeCustomerAsync, isPending } = useDeleteCustomer();
  const handleRemove = async () => {

    try {
      await removeCustomerAsync(id);
      toast.success("Customer deleted successfully");
    } catch (error) {
      console.error(error);
    }


  }

  return (
    <Button
      variant="destructive"
      size="icon"
      aria-label="Delete customer"
      onClick={handleRemove}
      isDisabled={isPending}
    >
      {isPending ? (
        <Spinner />
      ) : (
        <Trash2 className="h-4 w-4" />
      )}
    </Button>
  )
}