import { useParams } from "react-router";
import OrganizationHero from "../components/OrganizationHero";
import { useOrganization } from "../hooks/useOrganization";

const OrganizationPage = () => {
  const { organizationSlug } = useParams();
  const { organization, loading } = useOrganization(organizationSlug!);

  if (loading) return <h1>"Loading"</h1>;

  if (!organization) return <h1>{"Not Found"}</h1>;

  return (
    <>
      <OrganizationHero organization={organization} />
    </>
  );
};

export default OrganizationPage;
