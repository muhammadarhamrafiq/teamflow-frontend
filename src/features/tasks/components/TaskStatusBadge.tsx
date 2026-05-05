import type { TASK_STATUS } from "@/app";

const TaskStatusBadge = ({ status }: { status: TASK_STATUS }) => {
  const statusColors: Record<TASK_STATUS, string> = {
    TODO: "bg-gray-100 text-gray-800",
    IN_PROGRESS: "bg-blue-100 text-blue-800",
    IN_REVIEW: "bg-purple-100 text-purple-800",
    DONE: "bg-green-100 text-green-800",
    BACKLOG: "bg-yellow-100 text-yellow-800",
    BLOCKED: "bg-red-100 text-red-800",
    CANCELLED: "bg-gray-300 text-gray-600",
  };
  return (
    <span
      className={`text-xs font-medium h-fit py-px px-1 rounded ${statusColors[status]}`}
    >
      {status.replace("_", " ")}
    </span>
  );
};

export default TaskStatusBadge;
