import type { TaskContextType } from "@/app";
import { TaskContext } from "../context/taskContest";

const TaskProvider = ({
  task,
  children,
}: {
  task: TaskContextType;
  children?: React.ReactNode;
}) => {
  return <TaskContext.Provider value={task}>{children}</TaskContext.Provider>;
};

export default TaskProvider;
