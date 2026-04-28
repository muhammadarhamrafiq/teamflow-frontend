import type { PROJECT_STATUS } from "@/app";
import { useOrganizationContext } from "@/features/orgs/context/organizationContext";
import { Link06Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { formatDate } from "date-fns";
import { Link } from "react-router";
import DeleteProject from "./DeleteProjectDialog";
import ProjectEditModal from "./ProjectEditModal";
import ProjectStatusBadge from "./ProjectStatusBadge";

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    description?: string;
    slug: string;
    startOn: Date;
    dueDate?: Date;
    status: PROJECT_STATUS;
  };
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { slug: orgSlug, myRole } = useOrganizationContext();

  return (
    <article className="w-full border px-4 py-8 h-full rounded-sm">
      <div className="flex items-center">
        <Link
          to={`/orgs/${orgSlug}/projects/${project.slug}`}
          className="flex-1"
        >
          <h3 className="text-lg font-semibold capitalize flex items-center">
            {project.name}
            <HugeiconsIcon icon={Link06Icon} size={16} />
          </h3>
        </Link>
        <div className="flex items-center gap-1">
          <ProjectStatusBadge status={project.status} />

          {(myRole === "ADMIN" || myRole === "OWNER") && (
            <DeleteProject projId={project.id} />
          )}

          {(myRole === "ADMIN" || myRole === "OWNER") && (
            <ProjectEditModal
              project={{
                name: project.name,
                descritpion: project.description,
                dueDate: project.dueDate,
                id: project.id,
              }}
            />
          )}
        </div>
      </div>

      <p className="my-2">
        {!project.description
          ? "No description provided."
          : project.description.length > 100
            ? project.description.slice(0, 100) + "..."
            : project.description}
      </p>

      <p className="text-xs text-center mt-2 h-6">
        From: {formatDate(new Date(project.startOn), "MMM dd, yyyy")} - To:
        {project.dueDate
          ? formatDate(new Date(project.dueDate), "MMM dd, yyyy")
          : "N/A"}
      </p>
    </article>
  );
};

export default ProjectCard;
