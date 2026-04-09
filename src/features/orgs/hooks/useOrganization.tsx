import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createOrganization,
  deleteOrganization,
  fetchAllOrganizations,
  getOrgBySlug,
  leaveOrganization,
  updateLogo,
  updateOrganization,
} from "../utils/apis";

export function useOrganizations(search?: string) {
  const query = useQuery({
    queryKey: ["organizations", search],
    queryFn: async () => {
      const res = await fetchAllOrganizations(search);

      if (!res.success || !res.data)
        throw new Error(res.error || "Something went wrong");
      return res.data.organizations;
    },
  });

  return {
    organizations: query.data ?? [],
    loading: query.isLoading,
    error: query.error?.message ?? null,
    refetch: query.refetch,
  };
}

export function useOrganization(slug: string) {
  const query = useQuery({
    queryKey: ["organization", slug],
    queryFn: async () => {
      const res = await getOrgBySlug(slug);

      if (!res.success || !res.data)
        throw new Error(res.error || "Something went wrong");
      return res.data.organization;
    },
  });

  return {
    organization: query.data,
    loading: query.isLoading,
    error: query.error?.message ?? null,
    refetch: query.refetch,
  };
}

interface createOrgPayload {
  name: string;
  description: string;
  file: File | null;
}

export function useCreateOrganization() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ name, description, file }: createOrgPayload) => {
      const res = await createOrganization(name, description, file);
      return res;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["organizations"] }),
  });
}

interface updateOrganization {
  id: string;
  name?: string;
  description?: string;
  file?: File;
}

export function useUpdateOrganization() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, name, description, file }: updateOrganization) => {
      if (file) {
        const res = await updateLogo(id, file);
        return res;
      }
      const res = await updateOrganization(id, { name, description });
      return res;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
      queryClient.invalidateQueries({ queryKey: ["organization"] });
    },
  });
}

export function useDeleteOrganization() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteOrganization(id);
      return res;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });
}

export function useLeaveOrganization() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await leaveOrganization(id);
      return res;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });
}
