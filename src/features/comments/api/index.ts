import type { CommentWithAuthor, Paginated, PaginationResponse } from "@/app";
import api, { apiHandler } from "@/shared/utils/api";

interface CreateCommentResponse {
  message: string;
  comment: Comment;
}

export const createComment = apiHandler(
  async (taskId: string, message: string) => {
    const res = await api.post<CreateCommentResponse>(
      `/tasks/${taskId}/comments`,
      { message },
    );
    return res.data;
  },
);

interface GetCommentsResponse {
  message: string;
  comments: CommentWithAuthor[];
  pagination?: PaginationResponse;
}

export const getComments = apiHandler(
  async (taskId: string, pagination: Paginated) => {
    const res = await api.get<GetCommentsResponse>(
      `/tasks/${taskId}/comments`,
      { params: pagination },
    );
    return res.data;
  },
);

export const deleteComment = apiHandler(
  async (taskId: string, commentId: string) => {
    const res = await api.delete(`/tasks/${taskId}/comments/${commentId}`);
    return res.data;
  },
);
