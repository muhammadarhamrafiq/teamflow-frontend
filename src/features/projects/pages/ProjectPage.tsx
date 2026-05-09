import type { TASK_STATUS } from "@/app";
import { useOrganizationContext } from "@/features/orgs/context/organizationContext";
import TasksComponent from "@/features/tasks/components/TasksComponent";
import ErrorState from "@/shared/components/ErrorState";
import {
  SkeletonGrid,
  SkeletonHeader,
  SkeletonStatGrid,
} from "@/shared/components/LoadingStates";
import { Button } from "@/shared/components/ui/button";
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
  PLANNING: "bg-blue-100 text-blue-800",
  ACTIVE: "bg-green-100 text-green-800",
  ON_HOLD: "bg-yellow-100 text-yellow-800",
  COMPLETED: "bg-gray-100 text-gray-800",
  ARCHIVED: "bg-red-100 text-red-800",
};

const ProjectPage = () => {
  const { projSlug } = useParams();
  const { id: orgId } = useOrganizationContext();

  const { project, loading, error } = useGetProject(orgId, projSlug ?? "");

  if (loading)
    return (
      <div className="mx-4 md:mx-8 py-6">
        <SkeletonHeader />
        <SkeletonStatGrid className="mt-6" />
        <SkeletonGrid count={6} className="mt-6" />
      </div>
    );

  if (error || !project)
    return (
      <div className="mx-4 md:mx-8 py-6">
        <ErrorState
          title="Unable to load project"
          message="Please refresh the page or try again in a moment."
          action={
            <Button size="sm" onClick={() => window.location.reload()}>
              Retry
            </Button>
          }
        />
      </div>
    );

  return (
    <ProjectProvider
      project={{
        id: project.id,
        name: project.name,
        slug: project.slug,
        status: project.status,
      }}
    >
      {/* Heading */}
      <div className="mx-4 md:mx-8 lg:flex gap-1 md:gap-2 mt-2 md:mt-4 items-center">
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-bold leading-tight tracking-tight capitalize">
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

      {/* Task Cards */}
      <div className="mx-4 md:mx-8 grid grid-cols-2 gap-2 mt-2 md:gap-4 md:mt-4 lg:grid-cols-4">
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
      <TasksComponent />
    </ProjectProvider>
  );
};

export default ProjectPage;
