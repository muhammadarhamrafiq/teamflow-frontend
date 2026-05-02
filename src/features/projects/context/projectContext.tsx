import type { ProjectContextType } from "@/app";
import { createContext, useContext } from "react";

export const ProjectContext = createContext<ProjectContextType>({
  id: "",
  orgId: "",
  slug: "",
  name: "",
  status: "ON_HOLD",
  myRole: "MEMBER",
});

export const useProjectContext = () => useContext(ProjectContext);
