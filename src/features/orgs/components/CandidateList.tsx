import type { Candidate, USER_ROLE } from "@/app";
import Avatar from "@/shared/components/Avatar";
import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  MailAccount01FreeIcons,
  Sent02Icon,
  User,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { toast } from "sonner";
import { useOrganizationContext } from "../context/organizationContext";
import { useCreateInvite, useGetCandidates } from "../hooks/useInvites";

const CandidateList = ({ search }: { search: string }) => {
  // TODO: USE THIS PAGINATION
  const limit = 20;
  const page = 1;
  const { id: orgId } = useOrganizationContext();

  const { candidates, error, loading } = useGetCandidates({
    orgId,
    search,
    page,
    limit,
  });

  if (error) toast.error(error);

  if (loading) return <p>Loading...</p>;

  return candidates.map((cand) => <Candidate key={cand.id} candidate={cand} />);
};

const Candidate = ({ candidate }: { candidate: Candidate }) => {
  const createMutation = useCreateInvite();
  const [loading, setLoading] = useState(false);
  const { id: orgId } = useOrganizationContext();
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<USER_ROLE>("MEMBER");
  const [invatationStatus, setInvitationStatus] = useState(
    candidate.invitationStatus,
  );

  async function handleSendInvite() {
    if (loading) return;
    setLoading(true);
    const res = await createMutation.mutateAsync({
      orgId,
      userId: candidate.id,
      role,
    });
    if (!res.success) {
      toast.error(res.error);
      return;
    }
    toast.success("Invitation Sent");
    setInvitationStatus((prev) => ({ ...prev, invited: true }));
    setRole("MEMBER");
    setLoading(false);
  }

  return (
    <div key={candidate.id} className="flex items-center gap-1">
      <div>
        <Avatar
          avatar={candidate.avatarUrl ?? ""}
          iconVariant="USER"
          size="md"
        />
      </div>
      <div className="w-full flex items-center justify-between">
        <h1 className="text-lg font-semibold">{candidate.name}</h1>
        <span>
          {invatationStatus.isMember ? (
            <span className="w-24 border border-foreground px-2 py-1 rounded-full flex justify-center items-center gap-px">
              <HugeiconsIcon icon={User} size={16} />
              Member
            </span>
          ) : invatationStatus.invited ? (
            <span className="w-24 border border-foreground px-2 py-1 rounded-full flex justify-center items-center gap-px">
              Invite Sent <HugeiconsIcon icon={Sent02Icon} size={16} />
            </span>
          ) : open ? (
            <div className="flex gap-px">
              <Select
                value={role}
                onValueChange={(val: USER_ROLE) => setRole(val)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="OWNER">OWNER</SelectItem>
                  <SelectItem value="ADMIN">ADMIN</SelectItem>
                  <SelectItem value="MEMBER">MEMBER</SelectItem>
                </SelectContent>
              </Select>
              <Button
                className="rounded-full cursor-pointer"
                disabled={loading}
                onClick={handleSendInvite}
              >
                <HugeiconsIcon icon={Sent02Icon} size={16} />
              </Button>
            </div>
          ) : (
            <Button
              className="w-24 rounded-full cursor-pointer"
              disabled={loading}
              onClick={() => setOpen(true)}
            >
              <HugeiconsIcon icon={MailAccount01FreeIcons} size={16} />
              Invite
            </Button>
          )}
        </span>
      </div>
    </div>
  );
};

export default CandidateList;
