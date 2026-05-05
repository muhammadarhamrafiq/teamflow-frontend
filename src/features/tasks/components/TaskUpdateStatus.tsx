import type { TASK_STATUS } from "@/app";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import { useTaskContext } from "../context/taskContest";
import { useUpdateTaskStatus } from "../hooks/tasks";
import TaskStatusBadge from "./TaskStatusBadge";

const TaskUpdateStatus = ({
  availableActions,
}: {
  availableActions: TASK_STATUS[];
}): React.ReactNode => {
  const { id, projectId, taskStatus } = useTaskContext();
  const actions = Array.from(new Set([taskStatus, ...availableActions]));
  const canUpdateStatus = availableActions.length > 0;
  const [loading, setLoading] = useState(false);

  const updateStatusMutation = useUpdateTaskStatus();

  async function handleUpdateStatus(newStatus: TASK_STATUS) {
    setLoading(false);

    const res = await updateStatusMutation.mutateAsync({
      taskId: id,
      projectId,
      status: newStatus,
    });

    if (res.error) {
      setLoading(false);
      toast.error(res.error || "Failed to update task status");
      return;
    }

    toast.success("Task status updated successfully");
    setLoading(false);
  }

  return (
    <Select
      value={taskStatus}
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
            <TaskStatusBadge status={action} />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TaskUpdateStatus;
