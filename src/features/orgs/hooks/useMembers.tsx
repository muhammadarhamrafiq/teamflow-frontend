import type { USER_ROLE } from "@/app";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMembers, removeMember, updateMember } from "../utils/apis";

interface GetMembersParams {
  limit?: number;
  page?: number;
  search?: string;
}

export function useGetMembers(
  id: string,
  { limit, page, search }: GetMembersParams = {},
) {
  const query = useQuery({
    queryKey: ["Members", id, limit, page, search],
    queryFn: async () => {
      const res = await getMembers(id, { limit, page, search });
      if (!res.success || !res.data)
        throw new Error(res.error || "Something went wrong");

      return res.data;
    },
  });

  return {
    data: query.data,
    error: query.error,
    loading: query.isLoading,
    refetch: query.refetch,
  };
}

export function useUpdateMemberShip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      orgId,
      userId,
      role,
    }: {
      orgId: string;
      userId: string;
      role: USER_ROLE;
    }) => {
      const res = await updateMember(orgId, userId, role);
      return res;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Members"] });
    },
  });
}

export function useRemoveMembership() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      orgId,
      userId,
    }: {
      orgId: string;
      userId: string;
    }) => {
      const res = await removeMember(orgId, userId);
      return res;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Members"] });
    },
  });
}
