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
import { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectCreateModal from "./ProjectCreateModal";

const ProjectsComponent = () => {
  const { id: orgId, myRole } = useOrganizationContext();
  const [search, setSearch] = useState("");
  const [projectStatus, setProjectStatus] = useState<
    PROJECT_STATUS | "Default"
  >("Default");
  const { projects, loading, error } = useGetProjects(
    orgId,
    { search, limit: 20, page: 1 },
    projectStatus === "Default" ? undefined : projectStatus,
  );

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
        {loading ? (
          <SkeletonGrid count={6} />
        ) : error ? (
          <ErrorState
            title="Unable to load projects"
            message="Please refresh the page or adjust your filters."
          />
        ) : !projects || projects.length === 0 ? (
          <p className="text-sm text-muted-foreground">No projects found.</p>
        ) : (
          <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-2">
            {projects.map((proj) => (
              <ProjectCard key={proj.id} project={proj} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsComponent;
