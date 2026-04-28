import type { PROJECT_STATUS } from "@/app";

const ProjectStatusBadge = ({ status }: { status: PROJECT_STATUS }) => {
  const statusColors: Record<PROJECT_STATUS, string> = {
    PLANNING: "bg-blue-100 text-blue-800",
    ACTIVE: "bg-green-100 text-green-800",
    ON_HOLD: "bg-yellow-100 text-yellow-800",
    COMPLETED: "bg-gray-100 text-gray-800",
    ARCHIVED: "bg-red-100 text-red-800",
  };
  return (
    <span
      className={`text-xs font-medium h-fit py-px px-1 rounded ${statusColors[status]}`}
    >
      {status.replace("_", " ")}
    </span>
  );
};

export default ProjectStatusBadge;
