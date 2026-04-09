import type {
  Membership,
  Organization,
  OrgWithKPIs,
  OrgWithRole,
  Pagination,
  USER_ROLE,
} from "@/app";
import api, { apiHandler } from "@/shared/utils/api";

export const fetchAllOrganizations = apiHandler(async (search?: string) => {
  const res = await api.get<{
    message: string;
    organizations: OrgWithRole[];
  }>("/orgs", { params: { search } });

  return res.data;
});

interface CreateOrganizationResponse {
  message: string;
  organization: Organization;
}

interface updateOrganizationResponse {
  message: string;
  organization: Organization & {
    description?: string;
    updatedAt: string;
  };
}

export const createOrganization = apiHandler(
  async (name: string, description: string, logo: File | null) => {
    const res = await api.post<CreateOrganizationResponse>("/orgs", {
      name,
      description: description.length > 0 ? description : undefined,
    });

    if (!logo) return res.data;

    const updated = await updateLogo(res.data.organization.id, logo);
    res.data.organization.logoUrl = updated.data!.organization.logoUrl;

    return res.data;
  },
);

export const updateLogo = apiHandler(async (id: string, logo: File) => {
  const formdata = new FormData();
  formdata.append("logo", logo);

  const res = await api.patch<updateOrganizationResponse>(
    `/orgs/${id}/logo`,
    formdata,
    {
      skipAuth: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return res.data;
});

interface getOrgResponse {
  message: string;
  organization: OrgWithKPIs;
}

export const getOrgBySlug = apiHandler(async (slug: string) => {
  const res = await api.get<getOrgResponse>(`/orgs/${slug}`);
  return res.data;
});

export const updateOrganization = apiHandler(
  async (
    id: string,
    { name, description }: { name?: string; description?: string },
  ) => {
    const body: { name?: string; description?: string } = {};

    if (name) body.name = name;
    if (description) body.description = description;

    const res = await api.patch<updateOrganizationResponse>(
      `/orgs/${id}`,
      body,
    );
    return res.data;
  },
);

export const deleteOrganization = apiHandler(async (id: string) => {
  const res = await api.delete(`/orgs/${id}`);
  return res.data;
});

interface GetMembersResponse {
  message: string;
  members: Membership[];
  pagination: Pagination;
}

export const getMembers = apiHandler(
  async (
    id: string,
    { limit, search, page }: { limit?: number; search?: string; page?: number },
  ) => {
    const res = await api.get<GetMembersResponse>(`/orgs/${id}/mems`, {
      params: {
        limit,
        search,
        page,
      },
    });
    return res.data;
  },
);

interface UpdateMemberResponse {
  message: string;
  membership: {
    userId: string;
    organizationId: string;
    role: USER_ROLE;
    createdAt: Date;
    updatedAt: Date;
  };
}

export const updateMember = apiHandler(
  async (orgId: string, userId: string, role: USER_ROLE) => {
    const res = await api.patch<UpdateMemberResponse>(
      `/orgs/${orgId}/mems/${userId}`,
      {},
      {
        params: {
          role,
        },
      },
    );
    return res.data;
  },
);

export const removeMember = apiHandler(
  async (orgId: string, userId: string) => {
    const res = await api.delete<UpdateMemberResponse>(
      `/orgs/${orgId}/mems/${userId}`,
    );
    return res.data;
  },
);

export const leaveOrganization = apiHandler(async (id: string) => {
  const res = await api.delete<UpdateMemberResponse>(`/orgs/${id}/mems/me`);
  return res.data;
});
