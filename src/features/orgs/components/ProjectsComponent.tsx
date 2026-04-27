import type { PROJECT_STATUS } from "@/app";
import { useGetProjects } from "@/features/projects/hooks/projects";
import SearchBar from "@/shared/components/SearchBar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { useState } from "react";
import { useOrganizationContext } from "../context/organizationContext";
import ProjectCreateModal from "./ProjectCreateModal";

const ProjectsComponent = () => {
  const { id: orgId } = useOrganizationContext();
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
    <div>
      {/* Heading */}
      <div>
        <h3>Projects</h3>
        <div>
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
          <ProjectCreateModal />
        </div>
      </div>

      {/* Projects */}
      {error && <span>Something Went Wrong</span>}
      <div>{JSON.stringify(projects)}</div>
    </div>
  );
};

export default ProjectsComponent;
