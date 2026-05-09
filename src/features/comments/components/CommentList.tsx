import type { CommentWithAuthor } from "@/app";
import { useTaskContext } from "@/features/tasks/context/taskContest";
import AlertDialog from "@/shared/components/AlertDialog";
import Avatar from "@/shared/components/Avatar";
import ErrorState from "@/shared/components/ErrorState";
import { SkeletonCommentList } from "@/shared/components/LoadingStates";
import { Button } from "@/shared/components/ui/button";
import useInfiniteScroll from "@/shared/hooks/use-infinite-scroll";
import { Delete02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useDeleteComment, useGetComments } from "../hooks/comments";

const CommentList = () => {
  const { id: taskId, myRole } = useTaskContext();
  const pageSize = 20;
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<CommentWithAuthor[]>([]);
  const { comments, pagination, loading, error } = useGetComments(
    taskId,
    page,
    pageSize,
  );

  useEffect(() => {
    setPage(1);
    setItems([]);
  }, [taskId]);

  useEffect(() => {
    if (!comments) return;
    setItems((prev) => (page === 1 ? comments : [...prev, ...comments]));
  }, [comments, page]);

  const hasMore = pagination
    ? pagination.page < pagination.totalPages
    : (comments?.length ?? 0) === pageSize;
  const handleLoadMore = useCallback(() => {
    if (loading || !hasMore) return;
    setPage((prev) => prev + 1);
  }, [hasMore, loading]);

  const sentinelRef = useInfiniteScroll({
    hasMore,
    isLoading: loading,
    onLoadMore: handleLoadMore,
  });

  if (loading && items.length === 0) return <SkeletonCommentList />;
  if (error && items.length === 0)
    return (
      <ErrorState
        title="Unable to load comments"
        message="Please refresh the page or try again in a moment."
      />
    );

  return (
    <div className="mt-4">
      {items.map((comment, index) => (
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
      {loading ? <SkeletonCommentList count={2} className="mt-4" /> : null}
      {error ? (
        <ErrorState
          className="mt-4"
          title="Unable to load more comments"
          message="Please try again in a moment."
        />
      ) : null}
      {hasMore ? <div ref={sentinelRef} className="h-1" /> : null}
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
