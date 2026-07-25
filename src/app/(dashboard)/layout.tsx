import AppSidebar from "@/components/app-sidebar";
import LogOut from "@/components/logout";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import UserInfo from "@/components/user-info";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex">
      <SidebarProvider >
        <AppSidebar />
        <div className="flex flex-col  grow ">
          <header className="mb-4 flex  justify-between border-b bg-white px-6 py-4 shadow-sm w-full">


            <div>

              <div className="flex items-center gap-4">

                <SidebarTrigger />

                <div className="h-8 w-px bg-border" />


                <div>
                  <h1 className="text-2xl font-bold tracking-tight">
                    CRM Dashboard
                  </h1>

                  <p className="text-sm text-muted-foreground">
                    Manage your customers and business data.
                  </p>
                </div>


              </div>
              <UserInfo />
            </div>



            <LogOut />


          </header>

          <main>{children}</main>


        </div>



      </SidebarProvider>
    </div>
  );
}