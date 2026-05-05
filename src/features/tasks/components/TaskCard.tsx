import type { TaskWithAssignee } from "@/app";
import { useOrganizationContext } from "@/features/orgs/context/organizationContext";
import { useProjectContext } from "@/features/projects/context/projectContext";
import Avatar from "@/shared/components/Avatar";
import { Link06Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { formatDate } from "date-fns";
import { Link } from "react-router";
import DeleteTaskDialog from "./DeleteTask";
import TaskEditModal from "./TaskEditModal";
import TaskStatusBadge from "./TaskStatusBadge";

const TaskCard = ({ task }: { task: TaskWithAssignee }) => {
  const org = useOrganizationContext();
  const proj = useProjectContext();

  return (
    <article className="w-full border px-4 py-8 h-full rounded-sm">
      <div className="flex items-center">
        <Link
          to={`/tasks/${task.id}`}
          className="flex-1"
          state={{
            org: {
              id: org.id,
              name: org.name,
              slug: org.slug,
            },
            project: {
              id: proj.id,
              name: proj.name,
              slug: proj.slug,
            },
            myRole: org.myRole,
          }}
        >
          <h3 className="text-md font-semibold capitalize flex items-center">
            {task.title}
            <HugeiconsIcon icon={Link06Icon} size={16} />
          </h3>
        </Link>
        <div className="flex items-center gap-1">
          <TaskStatusBadge status={task.status} />

          {(org.myRole === "ADMIN" || org.myRole === "OWNER") && (
            <DeleteTaskDialog taskId={task.id} />
          )}

          {(org.myRole === "ADMIN" || org.myRole === "OWNER") && (
            <TaskEditModal
              task={{
                id: task.id,
                title: task.title,
                descritpion: task.description,
                startDate: task.startDate,
                dueDate: task.dueDate,
                assignee: task.assignee,
              }}
            />
          )}
        </div>
      </div>

      <p className="my-2">
        {!task.description
          ? "No description provided."
          : task.description.length > 100
            ? task.description.slice(0, 100) + "..."
            : task.description}
      </p>

      {task.assignee && (
        <div className="flex items-center gap-3 overflow-hidden border py-2 px-3 rounded-sm bg-accent">
          <Avatar
            avatar={task.assignee.avatarUrl || ""}
            size="sm"
            iconVariant="USER"
          />
          <div className="flex flex-col items-start overflow-hidden text-left">
            <span className="truncate text-sm font-medium">
              {task.assignee.name}
            </span>

            <span className="truncate text-xs text-muted-foreground">
              {task.assignee.email}
            </span>
          </div>
        </div>
      )}

      <p className="text-xs text-center mt-2 h-6">
        From:{" "}
        {task.startDate
          ? formatDate(new Date(task.startDate), "MMM dd, yyyy")
          : "N/A"}{" "}
        - To:
        {task.dueDate
          ? formatDate(new Date(task.dueDate), "MMM dd, yyyy")
          : "N/A"}
      </p>
    </article>
  );
};

export default TaskCard;
