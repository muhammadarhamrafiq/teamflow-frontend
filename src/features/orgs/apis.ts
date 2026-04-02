import type { Organization, USER_ROLE } from "@/app";
import api, { apiHandler } from "@/shared/utils/api";

export const fetchAllOrganizations = apiHandler(async (search?: string) => {
  const res = await api.get<{
    message: string;
    organizations: Organization[];
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
  organization: Organization & {
    myRole: USER_ROLE;
    description: string | null;
  };
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
