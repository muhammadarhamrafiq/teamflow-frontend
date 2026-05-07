import NotFoundPage from "@/shared/components/NotFoundPage";
import { Outlet, useParams } from "react-router";
import { OrganizationContext } from "../context/organizationContext";
import { useOrganization } from "../hooks/useOrganization";

export const OrganizationProvider = () => {
  const { orgSlug } = useParams();
  const { organization, loading } = useOrganization(orgSlug!);

  if (!orgSlug) return <NotFoundPage />;
  if (loading) return <h1>"Loading"</h1>;
  if (!organization) return <h1>{"Not Found"}</h1>;

  return (
    <OrganizationContext.Provider value={organization}>
      <Outlet />
    </OrganizationContext.Provider>
  );
};
