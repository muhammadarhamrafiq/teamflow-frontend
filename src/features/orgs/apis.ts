import type { Organization } from "@/app";
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
  organization: {
    id: string;
    slug: string;
    logoUrl: string;
    description: string;
    name: string;
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

  const res = await api.patch<CreateOrganizationResponse>(
    `/orgs/${id}/logo`,
    formdata,
    {
      skipAuth: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  console.log(res);

  return res.data;
});
