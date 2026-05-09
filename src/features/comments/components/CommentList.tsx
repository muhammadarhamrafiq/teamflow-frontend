import { useTaskContext } from "@/features/tasks/context/taskContest";
import AlertDialog from "@/shared/components/AlertDialog";
import Avatar from "@/shared/components/Avatar";
import ErrorState from "@/shared/components/ErrorState";
import { SkeletonCommentList } from "@/shared/components/LoadingStates";
import { Button } from "@/shared/components/ui/button";
import { Delete02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { toast } from "sonner";
import { useDeleteComment, useGetComments } from "../hooks/comments";

const CommentList = () => {
  const { id: taskId, myRole } = useTaskContext();
  const { data, loading, error } = useGetComments(taskId, 1, 20);

  if (loading) return <SkeletonCommentList />;
  if (error || !data)
    return (
      <ErrorState
        title="Unable to load comments"
        message="Please refresh the page or try again in a moment."
      />
    );

  return (
    <div className="mt-4">
      {data.comments.map((comment, index) => (
        <div key={comment.id}>
          {index !== 0 && <span className="block h-8 border-l-2 ml-4" />}
          <div className="flex justify-between border py-2 px-3 rounded bg-accent">
            <div className="flex gap-1">
              <Avatar
                avatar={comment.author.avatarUrl ?? ""}
                iconVariant="USER"
                size="sm"
              />
              <div className="flex flex-col gap-0">
                <span className="text-sm capitalize font-semibold">
                  {comment.author.name}
                </span>
                <span className="text-xs text-muted-foreground font-light">
                  {comment.author.email}
                </span>
                <p className="mt-2 text-sm">{comment.message}</p>
              </div>
            </div>
            {(comment.author.byMe ||
              myRole === "ADMIN" ||
              myRole === "OWNER") && <DeleteComment commentId={comment.id} />}
          </div>
        </div>
      ))}
    </div>
  );
};

const DeleteComment = ({ commentId }: { commentId: string }) => {
  const { id: taskId } = useTaskContext();
  const [loading, setLoading] = useState(false);

  const deleteComment = useDeleteComment();

  const handleDelete = async () => {
    if (loading) return;
    setLoading(true);

    const res = await deleteComment.mutateAsync({ taskId, commentId });

    setLoading(false);

    if (res.error) {
      toast.error(res.error || "Failed to delete comment");
      return;
    }

    toast.success("Comment deleted successfully");
  };

  return (
    <AlertDialog
      heading="Delete Comment?"
      description="Are you sure to delete this comment? Its not reversible"
      onConfirm={handleDelete}
    >
      <Button variant="destructive" size="icon" className="cursor-pointer">
        <HugeiconsIcon icon={Delete02Icon} />
      </Button>
    </AlertDialog>
  );
};

export default CommentList;
