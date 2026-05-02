import type {
  PaginatedWithSearch,
  PROJECT_STATUS,
  ProjectInput,
  TASK_STATUS,
} from "@/app";
import api, { apiHandler } from "@/shared/utils/api";

export const createProject = apiHandler(
  async (orgId: string, project: ProjectInput) => {
    const res = await api.post(`/orgs/${orgId}/projects`, { ...project });
    return res.data;
  },
);

interface GetProjectsResponse {
  message: string;
  projects: Array<{
    id: string;
    status: PROJECT_STATUS;
    name: string;
    description?: string;
    slug: string;
    startOn: Date;
    dueDate?: Date;
  }>;
}

export const getProjects = apiHandler(
  async (
    orgId: string,
    pagination: PaginatedWithSearch,
    projectStatus?: PROJECT_STATUS | "",
  ) => {
    const res = await api.get<GetProjectsResponse>(`/orgs/${orgId}/projects`, {
      params: { ...pagination, projectStatus },
    });

    return res.data;
  },
);

export const updateProject = apiHandler(
  async (orgId: string, projId: string, data: Partial<ProjectInput>) => {
    const res = await api.patch(`/orgs/${orgId}/projects/${projId}`, {
      ...data,
    });

    return res.data;
  },
);

export const deleteProject = apiHandler(
  async (orgId: string, projId: string) => {
    const res = await api.delete(`/orgs/${orgId}/projects/${projId}`);
    return res.data;
  },
);

export const updateProjectStatus = apiHandler(
  async (orgId: string, projId: string, status: PROJECT_STATUS) => {
    const res = await api.patch(`/orgs/${orgId}/projects/${projId}/status`, {
      status,
    });
    return res.data;
  },
);

interface GetProjectResponse {
  message: string;
  project: {
    id: string;
    name: string;
    description?: string;
    slug: string;
    status: PROJECT_STATUS;
    startOn: Date;
    dueDate?: Date;
    tasksCounts: Record<TASK_STATUS | "total", number>;
    availableActions: PROJECT_STATUS[];
  };
}

export const getProject = apiHandler(async (orgId: string, slug: string) => {
  const res = await api.get<GetProjectResponse>(
    `/orgs/${orgId}/projects/${slug}`,
  );
  return res.data;
});
