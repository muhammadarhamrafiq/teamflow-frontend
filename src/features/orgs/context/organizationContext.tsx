import type { OrgWithKPIs } from "@/app";
import { createContext, useContext } from "react";

export const OrganizationContext = createContext<OrgWithKPIs>({
  id: "",
  name: "",
  description: "",
  slug: "",
  logoUrl: "",
  myRole: "MEMBER",
  projectsSummary: {
    completedProjects: 0,
    inProgressProjects: 0,
    overDueProjects: 0,
    totalProjects: 0,
  },
});
export const useOrganizationContext = () => useContext(OrganizationContext);
