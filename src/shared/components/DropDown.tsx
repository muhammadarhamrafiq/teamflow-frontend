import type { OrgWithRole } from "@/app";
import {
  useDeleteOrganization,
  useLeaveOrganization,
} from "@/features/orgs/hooks/useOrganization";
import {
  Delete02Icon,
  Logout03FreeIcons,
  MoreHorizontal,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import AlertDialog from "./AlertDialog";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const DropDown = ({ organization }: { organization: OrgWithRole }) => {
  const [loading, setLoading] = useState(false);
  const [openLeave, setOpenLeave] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const deleteMutation = useDeleteOrganization();
  const leaveMutation = useLeaveOrganization();

  const navigate = useNavigate();

  async function handleDelete() {
    if (loading) return;
    setLoading(true);
    const res = await deleteMutation.mutateAsync(organization.id);
    if (!res.success) {
      setLoading(false);
      toast.error(res.error);
      return;
    }

    toast.success("Deleted Organization successfully");
    setLoading(false);

    navigate("/dashboard");
  }

  async function handleLeave() {
    if (loading) return;
    setLoading(true);

    const res = await leaveMutation.mutateAsync(organization.id);
    if (!res.success) {
      setLoading(false);
      toast.error(res.error || "Something went wrong");
      return;
    }

    toast.success("Organization left successfully");
    setLoading(false);

    navigate("/dashboard");
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="cursor-pointer">
            <HugeiconsIcon icon={MoreHorizontal} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-fit">
          {/* Leave Organization Button */}
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setOpenLeave(true);
            }}
            className="flex items-center gap-1 cursor-pointer"
          >
            <HugeiconsIcon icon={Logout03FreeIcons} size={16} />
            Leave Organization
          </DropdownMenuItem>

          {/* Delete Organization Btn */}
          {organization.myRole === "OWNER" && (
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                setOpenDelete(true);
              }}
              className="flex items-center gap-1 cursor-pointer"
            >
              <HugeiconsIcon icon={Delete02Icon} size={16} />
              Delete Organization
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Leave Organization Confirmation */}
      <AlertDialog
        open={openLeave}
        heading={`Leave ${organization.name}`}
        description="Are your really sure wanted to leave this organization? This action cannot be undone"
        onOpenChange={setOpenLeave}
        onConfirm={handleLeave}
      />

      {/* Delete Organization Confimation */}
      <AlertDialog
        open={openDelete}
        heading={`Delete ${organization.name}`}
        description="Are your really sure wanted to deleted this organization? This action cannot be undone All the record will be delete and cannot be recovered"
        onOpenChange={setOpenDelete}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default DropDown;
