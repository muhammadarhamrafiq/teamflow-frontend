import type { Organization, USER_ROLE } from "@/app";
import Avatar from "@/shared/components/Avatar";
import InlineEditField from "@/shared/components/InlineEditField";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Delete } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import {
  useDeleteOrganization,
  useUpdateOrganization,
} from "../hooks/useOrganization";

type OrgWithRoleAndDesc = Organization & {
  myRole: USER_ROLE;
  description: string | null;
};

type InputErrors = {
  name?: string;
  description?: string;
};

const OrganizationHero = ({
  organization,
}: {
  organization: OrgWithRoleAndDesc;
}) => {
  const [loading, setLoading] = useState(false);
  const [inputErrors, setInputErrors] = useState<InputErrors>({});
  const navigate = useNavigate();

  const deleteMutation = useDeleteOrganization();
  const updateMutation = useUpdateOrganization();

  async function handleDelete() {
    setLoading(true);
    const res = await deleteMutation.mutateAsync(organization.id);
    if (!res.success) {
      setLoading(false);
      toast.error(res.error);
      return;
    }

    toast.success("Deleted Organization successfully");
    setLoading(false);

    if (res.data) navigate("/dashboard");
  }

  async function handleUpdate({
    name,
    description,
  }: {
    name?: string;
    description?: string;
  }) {
    setLoading(true);
    const errors = validate(name, description);
    if (Object.keys(errors).length > 0) {
      setLoading(false);
      setInputErrors(errors);
      return;
    }

    setInputErrors({});

    const res = await updateMutation.mutateAsync({
      id: organization.id,
      name,
      description,
    });
    if (!res.success || !res.data) {
      setLoading(false);
      toast.error(res.error || "Something went wrong");
      return;
    }

    setLoading(false);
    navigate(`/orgs/${res.data.organization.slug}`);
  }

  return (
    <div className="mx-4 md:mx-8 pb-4">
      <Avatar
        className="float-left mr-4"
        avatar={organization.logoUrl}
        size="lg"
        iconVariant="ORG"
      />

      <div className="flex justify-between">
        <div>
          <InlineEditField
            value={organization.name}
            onSave={(value) => handleUpdate({ name: value })}
            disabled={organization.myRole === "OWNER" ? loading : true}
            error={inputErrors.name}
          />
        </div>
        {organization.myRole === "OWNER" && (
          <DeleteOrganizationButton onConfirm={handleDelete} />
        )}
      </div>

      <InlineEditField
        className="max-w-160"
        value={organization.description || "No Description Available"}
        onSave={(value) => handleUpdate({ description: value })}
        variant="TEXTAREA"
        error={inputErrors.description}
      />
    </div>
  );
};

const DeleteOrganizationButton = ({
  onConfirm,
}: {
  onConfirm: () => Promise<void>;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer" variant={"destructive"}>
          <HugeiconsIcon icon={Delete} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            variant="destructive"
            className="cursor-pointer"
            onClick={async () => {
              await onConfirm();
              setOpen(false);
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

function validate(name?: string, description?: string) {
  const errors: InputErrors = {};

  if (name && (name.trim().length < 3 || name.trim().length > 50))
    errors.name = "Name should must contain 3 to 50 characters";

  if (
    description &&
    description.length > 0 &&
    (description.length < 10 || description.length > 500)
  )
    errors.description = "description should contain 10 to 500 characters";

  return errors;
}

export default OrganizationHero;
