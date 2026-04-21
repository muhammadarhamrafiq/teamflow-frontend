import type { Membership, USER_ROLE } from "@/app";
import Avatar from "@/shared/components/Avatar";
import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { UserRemove01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import clsx from "clsx";
import { useState } from "react";
import { toast } from "sonner";
import { useOrganizationContext } from "../context/organizationContext";
import {
  useGetMembers,
  useRemoveMembership,
  useUpdateMemberShip,
} from "../hooks/useMembers";

const MemberList = ({ search }: { search?: string }) => {
  const { id } = useOrganizationContext();
  const { data, loading, error } = useGetMembers(id, {
    limit: 10,
    search,
  });

  if (loading)
    return (
      <div className="flex items-center justify-center w-full">Loading</div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center w-full">
        Something Went Wrong
      </div>
    );

  if (!data || data.members.length < 1)
    return (
      <div className="flex items-center justify-center w-full">
        Not Member Found
      </div>
    );

  return (
    data &&
    data.members.map((member) => <Member key={member.userId} member={member} />)
  );
};

const Member = ({ member }: { member: Membership }) => {
  return (
    <div className="flex gap-2">
      <Avatar avatar={member.avatarUrl || ""} size="md" iconVariant="USER" />
      <div className="w-full">
        <div className="flex w-full justify-between text-sm font-semibold">
          <h3>{member.name} </h3>
          <RoleBadge role={member.role} userId={member.userId} />
        </div>
        <h4 className="text-xs">{member.email}</h4>
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
          "border px-2 py-px text-xs rounded-full",
          role === "OWNER" && "border-primary/60 text-primary",
          role === "ADMIN" && "border-foreground/60 text-foreground",
          role === "MEMBER" && "border-accent/60 text-accent-foreground",
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
