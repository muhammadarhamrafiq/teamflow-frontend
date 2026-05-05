import type { TASK_STATUS } from "@/app";
import TaskUpdateStatus from "./TaskUpdateStatus";

interface TaskPageHeadingProps {
  title: string;
  status: TASK_STATUS;
  description: string | null;
  availableActions: TASK_STATUS[];
}

const TaskPageHeading = ({
  title,
  status,
  description,
  availableActions,
}: TaskPageHeadingProps) => {
  const statusPillClass: Record<string, string> = {
    TODO: "bg-gray-100 text-gray-800",
    IN_PROGRESS: "bg-blue-100 text-blue-800",
    IN_REVIEW: "bg-purple-100 text-purple-800",
    DONE: "bg-green-100 text-green-800",
    BACKLOG: "bg-yellow-100 text-yellow-800",
    BLOCKED: "bg-red-100 text-red-800",
    CANCELLED: "bg-gray-300 text-gray-600",
  };

  return (
    <>
      <div className="mx-4 md:mx-8 lg:flex gap-1 md:gap-2 items-center">
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-bold leading-tight tracking-tight capitalize">
            {title}
          </h2>
          <span
            className={`inline-flex items-center px-2 py-1 rounded text-sm font-medium ${
              statusPillClass[status] ?? "bg-gray-100 text-gray-800"
            }`}
            aria-label={`Project status ${status}`}
          >
            {status.replaceAll("_", " ")}
          </span>
        </div>
        <div className="ml-auto">
          <TaskUpdateStatus availableActions={availableActions} />
        </div>
      </div>
      <p className="mx-4 md:mx-8 max-w-160 text-muted-foreground text-sm">
        {description}
      </p>
    </>
  );
};

export default TaskPageHeading;
