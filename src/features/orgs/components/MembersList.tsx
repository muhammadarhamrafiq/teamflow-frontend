import type { Membership } from "@/app";
import Avatar from "@/shared/components/Avatar";
import clsx from "clsx";
import { useGetMembers } from "../hooks/useMembers";

const MemberList = ({ search, id }: { id: string; search?: string }) => {
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
        <h3 className="flex w-full justify-between text-sm font-semibold">
          {member.name}{" "}
          <span
            className={clsx(
              "border px-2 py-px text-xs font-extralight rounded-full",
              member.role === "OWNER" && "border-primary/60 text-primary",
              member.role === "ADMIN" && "border-foreground/60 text-foreground",
              member.role === "MEMBER" &&
                "border-accend/60 text-accent-foreground",
            )}
          >
            {member.role}
          </span>
        </h3>
        <h4 className="text-xs">{member.email}</h4>
      </div>
    </div>
  );
};

export default MemberList;
