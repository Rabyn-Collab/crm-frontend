"use client";

import Link from "next/link";
import {
  Building2,
  LayoutDashboard,
  Users,
  Settings,
  Shield,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    active: true,
  },

  {
    title: "Tenant",
    href: "/tenant",
    icon: Building2,
  },

];

export default function AppSidebar(
  props: React.ComponentProps<typeof Sidebar>,
) {
  return (
    <Sidebar
      collapsible="icon"
      className="border-r bg-background"
      {...props}
    >
      <SidebarHeader className="border-b px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Shield className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-lg font-bold">
              CRM Pro
            </h2>

            <p className="text-xs text-muted-foreground">
              Multi-Tenant CRM
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-5">
        <SidebarMenu>
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavMain
                key={item.title}
                item={{
                  title: item.title,
                  url: item.href,
                  icon: <Icon className="h-5 w-5" />,
                }}
              />
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="rounded-lg border bg-muted/40 p-3">
          <p className="text-sm font-medium">
            CRM Pro
          </p>

          <p className="text-xs text-muted-foreground">
            Version 1.0.0
          </p>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}