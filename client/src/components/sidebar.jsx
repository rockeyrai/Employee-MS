"use client"

import { Home, Users, ShoppingCart, BarChart, Settings, Power, LayoutDashboard } from 'lucide-react'
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import axios from 'axios'

const navItems = [
  { icon: Home, label: "Dashboard", href: "/admin" },
  { icon: Users, label: "Employee", href: "/admin/employee" },
  { icon: LayoutDashboard, label: "Department", href: "/admin/department" },
  { icon: Settings, label: "profile", href: "/admin/profile" },
  // {icon: Power, label:"Logout" ,href:"/"}
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

// Example using fetch
const handleLogout = async () => {

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/logout`,
      {}, // No body required
      { withCredentials: true } // Ensure credentials are sent
    );

    if (response.status === 200) {
      console.log("Logout successful");
      router.push("/");
    }
  } catch (error) {
    console.error("Failed to logout:", error.response?.data || error.message);
  }
};


  return (
    (<ShadcnSidebar>
      <SidebarHeader className="flex items-center justify-center py-4">
        <h1 className="text-2xl font-bold">Admin</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link href={item.href}>
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.label}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
                            <SidebarMenuItem key="logout">
                <SidebarMenuButton onClick={handleLogout}>
                  <Power className="mr-2 h-4 w-4" />
                  Logout
                </SidebarMenuButton>
              </SidebarMenuItem>

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </ShadcnSidebar>)
  );
}

