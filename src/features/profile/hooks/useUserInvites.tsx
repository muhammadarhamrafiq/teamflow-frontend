import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMembershipInvites, updateMembershipInvites } from "../utils/apis";

export const useMembershipInvites = () => {
  const query = useQuery({
    queryKey: ["userInvitations"],
    queryFn: async () => {
      const res = await getMembershipInvites();
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
};

export const useAcceptInvite = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const res = await updateMembershipInvites(id, "ACCEPTED");
      return res;
    },

    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["userInvitations"] });
    },
  });
};

export const useCancelInvite = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const res = await updateMembershipInvites(id, "REJECTED");
      return res;
    },

    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["userInvitations"] });
    },
  });
};
