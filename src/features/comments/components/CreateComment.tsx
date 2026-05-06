import { useAuthStore } from "@/app/providers/user";
import { useTaskContext } from "@/features/tasks/context/taskContest";
import Avatar from "@/shared/components/Avatar";
import DescriptionInput from "@/shared/components/DescriptionInput";
import { Button } from "@/shared/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useCreateComment } from "../hooks/comments";

const CreateComment = () => {
  const { user } = useAuthStore();
  const { id: taskId } = useTaskContext();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");

  const createComment = useCreateComment();

  const handleCreate = async () => {
    if (loading) return;

    if (message.trim().length > 500) {
      setMessageError("Comment cannot be more than 500 characters");
      return;
    }

    setLoading(true);

    const res = await createComment.mutateAsync({
      taskId,
      message: message.trim(),
    });

    if (res.error) {
      toast.error(res.error);
      setLoading(false);
      return;
    }

    setMessage("");
    setLoading(false);
    toast.success("Comment created successfully");
  };

  return (
    <div className="mt-4">
      <div className="flex gap-1">
        <Avatar avatar={user?.avatarUrl ?? ""} iconVariant="USER" size="sm" />
        <div className="flex flex-col gap-0">
          <span className="text-sm capitalize font-semibold">
            {user?.name || "unkown"}
          </span>
          <span className="text-xs text-muted-foreground font-light">
            {user?.email || "unkown@domain.com"}
          </span>
        </div>
      </div>
      <DescriptionInput
        label="Comment"
        placeholder="Add Comment"
        className="w-full mt-2"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={loading}
        error={messageError}
      />
      <div className="flex justify-end mt-1 gap-1">
        <Button
          variant={"secondary"}
          className="cursor-pointer"
          disabled={loading || message.trim() === ""}
          onClick={() => setMessage("")}
        >
          Clear
        </Button>
        <Button
          className="cursor-pointer"
          disabled={loading || message.trim() === ""}
          onClick={handleCreate}
        >
          Add Comment
        </Button>
      </div>
    </div>
  );
};

export default CreateComment;
