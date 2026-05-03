import type {
  CreateTaskPayload,
  PaginatedWithSearch,
  TASK_STATUS,
} from "@/app";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
  updateTaskStatus,
} from "../apis";

export const useGetTasks = (
  projectId: string,
  pagination: PaginatedWithSearch,
  status?: TASK_STATUS,
) => {
  const query = useQuery({
    queryKey: ["tasks", projectId, pagination, status],
    queryFn: async () => {
      const res = await getTasks(projectId, status, pagination);

      if (res.error || !res.data) {
        throw new Error(res.error || "Failed to fetch tasks");
      }

      return res.data.tasks;
    },
  });

  return {
    tasks: query.data,
    loading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      projectId,
      payload,
    }: {
      projectId: string;
      payload: CreateTaskPayload;
    }) => {
      const res = await createTask(projectId, payload);
      return res;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["project"] });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      projectId,
      taskId,
      payload,
    }: {
      projectId: string;
      taskId: string;
      payload: Partial<Omit<CreateTaskPayload, "status">>;
    }) => {
      const res = await updateTask(projectId, taskId, payload);
      return res;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      projectId,
      taskId,
    }: {
      projectId: string;
      taskId: string;
    }) => {
      const res = await deleteTask(projectId, taskId);
      return res;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["project"] });
    },
  });
};

export const useGetTask = (projectId: string, taskId: string) => {
  const query = useQuery({
    queryKey: ["task", projectId, taskId],
    queryFn: async () => {
      const res = await getTask(projectId, taskId);
      if (res.error || !res.data) {
        throw new Error(res.error || "Failed to fetch task");
      }
      return res.data.task;
    },
  });

  return {
    task: query.data,
    loading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
};

export const useUpdateTaskStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      projectId,
      taskId,
      status,
    }: {
      projectId: string;
      taskId: string;
      status: TASK_STATUS;
    }) => {
      const res = await updateTaskStatus(projectId, taskId, status);
      return res;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task"] });
    },
  });
};
