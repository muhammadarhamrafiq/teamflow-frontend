import type { TASK_STATUS } from "@/app";
import { useOrganizationContext } from "@/features/orgs/context/organizationContext";
import { useProjectContext } from "@/features/projects/context/projectContext";
import SearchBar from "@/shared/components/SearchBar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { useState } from "react";
import { useGetTasks } from "../hooks/tasks";
import TaskCard from "./TaskCard";
import TaskCreateModal from "./TaskCreateModal";

const TasksComponent = () => {
  const { myRole } = useOrganizationContext();
  const { id: projectId } = useProjectContext();
  const [status, setStatus] = useState<TASK_STATUS | "default">("default");
  const [search, setSearch] = useState<string>("");
  const { tasks, loading, error } = useGetTasks(
    projectId,
    {
      limit: 20,
      page: 1,
      search: search,
    },
    status === "default" ? undefined : status,
  );

  return (
    <div className="mx-4 md:mx-8 mt-2 md:mt-4 mb-4">
      {/* Heading */}
      <div className="md:flex w-full justify-between">
        <h2 className="text-lg font-bold leading-tight tracking-tight capitalize">
          Tasks
        </h2>
        <div className="my-2 flex gap-1">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select
            value={status}
            onValueChange={(status: TASK_STATUS | "default") =>
              setStatus(status)
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="BACKLOG">Backlog</SelectItem>
              <SelectItem value="BLOCKED">Blocked</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>
              <SelectItem value="DONE">Done</SelectItem>
              <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
              <SelectItem value="IN_REVIEW">In Review</SelectItem>
              <SelectItem value="TODO">To Do</SelectItem>
            </SelectContent>
          </Select>
          {(myRole === "ADMIN" || myRole === "OWNER") && <TaskCreateModal />}
        </div>
      </div>

      {/* Tasks Cards */}
      <div>
        {loading ? (
          <p>Loading projects...</p>
        ) : error ? (
          <p className="text-red-500">Error loading projects</p>
        ) : !tasks || tasks.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-2">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksComponent;
