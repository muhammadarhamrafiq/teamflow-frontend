import { useParams } from "react-router";
import ProjectsComponent from "../../projects/components/ProjectsComponent";
import MembersComponent from "../components/MembersComponent";
import OrganizationHero from "../components/OrganizationHero";
import { useOrganization } from "../hooks/useOrganization";
import { OrganizationProvider } from "../providers/organizationProvider";

const OrganizationPage = () => {
  const { organizationSlug } = useParams();
  const { organization, loading } = useOrganization(organizationSlug!);

  if (loading) return <h1>"Loading"</h1>;

  if (!organization) return <h1>{"Not Found"}</h1>;

  return (
    <OrganizationProvider organization={organization}>
      <OrganizationHero />
      <div className="mx-4 md:mx-8 lg:flex justify-between gap-1 md:gap-2 mt-2 md:mt-4 mb-4">
        <div className="lg:w-2/3 border flex items-center justify-center shrink-0">
          PENDING SCHEDULING COMPONENT
        </div>
        <MembersComponent />
      </div>
      <ProjectsComponent />
    </OrganizationProvider>
  );
};

export default OrganizationPage;
