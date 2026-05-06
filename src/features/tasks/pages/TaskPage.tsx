import type { USER_ROLE } from "@/app";
import Comments from "@/features/comments/components/Comments";
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link, useLocation, useParams } from "react-router";
import TaskPageHeading from "../components/TaskPageHeading";
import { useGetTask } from "../hooks/tasks";
import TaskProvider from "../provider/taskProvider";

interface LocationStateType {
  org: {
    id: string;
    name: string;
    slug: string;
  };

  project: {
    id: string;
    name: string;
    slug: string;
  };

  myRole: USER_ROLE;
}

const TaskPage = () => {
  const { taskId } = useParams();
  const { org, project, myRole } = useLocation().state as LocationStateType;

  const { task, error, loading } = useGetTask(project.id, taskId!);

  if (loading) return <span>Loading</span>;

  if (error || !task) return <span>Something Went wrong</span>;

  return (
    <TaskProvider
      task={{
        id: task.id,
        myRole,
        projectId: project.id,
        taskStatus: task.status,
      }}
    >
      <Link
        to={`/orgs/${org.slug}/projects/${project.slug}`}
        className="mx-4 md:mx-8 flex capitalize mt-2 md:mt-4 mb-2 items-center"
      >
        <HugeiconsIcon icon={ArrowLeft02Icon} /> {project.name}
      </Link>
      <TaskPageHeading
        title={task.title}
        description={task.description}
        status={task.status}
        availableActions={task.allowedActions}
      />
      <Comments />
    </TaskProvider>
  );
};

export default TaskPage;
