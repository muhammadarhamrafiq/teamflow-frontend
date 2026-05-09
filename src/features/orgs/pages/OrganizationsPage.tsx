import { useState } from "react";
import { Link } from "react-router";

import { useOrganizations } from "@/features/orgs/hooks/useOrganization";
import Avatar from "@/shared/components/Avatar";
import SearchBar from "@/shared/components/SearchBar";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

const formatRole = (role: string) =>
  role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();

const OrganizationsPage = () => {
  const [search, setSearch] = useState("");
  const { organizations, loading, error } = useOrganizations(search);

  return (
    <div className="mx-4 md:mx-8 pb-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
            Organizations
          </p>
          <h1 className="text-2xl font-semibold sm:text-3xl">
            Your workspaces
          </h1>
          <p className="text-sm text-muted-foreground">
            Access the organizations you belong to or create a new one.
          </p>
        </div>
        <Button asChild size="lg">
          <Link to="/orgs/add">Create organization</Link>
        </Button>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="bg-card/80">
          <CardHeader>
            <CardTitle>All organizations</CardTitle>
            <CardDescription>
              Search by name to find a workspace quickly.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <SearchBar
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            {loading ? (
              <p className="text-sm text-muted-foreground">
                Loading organizations...
              </p>
            ) : error ? (
              <p className="text-sm text-destructive">{error}</p>
            ) : organizations.length === 0 ? (
              <div className="rounded-lg border border-border bg-background/70 p-4">
                <p className="text-sm font-medium text-foreground">
                  No organizations found
                </p>
                <p className="text-xs text-muted-foreground">
                  Create a workspace to start collaborating.
                </p>
                <Button asChild size="sm" className="mt-3">
                  <Link to="/orgs/add">Create organization</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {organizations.map((org) => (
                  <Link
                    key={org.id}
                    to={`/orgs/${org.slug}`}
                    className="flex items-center justify-between gap-3 rounded-lg border border-border bg-background/70 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar
                        avatar={org.logoUrl}
                        iconVariant="ORG"
                        size="sm"
                      />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {org.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatRole(org.myRole)} member
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">Open</span>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card/80">
          <CardHeader>
            <CardTitle>Getting started</CardTitle>
            <CardDescription>
              Start a new workspace and invite your team.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-lg border border-border bg-background/70 p-4">
              <p className="text-sm font-medium text-foreground">
                Create a fresh organization
              </p>
              <p className="text-xs text-muted-foreground">
                Set up your workspace, then add members and projects.
              </p>
              <Button asChild size="sm" className="mt-3">
                <Link to="/orgs/add">Create organization</Link>
              </Button>
            </div>
            <div className="rounded-lg border border-border bg-background/70 p-4">
              <p className="text-sm font-medium text-foreground">
                Manage your profile
              </p>
              <p className="text-xs text-muted-foreground">
                Keep your contact details and avatar up to date.
              </p>
              <Button asChild variant="outline" size="sm" className="mt-3">
                <Link to="/profile">Update profile</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrganizationsPage;
