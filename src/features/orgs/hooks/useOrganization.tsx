import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createOrganization, fetchAllOrganizations } from "../apis";

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
