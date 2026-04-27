import type { USER_ROLE } from "@/app";
import { useAuthStore } from "@/app/providers/user";
import {
  useAcceptInvite,
  useMembershipInvites,
  useRejectInvite,
} from "@/features/profile/hooks/useUserInvites";
import SearchBar from "@/shared/components/SearchBar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/shared/components/ui/sidebar";
import {
  Add,
  CancelIcon,
  Envelope,
  Tick01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { toast } from "sonner";
import Avatar from "../Avatar";
import LogoWithText from "../LogoWithText";
import OrganizationList from "../OrganizationList";
import ThemeSwitch from "../ThemeSwitch";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
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
        <UserInvitationSheet />
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

const UserInvitationSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant={"ghost"}
          className="rounded-md hover:bg-accent flex items-center justify-center cursor-pointer md:size-8 md:[&_svg:not([class*='size-'])]:size-4"
          size={"icon"}
        >
          <HugeiconsIcon icon={Envelope} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Invitations</SheetTitle>
          <SheetDescription>
            See and manage the invitation for membership in different
            organizations
          </SheetDescription>
          <div>
            <MemberShipInvitationsList />
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

const MemberShipInvitationsList = () => {
  const { loading, error, data } = useMembershipInvites();

  if (loading) return <span>Loading...</span>;

  if (error || !data) return <span>Something Went Wrong</span>;

  return (
    <span>
      {data.invitations.map((inv) => (
        <MembershipInvite key={inv.id} invitation={inv} />
      ))}
    </span>
  );
};

interface Invitation {
  id: string;
  organizationName: string;
  organizationLogo: string | null;
  invitedOn: Date;
  role: USER_ROLE;
}

const MembershipInvite = ({ invitation }: { invitation: Invitation }) => {
  const acceptMutation = useAcceptInvite();
  const rejectMutation = useRejectInvite();

  const handleAccept = async () => {
    const res = await acceptMutation.mutateAsync({ id: invitation.id });
    if (res.error) return toast.error(res.error || "Something Went wrong");

    toast.success("Invitation Accepted");
  };

  const handleReject = async () => {
    const res = await rejectMutation.mutateAsync({ id: invitation.id });
    if (res.error) return toast.error(res.error || "Something Went wrong");

    toast.success("Invitation Rejected");
  };

  return (
    <div className="flex items-center gap-1 mt-2">
      <Avatar
        avatar={invitation.organizationLogo || ""}
        size="sm"
        iconVariant="USER"
      />
      <div className="flex justify-between w-full">
        <h1 className="text-lg font-semibold">{invitation.organizationName}</h1>
        <div className="flex gap-1 cursor-pointer">
          <Button
            variant={"destructive"}
            className="rounded-full cursor-pointer"
            onClick={handleReject}
          >
            <HugeiconsIcon icon={CancelIcon} />
          </Button>
          <Button
            className="rounded-full cursor-pointer"
            onClick={handleAccept}
          >
            <HugeiconsIcon icon={Tick01Icon} />
          </Button>
        </div>
      </div>
    </div>
  );
};
