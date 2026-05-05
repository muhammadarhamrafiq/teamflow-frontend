import type { Assignee } from "@/app";
import { useProjectContext } from "@/features/projects/context/projectContext";
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
import { useCreateTask } from "../hooks/tasks";
import AssigneePicker from "./AssigneePicker";

interface InputErrors {
  title?: string;
  description?: string;
  startDate?: string;
  dueDate?: string;
}

function validate(
  title: string,
  description: string,
  startDate: Date | null,
  dueDate: Date | null,
) {
  const errors: InputErrors = {};

  if (!title) errors.title = "Valid Title is Required";
  else if (title.length < 3 || title.length > 100)
    errors.title = "Title of task must contain 3 - 100 characters";

  if (description && (description.length < 10 || description.length > 500))
    errors.description = "Description should contain 10 - 500 characters";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (startDate && startDate < today)
    errors.startDate = "Start date cannot be in the past";

  if (dueDate && dueDate < today)
    errors.dueDate = "Due date cannot be in the past";
  else if (startDate && dueDate && startDate > dueDate)
    errors.dueDate = "Due date cannot be before start date";

  return errors;
}

const TaskCreateModal = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState<Assignee | null>(null);
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [inputErrors, setInputErrors] = useState<InputErrors>({});

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const createMutation = useCreateTask();
  const { id: projectId } = useProjectContext();

  function handleModal(open: boolean) {
    if (open) {
      setIsOpen(true);
      return;
    }

    setIsOpen(false);
    setTitle("");
    setDescription("");
    setDueDate(null);
    setStartDate(null);
    setAssignee(null);
    setInputErrors({});
  }

  async function handleSubmit() {
    if (loading) return;

    const errors = validate(title, description, startDate, dueDate);
    if (Object.keys(errors).length > 0) {
      setInputErrors(errors);
      return;
    } else setInputErrors({});

    setLoading(true);

    const res = await createMutation.mutateAsync({
      projectId: projectId,
      payload: {
        title,
        description: description.length > 0 ? description : undefined,
        assigneeId: assignee ? assignee.id : undefined,
        dueDate: dueDate ?? undefined,
        startDate: startDate ?? undefined,
      },
    });

    if (res.error || !res.data) {
      toast.error(res.error || "Something went wrong");
      setLoading(false);
      return;
    }

    setLoading(false);
    handleModal(false);
    toast.success("Task created successfully");
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleModal}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <HugeiconsIcon icon={Add01Icon} />
        </Button>
      </DialogTrigger>
      {/* Modal content goes here */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription>
            Enter the following Details to create new task
          </DialogDescription>
        </DialogHeader>
        <div>
          <InputField
            className="w-full"
            label="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the title for the task"
            error={inputErrors.title}
          />

          <DescriptionInput
            className="w-full mt-2"
            label="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter the description for the task"
            error={inputErrors.description}
          />

          <DatePicker
            date={startDate}
            label="Pick a start date"
            onChange={(date) => setStartDate(date)}
            className="w-full mt-2"
            error={inputErrors.startDate}
          />

          <DatePicker
            date={dueDate}
            label="Pick a due date"
            onChange={(date) => setDueDate(date)}
            className="w-full mt-2"
            error={inputErrors.dueDate}
          />

          <AssigneePicker
            value={assignee}
            onChange={(assignee) => setAssignee(assignee)}
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

export default TaskCreateModal;
