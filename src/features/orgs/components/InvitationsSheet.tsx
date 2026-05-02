import type { Invitation } from "@/app";
import Avatar from "@/shared/components/Avatar";
import SearchBar from "@/shared/components/SearchBar";
import { Button } from "@/shared/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import { ArrowUpRight } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { toast } from "sonner";
import { useOrganizationContext } from "../context/organizationContext";
import { useCancelInvite, useInvites } from "../hooks/useInvites";
import CreateInvitationModal from "./CreateInvitationModal";

const InvitationsSheet = () => {
  const [search, setSearch] = useState("");

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"sm"} className="cursor-pointer">
          Invitations <HugeiconsIcon icon={ArrowUpRight} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Invitations</SheetTitle>
          <SheetDescription>
            Manage and invite the users to your organization
          </SheetDescription>
        </SheetHeader>
        <div className="mx-6 flex gap-1 items-center">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <CreateInvitationModal />
        </div>
        <div className="mx-6">
          <InvitesList search={search} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

const InvitesList = ({ search }: { search: string }) => {
  // TODO: USE THE PAGINATION PROPERLY
  const { id: orgId } = useOrganizationContext();
  const page = 1;
  const limit = 20;

  const { data, loading, error } = useInvites(orgId, { limit, page, search });

  if (error) toast.error(error?.message || "Something went wrong");

  if (loading) return <span>Loading</span>;

  return (
    <>
      {data?.invites.map((inv) => (
        <InvitatedUser key={inv.id} invitation={inv} />
      ))}
    </>
  );
};

const InvitatedUser = ({ invitation }: { invitation: Invitation }) => {
  const { id: orgId } = useOrganizationContext();
  const [loading, setLoading] = useState(false);
  const cancelMutation = useCancelInvite();

  async function handleCancellation() {
    if (loading) return;
    setLoading(true);

    const res = await cancelMutation.mutateAsync({
      orgId,
      invitationId: invitation.id,
    });

    if (res.error || !res.success) {
      toast.error("Something went wrong will cancelling the invite");
      setLoading(false);
      return;
    }

    toast.success("Invitation Cancelled");
    setLoading(false);
  }

  return (
    <div className="flex items-center gap-2 mt-2">
      <Avatar
        avatar={invitation.avatarUrl || ""}
        size="sm"
        iconVariant="USER"
      />
      <div className="flex justify-between w-full">
        <h1 className="text-md font-semibold capitalize">{invitation.name}</h1>
        <Button
          variant={"outline"}
          size={"xs"}
          className="cursor-pointer border-destructive text-destructive hover:text-destructive hover:scale-98"
          onClick={handleCancellation}
        >
          Cancel Invitation
        </Button>
      </div>
    </div>
  );
};

export default InvitationsSheet;
