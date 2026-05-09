import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createComment, deleteComment, getComments } from "../api";

export const useGetComments = (taskId: string, page: number, limit: number) => {
  const query = useQuery({
    queryKey: ["comments", taskId, page, limit],
    queryFn: async () => {
      const res = await getComments(taskId, {
        page,
        limit,
      });

      if (res.error || !res.data)
        throw new Error(res.error || "Failed to fetch comments");

      return res.data;
    },
  });

  return {
    comments: query.data?.comments,
    pagination: query.data?.pagination,
    data: query.data,
    loading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      taskId,
      message,
    }: {
      taskId: string;
      message: string;
    }) => {
      const res = await createComment(taskId, message);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      taskId,
      commentId,
    }: {
      taskId: string;
      commentId: string;
    }) => {
      const res = await deleteComment(taskId, commentId);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
};
