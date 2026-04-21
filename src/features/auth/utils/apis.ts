import api, { apiHandler } from "@/shared/utils/api";

/**
 * Intiate Registeration
 */
export const submitEmail = apiHandler(async (email: string) => {
  const res = await api.post("/auth/register", { email });
  return res.data;
});

/**
 * Registeration Api
 */
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
    const res = await api.post<RegisterResponse>(
      `/users?token=${token}`,
      {
        name,
        password,
      },
      { skipAuth: true },
    );
    return res.data;
  },
);

/**
 * Login Api
 */
type LoginResponse = RegisterResponse;

export const requestSignIn = apiHandler(
  async (email: string, password: string) => {
    const res = await api.post<LoginResponse>(
      "/auth/sign-in",
      {
        email,
        password,
      },
      { skipAuth: true },
    );

    return res.data;
  },
);

/**
 * Forgot Password Request
 */
export const forgotPassword = apiHandler(async (email: string) => {
  const res = await api.post(
    "/auth/reset-password",
    {
      email,
    },
    { skipAuth: true },
  );

  return res.data;
});

/**
 * Reset Password
 */
export const resetPassword = apiHandler(
  async (token: string, password: string) => {
    const res = await api.patch(
      `/users/password?token=${token}`,
      { password },
      { skipAuth: true },
    );
    return res.data;
  },
);
