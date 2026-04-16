import type { Candidate, USER_ROLE } from "@/app";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  cancelInvite,
  createInvitation,
  getCandidates,
  getInvitations,
} from "../api/invitations";

interface GetInvitationParams {
  limit?: number;
  page?: number;
  search?: string;
}

export const useInvites = (
  id: string,
  { limit, page, search }: GetInvitationParams = {},
) => {
  const query = useQuery({
    queryKey: ["Invitations", id, limit, page, search],
    queryFn: async () => {
      const res = await getInvitations(id, { limit, page, search });
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

export const useCreateInvite = () => {
  const client = useQueryClient();

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
      const res = await createInvitation(orgId, { userId, role });
      return res;
    },

    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["Invitations"] });
    },
  });
};

export const useCancelInvite = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async ({
      orgId,
      invitationId,
    }: {
      orgId: string;
      invitationId: string;
    }) => {
      const res = await cancelInvite(orgId, invitationId);
      return res;
    },

    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["Invitations"] });
    },
  });
};

type UseGetCandidatesParams = {
  orgId: string;
  search?: string;
  page?: number;
  limit?: number;
};

export const useGetCandidates = ({
  orgId,
  search = "",
  page = 1,
  limit = 20,
}: UseGetCandidatesParams) => {
  const [loading, setLoading] = useState(false);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchCandidates() {
      setLoading(true);
      setError(null);

      if (search === "") {
        setLoading(false);
        return;
      }

      const res = await getCandidates(orgId, {
        search,
        page,
        limit,
      });

      if (!isMounted) return;

      if (!res.success || !res.data) {
        setError(res.error || "Something went wrong");
        setLoading(false);
        return;
      }

      setCandidates(res.data.users);
      setLoading(false);
    }

    fetchCandidates();

    return () => {
      isMounted = false;
    };
  }, [orgId, search, page, limit]);

  return {
    loading,
    candidates,
    error,
  };
};
