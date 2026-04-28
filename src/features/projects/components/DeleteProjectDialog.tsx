import { useOrganizationContext } from "@/features/orgs/context/organizationContext";
import AlertDialog from "@/shared/components/AlertDialog";
import { Button } from "@/shared/components/ui/button";
import { Delete02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { toast } from "sonner";
import { useDeleteProject } from "../hooks/projects";

const DeleteProject = ({ projId }: { projId: string }) => {
  const deleteMutation = useDeleteProject();
  const { id: orgId } = useOrganizationContext();

  const deleteOrganization = async () => {
    const res = await deleteMutation.mutateAsync({
      orgId,
      projId,
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

export default DeleteProject;
