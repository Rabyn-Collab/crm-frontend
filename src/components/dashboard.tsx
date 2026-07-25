
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import AddMember from "./add-member"
import CustomerList from "./customer/customer-list"

export default function dashboard() {


  return (
    <div className="px-5">
      <Card className="shadow-sm">
        {/* Header */}
        <CardHeader className="flex flex-col gap-4 border-b bg-muted/30 px-6 py-5 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle className="text-2xl font-bold tracking-tight">
              Customers
            </CardTitle>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage your customer records and keep information up to date.
            </p>


          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">


            <div className="flex items-center gap-2">
              <Link href="/customers/new">
                <Button className="shadow-sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Customer
                </Button>
              </Link>

              <AddMember />
            </div>
          </div>
        </CardHeader>
        <CustomerList />


      </Card>
    </div>
  )
}


