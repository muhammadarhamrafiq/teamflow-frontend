import { useProjectContext } from "@/features/projects/context/projectContext";
import AlertDialog from "@/shared/components/AlertDialog";
import { Button } from "@/shared/components/ui/button";
import { Delete02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { toast } from "sonner";
import { useDeleteTask } from "../hooks/tasks";

const DeleteTaskDialog = ({ taskId }: { taskId: string }) => {
  const deleteMutation = useDeleteTask();
  const { id: projectId } = useProjectContext();

  const deleteOrganization = async () => {
    const res = await deleteMutation.mutateAsync({
      projectId,
      taskId,
    });

    if (!res.success) {
      toast.error(res.error || "Failed to delete project");
      return;
    }

    toast.success("Project deleted successfully");
  };

  return (
    <AlertDialog
      heading="Delete Organization"
      description="Are your Sure you want to delete this organization? This action cannot be undone"
      onConfirm={deleteOrganization}
    >
      <Button
        className="cursor-pointer"
        variant={"destructive"}
        size={"icon-sm"}
      >
        <HugeiconsIcon icon={Delete02Icon} />
      </Button>
    </AlertDialog>
  );
};

export default DeleteTaskDialog;
