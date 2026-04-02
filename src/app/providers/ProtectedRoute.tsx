import api, { apiHandler } from "@/shared/utils/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "./user";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    let isMounted = true;

    async function validateAuth() {
      const getAuth = apiHandler(async () => {
        const res = await api.get<{
          message: string;
          user: { id: string; email: string; name: string; avatarUrl: string };
        }>("/auth/me");
        return res.data;
      });

      const res = await getAuth();

      if (!isMounted) return;

      if (res.success && res.data) {
        setUser(res.data.user);
        setIsLoading(false);
      } else {
        logout();
        window.localStorage.clear();
        navigate("/account/login", { replace: true });
      }
    }

    validateAuth();

    return () => {
      isMounted = false;
    };
  }, [logout, navigate, setUser]);

  if (isLoading) return <div>Loading...</div>;

  return <>{children}</>;
};

export default ProtectedRoute;
