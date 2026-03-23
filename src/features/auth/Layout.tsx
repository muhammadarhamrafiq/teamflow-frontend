import { useAuthStore } from "@/providers/user";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import workflow from "./assets/workflow.jpg";
import Header from "./components/Header";

const Layout = () => {
  const { user } = useAuthStore.getState();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/dashboard");
  });

  return (
    <div className="flex">
      <div className="w-full">
        <Header />
        <div className="w-full flex flex-col items-center py-12 lg:py-16">
          <Outlet />
        </div>
      </div>
      <div className="hidden lg:block relative w-1/3">
        <img src={workflow} className="h-screen w-full object-cover fixed" />
      </div>
    </div>
  );
};

export default Layout;
