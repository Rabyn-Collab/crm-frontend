"use client"

import { usePathname } from "next/navigation"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  item,
  label,
}: {
  label?: string
  item: {
    title: string
    url: string
    icon: React.ReactNode
  }
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
      <SidebarMenu>
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton

            href={item.url}
            isActive={pathname === item.url}
            tooltip={item.title}
          >
            {item.icon}
            <span>{item.title}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>

      </SidebarMenu>
    </SidebarGroup>
  )
}
