import { useOrganizationContext } from "@/features/orgs/context/organizationContext";
import { useCreateProject } from "@/features/projects/hooks/projects";
import DatePicker from "@/shared/components/DatePicker";
import DescriptionInput from "@/shared/components/DescriptionInput";
import InputField from "@/shared/components/InputField";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Add01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { toast } from "sonner";

interface InputErrors {
  name?: string;
  description?: string;
  dueDate?: string;
}

const ProjectCreateModal = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [inputErrors, setInputErrors] = useState<InputErrors>({});

  const [isOpen, setIsOpen] = useState(false);

  const createMutation = useCreateProject();
  const { id: orgId } = useOrganizationContext();

  function handleModal(open: boolean) {
    if (open) {
      setIsOpen(true);
      return;
    }

    setIsOpen(false);
    setName("");
    setDescription("");
    setDueDate(null);
    setInputErrors({});
  }

  function validate() {
    const errors: InputErrors = {};

    if (!name) errors.name = "Valid Name is Required";
    else if (name.length < 3 || name.length > 25)
      errors.name = "Name of project must contain 3 - 25 characters";

    if (description && (description.length < 10 || description.length > 500))
      errors.description = "Description should contain 10 - 500 characters";

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (dueDate && dueDate < today) {
      errors.dueDate = "Due date cannot be in the past";
    }

    return errors;
  }

  async function handleSubmit() {
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setInputErrors(errors);
      return;
    } else setInputErrors({});

    setLoading(true);

    const res = await createMutation.mutateAsync({
      orgId: orgId,
      project: {
        name,
        description: description.length > 0 ? description : undefined,
        dueDate: dueDate ? dueDate : undefined,
      },
    });

    if (res.error || !res.data) {
      toast.error(res.error || "Something Went wrong");
      setLoading(false);
      return;
    }

    setLoading(false);
    handleModal(false);
    toast.success("Project created successfully");
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleModal}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <HugeiconsIcon icon={Add01Icon} />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-sm">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Enter the following Details to create a new Project
          </DialogDescription>
        </DialogHeader>
        <div>
          <InputField
            className="w-full"
            label="Project Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter project name"
            error={inputErrors.name}
            disabled={loading}
          />
          <DescriptionInput
            className="w-full mt-2"
            label="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter project description"
            disabled={loading}
            error={inputErrors.description}
          />
          <DatePicker
            date={dueDate}
            onChange={(date) => setDueDate(date)}
            className="w-full mt-2"
            error={inputErrors.dueDate}
          />
        </div>
        <DialogFooter>
          <Button
            className="cursor-pointer"
            variant="outline"
            onClick={() => handleModal(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            className="cursor-pointer"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectCreateModal;
