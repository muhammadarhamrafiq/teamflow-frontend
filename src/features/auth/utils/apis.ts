import api, { apiHandler } from "@/shared/utils/api";

export const submitEmail = apiHandler(async (email: string) => {
  const res = await api.post("/auth/register", { email });
  return res.data;
});

interface RegisterResponse {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
  };
}

export const registerUser = apiHandler(
  async (name: string, password: string, token: string) => {
    const res = await api.post<RegisterResponse>(`/users?token=${token}`, {
      name,
      password,
    });
    return res.data;
  },
);

interface UploadAvatarResponse {
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

  const res = await api.patch<UploadAvatarResponse>("/users/avatar", formdata, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
});

type LoginResponse = RegisterResponse;

export const requestSignIn = apiHandler(
  async (email: string, password: string) => {
    const res = await api.post<LoginResponse>("/auth/sign-in", {
      email,
      password,
    });

    return res.data;
  },
);

export const forgotPassword = apiHandler(async (email: string) => {
  const res = await api.post("/auth/reset-password", {
    email,
  });

  return res.data;
});

export const resetPassword = apiHandler(
  async (token: string, password: string) => {
    const res = await api.patch(`/users/password?token=${token}`, { password });
    return res.data;
  },
);
