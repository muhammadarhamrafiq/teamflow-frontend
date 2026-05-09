import { useState } from "react";
import { Link } from "react-router";

import { useAuthStore } from "@/app/providers/user";
import { useOrganizations } from "@/features/orgs/hooks/useOrganization";
import Avatar from "@/shared/components/Avatar";
import ErrorState from "@/shared/components/ErrorState";
import { SkeletonList } from "@/shared/components/LoadingStates";
import SearchBar from "@/shared/components/SearchBar";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

const quickActions = [
  {
    title: "Create an organization",
    description: "Set up a new workspace for your team.",
    to: "/orgs/add",
    cta: "New organization",
  },
  {
    title: "Update your profile",
    description: "Add a photo, name, and contact details.",
    to: "/profile",
    cta: "Edit profile",
  },
  {
    title: "Explore your organizations",
    description: "Jump back into ongoing workspaces.",
    to: "/orgs",
    cta: "View organizations",
  },
];

const formatRole = (role: string) =>
  role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();

const DashboardPage = () => {
  const user = useAuthStore((state) => state.user);
  const firstName = user?.name?.split(" ")[0] || "there";
  const [search, setSearch] = useState("");
  const { organizations, loading, error } = useOrganizations(search);

  return (
    <div className="mx-4 md:mx-8 pb-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
            Dashboard
          </p>
          <h1 className="text-2xl font-semibold sm:text-3xl">
            Welcome back, {firstName}.
          </h1>
          <p className="text-sm text-muted-foreground">
            Your personal overview for what is happening today.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild size="lg">
            <Link to="/orgs/add">Create organization</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/profile">View profile</Link>
          </Button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-4">
          <Card className="bg-card/80">
            <CardHeader>
              <CardTitle>Your organizations</CardTitle>
              <CardDescription>
                Jump back into the workspaces you belong to.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <SearchBar
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              {loading ? (
                <SkeletonList count={4} />
              ) : error ? (
                <ErrorState
                  title="Unable to load organizations"
                  message="Please try again in a moment."
                />
              ) : organizations.length === 0 ? (
                <div className="rounded-lg border border-border bg-background/70 p-4">
                  <p className="text-sm font-medium text-foreground">
                    No organizations yet
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Create your first workspace to start collaborating.
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
                      <span className="text-xs text-muted-foreground">
                        Open
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4">
          <Card className="bg-card/80">
            <CardHeader>
              <CardTitle>Your profile</CardTitle>
              <CardDescription>
                Keep your account details fresh.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <Avatar
                avatar={user?.avatarUrl ?? null}
                iconVariant="USER"
                size="lg"
              />
              <div>
                <p className="text-base font-semibold text-foreground">
                  {user?.name ?? "Your name"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {user?.email ?? "you@example.com"}
                </p>
                <Button asChild variant="ghost" size="sm" className="mt-3">
                  <Link to="/profile">Manage profile</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80">
            <CardHeader>
              <CardTitle>Quick actions</CardTitle>
              <CardDescription>Jump to the work you need.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action) => (
                <div
                  key={action.title}
                  className="flex items-center justify-between gap-4 rounded-lg border border-border bg-background/70 p-4"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {action.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {action.description}
                    </p>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link to={action.to}>{action.cta}</Link>
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
