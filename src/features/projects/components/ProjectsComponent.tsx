import type { PROJECT_STATUS } from "@/app";
import { useOrganizationContext } from "@/features/orgs/context/organizationContext";
import { useGetProjects } from "@/features/projects/hooks/projects";
import ErrorState from "@/shared/components/ErrorState";
import { SkeletonGrid } from "@/shared/components/LoadingStates";
import SearchBar from "@/shared/components/SearchBar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import useInfiniteScroll from "@/shared/hooks/use-infinite-scroll";
import { useCallback, useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectCreateModal from "./ProjectCreateModal";

type ProjectListItem = {
  id: string;
  status: PROJECT_STATUS;
  name: string;
  description?: string;
  slug: string;
  startOn: Date;
  dueDate?: Date;
};

const ProjectsComponent = () => {
  const { id: orgId, myRole } = useOrganizationContext();
  const pageSize = 20;
  const [search, setSearch] = useState("");
  const [projectStatus, setProjectStatus] = useState<
    PROJECT_STATUS | "Default"
  >("Default");
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<ProjectListItem[]>([]);
  const { projects, pagination, loading, error } = useGetProjects(
    orgId,
    { search, limit: pageSize, page },
    projectStatus === "Default" ? undefined : projectStatus,
  );

  useEffect(() => {
    setPage(1);
    setItems([]);
  }, [orgId, search, projectStatus]);

  useEffect(() => {
    if (!projects) return;
    setItems((prev) => (page === 1 ? projects : [...prev, ...projects]));
  }, [projects, page]);

  const hasMore = pagination
    ? pagination.page < pagination.totalPages
    : (projects?.length ?? 0) === pageSize;
  const handleLoadMore = useCallback(() => {
    if (loading || !hasMore) return;
    setPage((prev) => prev + 1);
  }, [hasMore, loading]);

  const sentinelRef = useInfiniteScroll({
    hasMore,
    isLoading: loading,
    onLoadMore: handleLoadMore,
  });

  return (
    <div className="mt-2 md:mt-4 mb-4">
      {/* Heading */}
      <div className="md:flex w-full justify-between">
        <h2 className="text-lg font-bold leading-tight tracking-tight capitalize">
          Projects
        </h2>
        <div className="my-2 flex gap-1">
          {/* Search Bar */}
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled={loading}
          />

          {/* Select Project Status */}
          <Select
            defaultValue={projectStatus}
            onValueChange={(v: PROJECT_STATUS | "Default") =>
              setProjectStatus(v)
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Default">Default</SelectItem>
              <SelectItem value="PLANNING">PLANNING</SelectItem>
              <SelectItem value="ACTIVE">ACTIVE</SelectItem>
              <SelectItem value="ON_HOLD">ON HOLD</SelectItem>
              <SelectItem value="COMPLETED">COMPLETED</SelectItem>
              <SelectItem value="ARCHIVED">ARCHIVED</SelectItem>
            </SelectContent>
          </Select>

          {/* Create New Project */}

          {(myRole === "ADMIN" || myRole === "OWNER") && <ProjectCreateModal />}
        </div>
      </div>

      <div>
        {loading && items.length === 0 ? (
          <SkeletonGrid count={6} />
        ) : error && items.length === 0 ? (
          <ErrorState
            title="Unable to load projects"
            message="Please refresh the page or adjust your filters."
          />
        ) : items.length === 0 ? (
          <p className="text-sm text-muted-foreground">No projects found.</p>
        ) : (
          <>
            <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-2">
              {items.map((proj) => (
                <ProjectCard key={proj.id} project={proj} />
              ))}
            </div>
            {loading ? <SkeletonGrid count={3} className="mt-4" /> : null}
            {error ? (
              <ErrorState
                className="mt-4"
                title="Unable to load more projects"
                message="Please try again in a moment."
              />
            ) : null}
            {hasMore ? <div ref={sentinelRef} className="h-1" /> : null}
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectsComponent;
