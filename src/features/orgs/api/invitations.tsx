import type {
  Invitation,
  PaginatedWithSearch,
  Pagination,
  USER_ROLE,
} from "@/app";
import api, { apiHandler } from "@/shared/utils/api";

interface GetInvitationResponse {
  message: string;
  invites: Invitation[];
  pagination: Pagination;
}

interface GetCandidateResponse {
  message: string;
  users: [
    {
      id: string;
      email: string;
      name: string;
      avatarUrl?: string;
      invitationStatus: {
        isMember: boolean;
        invited: boolean;
      };
    },
  ];
  pagination: Pagination;
}

interface CreateInvitationResponse {
  message: string;
  invitation: Invitation;
}

export const getInvitations = apiHandler(
  async (orgId: string, { limit, page, search }: PaginatedWithSearch) => {
    const res = await api.get<GetInvitationResponse>(`/orgs/${orgId}/invites`, {
      params: {
        page,
        limit,
        search,
      },
    });
    return res.data;
  },
);

export const getCandidates = apiHandler(
  async (orgId: string, { limit, page, search }: PaginatedWithSearch) => {
    const res = await api.get<GetCandidateResponse>(
      `/orgs/${orgId}/invites/candidates`,
      {
        params: {
          page,
          limit,
          email: search,
        },
      },
    );

    return res.data;
  },
);

export const createInvitation = apiHandler(
  async (
    orgId: string,
    { userId, role }: { userId: string; role: USER_ROLE },
  ) => {
    const res = await api.post<CreateInvitationResponse>(
      `/orgs/${orgId}/invites`,
      {
        userId,
        role,
      },
    );

    return res.data;
  },
);

export const cancelInvite = apiHandler(
  async (orgId: string, invitationId: string) => {
    const res = await api.delete<{ message: string }>(
      `/orgs/${orgId}/invites/${invitationId}`,
    );

    return res.data;
  },
);
