import type { Membership, USER_ROLE } from "@/app";
import Avatar from "@/shared/components/Avatar";
import ErrorState from "@/shared/components/ErrorState";
import { SkeletonList } from "@/shared/components/LoadingStates";
import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import useInfiniteScroll from "@/shared/hooks/use-infinite-scroll";
import { UserRemove01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useOrganizationContext } from "../context/organizationContext";
import {
  useGetMembers,
  useRemoveMembership,
  useUpdateMemberShip,
} from "../hooks/useMembers";

const MemberList = ({ search }: { search?: string }) => {
  const { id } = useOrganizationContext();
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<Membership[]>([]);
  const { data, pagination, loading, error } = useGetMembers(id, {
    limit: pageSize,
    page,
    search,
  });

  useEffect(() => {
    setPage(1);
    setItems([]);
  }, [id, search]);

  useEffect(() => {
    if (!data?.members) return;
    setItems((prev) =>
      page === 1 ? data.members : [...prev, ...data.members],
    );
  }, [data, page]);

  const hasMore = pagination
    ? pagination.page < pagination.totalPages
    : (data?.members.length ?? 0) === pageSize;
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
        title="Unable to load members"
        message="Please refresh or try again in a moment."
      />
    );

  if (items.length < 1)
    return (
      <div className="rounded-lg border border-border bg-background/60 p-4 text-sm text-muted-foreground">
        No members found.
      </div>
    );

  return (
    <>
      {items.map((member) => (
        <Member key={member.userId} member={member} />
      ))}
      {loading ? <SkeletonList count={2} className="mt-3" /> : null}
      {error ? (
        <ErrorState
          className="mt-3"
          title="Unable to load more members"
          message="Please try again in a moment."
        />
      ) : null}
      {hasMore ? <div ref={sentinelRef} className="h-1" /> : null}
    </>
  );
};

const Member = ({ member }: { member: Membership }) => {
  return (
    <div className="flex gap-2 mt-2">
      <Avatar avatar={member.avatarUrl || ""} size="md" iconVariant="USER" />
      <div className="w-full">
        <div className="flex w-full justify-between text-sm font-semibold">
          <div>
            <h3 className="capitalize">{member.name} </h3>
            <h4 className="text-xs text-muted-foreground font-light">
              {member.email}
            </h4>
          </div>
          <RoleBadge role={member.role} userId={member.userId} />
        </div>
      </div>
    </div>
  );
};

const RoleBadge = ({ role, userId }: { role: USER_ROLE; userId: string }) => {
  const [loading, setLoading] = useState(false);
  const { myRole, id } = useOrganizationContext();

  const updateMutation = useUpdateMemberShip();
  const deleteMutation = useRemoveMembership();

  const isOwner = myRole === "OWNER";

  async function updateMember(value: USER_ROLE) {
    if (loading) return;

    setLoading(true);

    const res = await updateMutation.mutateAsync({
      orgId: id,
      role: value,
      userId,
    });
    if (!res.success) {
      toast.error(res.error || "Something Went Wrong");
      setLoading(false);
      return;
    }

    toast.success("Updated user role");
    setLoading(false);
  }

  async function deleteMember() {
    if (loading) return;

    setLoading(true);
    const res = await deleteMutation.mutateAsync({ orgId: id, userId });
    if (!res.success) {
      toast.error(res.error || "Something Went Wrong");
      setLoading(false);
      return;
    }

    toast.success("User Removed Successfully");
    setLoading(false);
  }

  if (!isOwner) {
    return (
      <span
        className={clsx(
          "border px-2 py-px text-xs rounded-full h-fit",
          role === "OWNER" && "border-primary text-primary",
          role === "ADMIN" && "border-foreground text-foreground",
          role === "MEMBER" && "border-muted-foreground text-muted-foreground",
        )}
      >
        {role}
      </span>
    );
  }

  return (
    <div className="flex gap-1">
      <Select value={role} onValueChange={updateMember}>
        <SelectTrigger
          className={clsx(
            "border px-2 py-px text-xs rounded-full [&>svg]:hidden cursor-pointer",
            role === "OWNER" && "border-primary/60 text-primary",
            role === "ADMIN" && "border-foreground/60 text-foreground",
            role === "MEMBER" &&
              "border-accent/60 text-accent-foreground bg-accent",
          )}
        >
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="OWNER">OWNER</SelectItem>
          <SelectItem value="ADMIN">ADMIN</SelectItem>
          <SelectItem value="MEMBER">MEMBER</SelectItem>
        </SelectContent>
      </Select>
      <Button
        variant={"outline"}
        className="rounded-full cursor-pointer"
        onClick={deleteMember}
      >
        <HugeiconsIcon icon={UserRemove01Icon} />
      </Button>
    </div>
  );
};
export default MemberList;
