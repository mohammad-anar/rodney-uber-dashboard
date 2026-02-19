
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ReactNode } from "react";
const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {" "}
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 70)",
            "--header-height": "calc(var(--spacing) * 15)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <TooltipProvider>{children}</TooltipProvider>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default CommonLayout;
