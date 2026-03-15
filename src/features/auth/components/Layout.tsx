import type { ReactNode } from "react";
import workflow from "../assets/workflow.jpg";
import Header from "./Header";

const Layout = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <div className="flex">
      <div className="w-full">
        <Header />
        <div className={"w-full " + className}>{children}</div>
      </div>
      <div className="hidden lg:block relative w-1/3">
        <img src={workflow} className="h-screen w-full object-cover fixed" />
      </div>
    </div>
  );
};

export default Layout;
