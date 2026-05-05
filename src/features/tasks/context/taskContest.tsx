import type { TaskContextType } from "@/app";
import { createContext, useContext } from "react";

export const TaskContext = createContext<TaskContextType>({
  id: "",
  myRole: "MEMBER",
  projectId: "",
  taskStatus: "BLOCKED",
});

export const useTaskContext = () => useContext(TaskContext);
