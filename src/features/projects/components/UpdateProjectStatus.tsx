import type { PROJECT_STATUS } from "@/app";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import { useProjectContext } from "../context/projectContext";
import { useUpdateProjectStatus } from "../hooks/projects";
import ProjectStatusBadge from "./ProjectStatusBadge";

const UpdateProjectStatus = ({
  availableActions,
}: {
  availableActions: PROJECT_STATUS[];
}): React.ReactNode => {
  const { status, myRole, orgId, id } = useProjectContext();
  const actions = Array.from(new Set([status, ...availableActions]));
  const canUpdateStatus = availableActions.length > 0;
  const [loading, setLoading] = useState(false);

  const updateStatusMutation = useUpdateProjectStatus();

  if (myRole === "MEMBER") return <ProjectStatusBadge status={status} />;

  async function handleUpdateStatus(newStatus: PROJECT_STATUS) {
    setLoading(false);

    const res = await updateStatusMutation.mutateAsync({
      orgId,
      projId: id,
      status: newStatus,
    });

    if (res.error) {
      setLoading(false);
      toast.error(res.error || "Failed to update project status");
      return;
    }

    toast.success("Project status updated successfully");
    setLoading(false);
  }

  return (
    <Select
      value={status}
      disabled={!canUpdateStatus || loading}
      onValueChange={handleUpdateStatus}
    >
      <SelectTrigger className="justify-between" aria-label="Project status">
        <SelectValue placeholder="No available actions" />
      </SelectTrigger>
      <SelectContent align="end">
        {actions.map((action) => (
          <SelectItem
            key={action}
            value={action}
            disabled={action === status || !availableActions.includes(action)}
          >
            <ProjectStatusBadge status={action} />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default UpdateProjectStatus;
