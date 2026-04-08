import type { Organization, OrgWithRole } from "@/app";
import { useOrganizations } from "@/features/orgs/hooks/useOrganization";
import { Link } from "react-router";
import { toast } from "sonner";
import Avatar from "./Avatar";
import DropDown from "./DropDown";
import { SidebarGroup } from "./ui/sidebar";

const OrganizationList = ({ search }: { search: string }) => {
  const { organizations, loading, error } = useOrganizations(search);

  if (error) toast.error(error);

  return (
    <SidebarGroup className="px-0">
      {loading
        ? "Loading"
        : organizations.map((org) => <Organization key={org.id} org={org} />)}
    </SidebarGroup>
  );
};

const Organization = ({ org }: { org: OrgWithRole }) => {
  return (
    <Link
      to={`/orgs/${org.slug}`}
      className="flex items-center gap-1 mt-4 py-0.5"
    >
      <Avatar avatar={org.logoUrl} iconVariant="ORG" size="sm" />
      <div className="w-full flex justify-between items-center">
        <h2>
          {org.name.substring(0, 22)}
          {org.name.length > 22 && "..."}
        </h2>

        <DropDown organization={org} />
      </div>
    </Link>
  );
};

export default OrganizationList;
