import type { TASK_STATUS } from "@/app";
import { useOrganization } from "@/features/orgs/hooks/useOrganization";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { useParams } from "react-router";
import UpdateProjectStatus from "../components/UpdateProjectStatus";
import { useGetProject } from "../hooks/projects";
import ProjectProvider from "../provider/projectProvider";

const taskStatusCardMeta: Partial<
  Record<
    TASK_STATUS | "total",
    {
      description: string;
      label: string;
    }
  >
> = {
  total: { description: "All project tasks", label: "Total" },
  TODO: { description: "Tasks not started", label: "To Do" },
  IN_PROGRESS: {
    description: "Tasks currently active",
    label: "In Progress",
  },
  IN_REVIEW: { description: "Tasks awaiting review", label: "In Review" },
  DONE: { description: "Tasks already completed", label: "Completed" },
  BACKLOG: { description: "Tasks not yet scheduled", label: "Backlog" },
  BLOCKED: { description: "Tasks currently blocked", label: "Blocked" },
  CANCELLED: {
    description: "Tasks that have been cancelled",
    label: "Cancelled",
  },
};

const statusesOrder: Array<TASK_STATUS | "total"> = [
  "total",
  "TODO",
  "IN_PROGRESS",
  "IN_REVIEW",
  "DONE",
  "BACKLOG",
  "BLOCKED",
  "CANCELLED",
];

const statusPillClass: Record<string, string> = {
  TODO: "bg-gray-100 text-gray-800",
  IN_PROGRESS: "bg-blue-100 text-blue-800",
  IN_REVIEW: "bg-amber-100 text-amber-800",
  DONE: "bg-green-100 text-green-800",
  BACKLOG: "bg-violet-100 text-violet-800",
  BLOCKED: "bg-red-100 text-red-800",
  CANCELLED: "bg-stone-100 text-stone-800",
};

const ProjectPage = () => {
  const { projSlug, orgSlug } = useParams();

  const {
    organization,
    loading: orgLoading,
    error: orgError,
  } = useOrganization(orgSlug ?? "");
  const { project, loading, error } = useGetProject(
    organization?.id ?? "",
    projSlug ?? "",
  );

  if (loading || orgLoading)
    return (
      <div className="flex items-center justify-center py-12">
        <svg
          className="w-8 h-8 animate-spin text-primary"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      </div>
    );

  if (error || orgError || !project || !organization)
    return (
      <div className="mx-4 md:mx-8 py-6">
        <p className="text-sm text-red-600 mb-3">
          Something went wrong loading this project.
        </p>
        <div>
          <button
            className="px-3 py-1 rounded bg-primary text-white text-sm"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );

  return (
    <ProjectProvider
      project={{
        orgId: organization.id,
        id: project.id,
        name: project.name,
        slug: project.slug,
        status: project.status,
        myRole: organization.myRole,
      }}
    >
      <div className="mx-4 md:mx-8 lg:flex gap-1 md:gap-2 mt-2 md:mt-4 items-center">
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-bold leading-tight tracking-tight">
            {project.name}
          </h2>
          <span
            className={`inline-flex items-center px-2 py-1 rounded text-sm font-medium ${
              statusPillClass[project.status] ?? "bg-gray-100 text-gray-800"
            }`}
            aria-label={`Project status ${project.status}`}
          >
            {project.status.replaceAll("_", " ")}
          </span>
        </div>
        <div className="ml-auto">
          <UpdateProjectStatus availableActions={project.availableActions} />
        </div>
      </div>
      <p className="mx-4 md:mx-8 max-w-160 text-muted-foreground text-sm">
        {project.description}
      </p>
      <div className="mx-4 md:mx-8 grid grid-cols-2 gap-2 mt-1 md:gap-4 md:mt-2 lg:grid-cols-4">
        {statusesOrder
          .filter((k) => project.tasksCounts && k in project.tasksCounts)
          .map((key) => {
            const meta = taskStatusCardMeta[key] ?? {
              description: "Task status overview",
              label: key,
            };

            return (
              <Card
                key={key}
                className="w-full"
                role="group"
                aria-label={`${meta.label} tasks`}
              >
                <CardHeader>
                  <CardDescription>{meta.description}</CardDescription>
                  <CardTitle>{meta.label}</CardTitle>
                </CardHeader>
                <CardContent className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  {project.tasksCounts[key] ?? 0}
                </CardContent>
              </Card>
            );
          })}
      </div>
    </ProjectProvider>
  );
};

export default ProjectPage;
