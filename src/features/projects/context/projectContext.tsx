import type { ProjectContextType } from "@/app";
import { createContext, useContext } from "react";

export const ProjectContext = createContext<ProjectContextType>({
  id: "",
  slug: "",
  name: "",
  status: "ON_HOLD",
});

export const useProjectContext = () => useContext(ProjectContext);
