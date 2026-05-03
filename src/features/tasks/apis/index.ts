import type {
  CreateTaskPayload,
  PaginatedWithSearch,
  PaginationResponse,
  TaskBase,
  TaskWithAssignee,
  TaskWithFullDetails,
  TaskWithUpdate,
} from "@/app";
import api, { apiHandler } from "@/shared/utils/api";

interface CreateTasksResponse {
  message: string;
  task: TaskBase;
}

export const createTask = apiHandler(
  async (projectId: string, payload: CreateTaskPayload) => {
    const res = await api.post<CreateTasksResponse>(
      `/projects/${projectId}/tasks`,
      payload,
    );

    return res.data;
  },
);

interface GetTasksRespone {
  message: string;
  tasks: TaskWithAssignee;
  pagination: PaginationResponse;
}

export const getTasks = apiHandler(
  async (
    projectId: string,
    status?: string,
    pagination?: PaginatedWithSearch,
  ) => {
    const res = await api.get<GetTasksRespone>(`/projects/${projectId}/tasks`, {
      params: {
        status,
        ...pagination,
      },
    });

    return res.data;
  },
);

interface GetTaskResponse {
  message: string;
  task: TaskWithFullDetails;
}

export const getTask = apiHandler(async (projectId: string, taskId: string) => {
  const res = await api.get<GetTaskResponse>(
    `/projects/${projectId}/tasks/${taskId}`,
  );
  return res.data;
});

interface UpdateTaskResponse {
  message: string;
  task: TaskWithUpdate;
}

export const updateTask = apiHandler(
  async (
    projectId: string,
    taskId: string,
    paload: Partial<Omit<CreateTaskPayload, "status">>,
  ) => {
    const res = await api.patch<UpdateTaskResponse>(
      `/projects/${projectId}/tasks/${taskId}`,
      paload,
    );
    return res.data;
  },
);

export const deleteTask = apiHandler(
  async (projectId: string, taskId: string) => {
    const res = await api.delete<UpdateTaskResponse>(
      `/projects/${projectId}/tasks/${taskId}`,
    );
    return res.data;
  },
);

export const updateTaskStatus = apiHandler(
  async (projectId: string, taskId: string, status: string) => {
    const res = await api.patch<UpdateTaskResponse>(
      `/projects/${projectId}/tasks/${taskId}/status`,
      { status },
    );
    return res.data;
  },
);
