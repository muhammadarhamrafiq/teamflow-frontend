import { useAuthStore } from "@/app/providers/user";
import SearchBar from "@/shared/components/SearchBar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/shared/components/ui/sidebar";
import { Add } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import Avatar from "../Avatar";
import LogoWithText from "../LogoWithText";
import OrganizationList from "../OrganizationList";
import ThemeSwitch from "../ThemeSwitch";
import { Sidebar, SidebarContent, SidebarHeader } from "../ui/sidebar";

export default function Layout() {
  return (
    <SidebarProvider>
      <DashBoardSidebar />
      <SidebarInset>
        <DashboardNavbar />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}

const DashBoardSidebar = () => {
  const [search, setSearch] = useState("");
  const location = useLocation();
  const { setOpenMobile } = useSidebar();

  useEffect(() => {
    setOpenMobile(false);
  }, [location.pathname, setOpenMobile]);

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <Link to={"/dashboard"}>
          <LogoWithText size="lg" className="py-2" />
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-px mt-4">
        <div className="flex gap-1">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Link
            to={"orgs/add"}
            className="flex items-center justify-center h-7 w-7 border border-input rounded-md hover:bg-accent"
          >
            <HugeiconsIcon icon={Add} size={16} />
          </Link>
        </div>
        <OrganizationList search={search} />
      </SidebarContent>
    </Sidebar>
  );
};

const DashboardNavbar = () => {
  const { user } = useAuthStore.getState();

  return (
    <nav className="px-4 py-4 md:px-8 flex items-center justify-between md:justify-end">
      {/* Logo only on Mobile Screens */}
      <div className="md:hidden">
        <Link to={"/dashboard"}>
          <LogoWithText size="md" className="py-2" />
        </Link>
      </div>

      {/* Action Btns */}
      <div className="flex items-center">
        <SidebarTrigger
          className="rounded-md hover:bg-accent flex items-center justify-center cursor-pointer md:size-8 md:[&_svg:not([class*='size-'])]:size-4"
          size={"icon"}
        />
        <div>
          <ThemeSwitch />
        </div>
        <div className="ml-1">
          <Link to={"/profile"}>
            <Avatar
              avatar={user?.avatarUrl || null}
              iconVariant="USER"
              size="md"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};
