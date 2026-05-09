import type { Invitation } from "@/app";
import Avatar from "@/shared/components/Avatar";
import ErrorState from "@/shared/components/ErrorState";
import { SkeletonList } from "@/shared/components/LoadingStates";
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
import useInfiniteScroll from "@/shared/hooks/use-infinite-scroll";
import { ArrowUpRight } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useCallback, useEffect, useState } from "react";
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
  const { id: orgId } = useOrganizationContext();
  const pageSize = 20;
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<Invitation[]>([]);
  const limit = pageSize;

  const { invites, pagination, loading, error } = useInvites(orgId, {
    limit,
    page,
    search,
  });

  if (error) toast.error(error?.message || "Something went wrong");

  useEffect(() => {
    setPage(1);
    setItems([]);
  }, [orgId, search]);

  useEffect(() => {
    if (!invites) return;
    setItems((prev) => (page === 1 ? invites : [...prev, ...invites]));
  }, [invites, page]);

  const hasMore = pagination
    ? pagination.page < pagination.totalPages
    : (invites?.length ?? 0) === pageSize;
  const handleLoadMore = useCallback(() => {
    if (loading || !hasMore) return;
    setPage((prev) => prev + 1);
  }, [hasMore, loading]);

  const sentinelRef = useInfiniteScroll({
    hasMore,
    isLoading: loading,
    onLoadMore: handleLoadMore,
  });

  if (loading && items.length === 0) return <SkeletonList count={4} />;

  if (error && items.length === 0)
    return (
      <ErrorState
        title="Unable to load invitations"
        message="Please try again in a moment."
      />
    );

  if (items.length === 0)
    return (
      <div className="rounded-lg border border-border bg-background/60 p-4 text-sm text-muted-foreground">
        No invitations found.
      </div>
    );

  return (
    <>
      {items.map((inv) => (
        <InvitatedUser key={inv.id} invitation={inv} />
      ))}
      {loading ? <SkeletonList count={2} className="mt-3" /> : null}
      {error ? (
        <ErrorState
          className="mt-3"
          title="Unable to load more invitations"
          message="Please try again in a moment."
        />
      ) : null}
      {hasMore ? <div ref={sentinelRef} className="h-1" /> : null}
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
