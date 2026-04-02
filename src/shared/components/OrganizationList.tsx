import type { Organization } from "@/app";
import { useOrganizations } from "@/features/orgs/hooks/useOrganization";
import { Link } from "react-router";
import { toast } from "sonner";
import Avatar from "./Avatar";
import { SidebarGroup } from "./ui/sidebar";

const OrganizationList = ({ search }: { search: string }) => {
  const { organizations, loading, error } = useOrganizations(search);

  if (error) toast.error(error);

  return (
    <SidebarGroup>
      {loading
        ? "Loading"
        : organizations.map((org) => <Organization key={org.id} org={org} />)}
    </SidebarGroup>
  );
};

const Organization = ({ org }: { org: Organization }) => {
  return (
    <Link
      to={`/orgs/${org.slug}`}
      className="flex items-center gap-2 mt-4 hover:border-r-2 py-0.5 hover:bg-accent"
    >
      <Avatar avatar={org.logoUrl} iconVariant="ORG" size="sm" />
      <div>
        <h2>{org.name}</h2>
      </div>
    </Link>
  );
};

export default OrganizationList;
