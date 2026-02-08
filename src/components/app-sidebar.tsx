"use client";

import {
  IconBell,
  IconBox,
  IconDashboard,
  IconHelp,
  IconSettings,
  IconUser,
  IconVideo,
} from "@tabler/icons-react";
import * as React from "react";

import logo from "@/assets/logo.png";
import { NavDocuments } from "@/components/nav-documents";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";

const data = {
  documents: [
    {
      name: "Dashboard",
      url: "/",
      icon: IconDashboard,
    },
    {
      name: "User Management",
      url: "/user",
      icon: IconUser,
    },
    {
      name: "Video Tracking",
      url: "/video",
      icon: IconVideo,
    },
    {
      name: "Promo Code",
      url: "/promo-code",
      icon: IconBox,
    },
    {
      name: "Support Request",
      url: "/support",
      icon: IconHelp,
    },
    {
      name: "Settings",
      url: "/settings",
      icon: IconSettings,
    },
    {
      name: "Notifications",
      url: "/notification",
      icon: IconBell,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            {/* <SidebarMenuButton asChild className=" flex items-center border"> */}
            <div className="flex items-center justify-center px-8 pb-2">
              <Link
                href="/"
                className="block w-full duration-300  overflow-hidden"
              >
                <Image
                  src={logo}
                  className="w-full h-full"
                  width={300}
                  height={300}
                  alt="Zero Proof Driving"
                />
              </Link>
            </div>
            {/* </SidebarMenuButton> */}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* <NavMain items={data.navMain} /> */}
        <NavDocuments items={data.documents} />
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter> */}
    </Sidebar>
  );
}
