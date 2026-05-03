import ProjectsComponent from "../../projects/components/ProjectsComponent";
import MembersComponent from "../components/MembersComponent";
import OrganizationHero from "../components/OrganizationHero";

const OrganizationPage = () => {
  return (
    <div className="mx-4 md:mx-8 ">
      <OrganizationHero />
      <div className="lg:flex justify-between gap-1 md:gap-2 mt-2 md:mt-4 mb-4">
        <div className="lg:w-2/3 border flex items-center justify-center shrink-0">
          PENDING SCHEDULING COMPONENT
        </div>
        <MembersComponent />
      </div>
      <ProjectsComponent />
    </div>
  );
};

export default OrganizationPage;
