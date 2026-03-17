import api, { apiHandler } from "../../utils/api";

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
    return res;
  },
);

type UploadAvatarResponse = RegisterResponse;

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
