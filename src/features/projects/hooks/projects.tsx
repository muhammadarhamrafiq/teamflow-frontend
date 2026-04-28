import type { PaginatedWithSearch, PROJECT_STATUS, ProjectInput } from "@/app";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  updateProject,
  updateProjectStatus,
} from "../apis";

export const useGetProjects = (
  orgId: string,
  paginated: PaginatedWithSearch,
  projectStatus?: PROJECT_STATUS | "",
) => {
  const query = useQuery({
    queryKey: [
      "Projects",
      orgId,
      paginated.page,
      paginated.limit,
      paginated.search,
      projectStatus,
    ],
    queryFn: async () => {
      const res = await getProjects(orgId, { ...paginated }, projectStatus);

      if (res.error || !res.data)
        throw new Error(res.error || "Something Went wrong");

      return res.data.projects;
    },
  });

  return {
    projects: query.data,
    loading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      orgId,
      project,
    }: {
      orgId: string;
      project: ProjectInput;
    }) => {
      const res = await createProject(orgId, project);

      return res;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Projects"] });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      orgId,
      projId,
    }: {
      orgId: string;
      projId: string;
    }) => {
      const res = await deleteProject(orgId, projId);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Projects"] });
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      orgId,
      projId,
      data,
    }: {
      orgId: string;
      projId: string;
      data: Partial<ProjectInput>;
    }) => {
      const res = await updateProject(orgId, projId, data);
      return res;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Projects"] });
    },
  });
};

export const useUpdateProjectStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      orgId,
      projId,
      status,
    }: {
      orgId: string;
      projId: string;
      status: PROJECT_STATUS;
    }) => {
      const res = await updateProjectStatus(orgId, projId, status);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Projects"] });
    },
  });
};

export const useGetProject = (orgId: string, slug: string) => {
  const query = useQuery({
    queryKey: ["Project", orgId, slug],
    queryFn: async () => {
      const res = await getProject(orgId, slug);

      if (res.error || !res.data)
        throw new Error(res.error || "Something went wrong");

      return res.data.project;
    },
  });

  return {
    project: query.data,
    error: query.error,
    loading: query.isLoading,
    refetch: query.refetch,
  };
};
