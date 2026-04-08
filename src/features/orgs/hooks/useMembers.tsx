import { useQuery } from "@tanstack/react-query";
import { getMembers } from "../apis";

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
