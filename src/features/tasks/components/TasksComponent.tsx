import type { TASK_STATUS, TaskWithAssignee } from "@/app";
import { useOrganizationContext } from "@/features/orgs/context/organizationContext";
import { useProjectContext } from "@/features/projects/context/projectContext";
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
import useInfiniteScroll from "@/shared/hooks/use-infinite-scroll";
import { useCallback, useEffect, useState } from "react";
import { useGetTasks } from "../hooks/tasks";
import TaskCard from "./TaskCard";
import TaskCreateModal from "./TaskCreateModal";

const TasksComponent = () => {
  const { myRole } = useOrganizationContext();
  const { id: projectId } = useProjectContext();
  const pageSize = 20;
  const [status, setStatus] = useState<TASK_STATUS | "default">("default");
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<TaskWithAssignee[]>([]);
  const { tasks, pagination, loading, error } = useGetTasks(
    projectId,
    {
      limit: pageSize,
      page,
      search: search,
    },
    status === "default" ? undefined : status,
  );

  useEffect(() => {
    setPage(1);
    setItems([]);
  }, [projectId, search, status]);

  useEffect(() => {
    if (!tasks) return;
    setItems((prev) => (page === 1 ? tasks : [...prev, ...tasks]));
  }, [tasks, page]);

  const hasMore = pagination
    ? pagination.page < pagination.totalPages
    : (tasks?.length ?? 0) === pageSize;
  const handleLoadMore = useCallback(() => {
    if (loading || !hasMore) return;
    setPage((prev) => prev + 1);
  }, [hasMore, loading]);

  const sentinelRef = useInfiniteScroll({
    hasMore,
    isLoading: loading,
    onLoadMore: handleLoadMore,
  });

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
        {loading && items.length === 0 ? (
          <SkeletonGrid count={6} />
        ) : error && items.length === 0 ? (
          <ErrorState
            title="Unable to load tasks"
            message="Please refresh the page or adjust your filters."
          />
        ) : items.length === 0 ? (
          <p className="text-sm text-muted-foreground">No tasks found.</p>
        ) : (
          <>
            <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-2">
              {items.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
            {loading ? <SkeletonGrid count={3} className="mt-4" /> : null}
            {error ? (
              <ErrorState
                className="mt-4"
                title="Unable to load more tasks"
                message="Please try again in a moment."
              />
            ) : null}
            {hasMore ? <div ref={sentinelRef} className="h-1" /> : null}
          </>
        )}
      </div>
    </div>
  );
};

export default TasksComponent;
