import type { ProjectContextType } from "@/app";
import { ProjectContext } from "../context/projectContext";

const ProjectProvider = ({
  project,
  children,
}: {
  project: ProjectContextType;
  children: React.ReactNode;
}) => {
  return (
    <ProjectContext.Provider value={project}>
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectProvider;
