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
import { PlayIcon } from "lucide-react";

const data = {
  documents: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      name: "User Management",
      url: "/dashboard/user",
      icon: IconUser,
    },
    {
      name: "Video Tracking",
      url: "/dashboard/video",
      icon: PlayIcon,
    },
    {
      name: "Promo Code",
      url: "/dashboard/promo-code",
      icon: IconBox,
    },
    {
      name: "Support Request",
      url: "/dashboard/support",
      icon: IconHelp,
    },
    {
      name: "Settings",
      url: "/dashboard/settings",
      icon: IconSettings,
    },
    {
      name: "Notifications",
      url: "/dashboard/notification",
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
            <div className="flex items-center max-w-48 w-full mx-auto justify-center px-8 pb-2">
              <Link
                href="/"
                className="block w-full duration-300  overflow-hidden"
              >
                <Image
                  src={logo}
                  className="w-full h-full"
                  width={200}
                  height={200}
                  alt="Zero Proof Driving logo"
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
