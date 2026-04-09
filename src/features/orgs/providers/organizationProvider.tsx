import type { OrgWithKPIs } from "@/app";
import { OrganizationContext } from "../context/organizationContext";

interface ContextProviderProps {
  organization: OrgWithKPIs;
  children: React.ReactNode;
}
export const OrganizationProvider = ({
  organization,
  children,
}: ContextProviderProps) => {
  return (
    <OrganizationContext.Provider value={organization}>
      {children}
    </OrganizationContext.Provider>
  );
};
