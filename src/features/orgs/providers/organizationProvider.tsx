import ErrorState from "@/shared/components/ErrorState";
import {
  SkeletonGrid,
  SkeletonHeader,
  SkeletonStatGrid,
} from "@/shared/components/LoadingStates";
import { Outlet, useParams } from "react-router";
import { OrganizationContext } from "../context/organizationContext";
import { useOrganization } from "../hooks/useOrganization";
import OrganizationsPage from "../pages/OrganizationsPage";

export const OrganizationProvider = () => {
  const { orgSlug } = useParams();
  const { organization, loading, error } = useOrganization(orgSlug!);

  if (!orgSlug) return <OrganizationsPage />;
  if (loading)
    return (
      <div className="mx-4 md:mx-8 py-6">
        <SkeletonHeader />
        <SkeletonStatGrid className="mt-6" />
        <SkeletonGrid count={6} className="mt-6" />
      </div>
    );
  if (error)
    return (
      <div className="mx-4 md:mx-8 py-6">
        <ErrorState title="Unable to load organization" message={error} />
      </div>
    );

  if (!organization)
    return (
      <div className="mx-4 md:mx-8 py-6">
        <ErrorState
          title="Organization not found"
          message="We could not find that workspace. Check the URL or try another organization."
        />
      </div>
    );

  return (
    <OrganizationContext.Provider value={organization}>
      <Outlet />
    </OrganizationContext.Provider>
  );
};
