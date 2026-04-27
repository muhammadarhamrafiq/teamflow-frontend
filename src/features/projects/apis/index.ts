import type { PaginatedWithSearch, PROJECT_STATUS, ProjectInput } from "@/app";
import api, { apiHandler } from "@/shared/utils/api";

export const createProject = apiHandler(
  async (orgId: string, project: ProjectInput) => {
    const res = await api.post(`/orgs/${orgId}/projects`, { ...project });
    return res.data;
  },
);

export const getProjects = apiHandler(
  async (
    orgId: string,
    pagination: PaginatedWithSearch,
    projectStatus?: PROJECT_STATUS | "",
  ) => {
    const res = await api.get(`/orgs/${orgId}/projects`, {
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
    const res = await api.patch(`/orgs/${orgId}/projects/${projId}`, {
      status,
    });
    return res.data;
  },
);

export const getProject = apiHandler(async (orgId: string, slug: string) => {
  const res = await api.get(`/orgs/${orgId}/projects/${slug}`);
  return res.data;
});
