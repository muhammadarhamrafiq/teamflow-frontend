import type { USER_ROLE } from "@/app";
import api, { apiHandler } from "@/shared/utils/api";

export const logout = apiHandler(async () => {
  await api.post("/auth/logout");
});

/**
 * Upload Avatar Api
 */
interface UpdatedUserRespose {
  message: string;
  user: {
    id: string;
    email: string;
    name: string;
    avatarUrl: string;
    updatedAt: Date;
  };
}

export const uploadAvatar = apiHandler(async (avatar: File) => {
  const formdata = new FormData();
  formdata.append("avatar", avatar);

  const res = await api.patch<UpdatedUserRespose>("/users/avatar", formdata, {
    skipAuth: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
});

export const updateName = apiHandler(async (updateName: string) => {
  const res = await api.patch<UpdatedUserRespose>("/users/name", {
    name: updateName,
  });

  return res.data;
});

export const updateEmail = apiHandler(async (updateEmail: string) => {
  const res = await api.post("/auth/update-email", {
    email: updateEmail,
  });

  return res.data;
});

export const resetPassword = apiHandler(async (email: string) => {
  const res = await api.post("/auth/reset-password", {
    email,
  });

  return res.data;
});

interface GetMembershipInvites {
  message: string;
  invitations: Array<{
    id: string;
    organizationName: string;
    organizationLogo: string | null;
    invitedOn: Date;
    role: USER_ROLE;
  }>;
}

export const getMembershipInvites = apiHandler(async () => {
  const res = await api.get<GetMembershipInvites>("/users/invites");
  return res.data;
});

export const updateMembershipInvites = apiHandler(
  async (id: string, status: "ACCEPTED" | "REJECTED") => {
    const res = await api.patch<{ message: string }>(
      `/users/invites/${id}`,
      {},
      {
        params: {
          status,
        },
      },
    );

    return res.data;
  },
);
