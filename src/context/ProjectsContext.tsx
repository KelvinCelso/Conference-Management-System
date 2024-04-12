import React, { ReactNode, createContext, useContext } from "react";
import useGetProjects from "../hooks/useGetProjects";
import { ProjectStateType } from "../types/hooks/types";
import { initialProjectStateData } from "../data/hooks/ProjectStateData";

interface ProjectsProviderProps {
  children: ReactNode;
}

// Create the context
export const ProjectsContext = createContext<ProjectStateType>(initialProjectStateData);

// Custom hook to use the ProjectsContext
export const useProjectsContext = (): ProjectStateType => {
  return useContext(ProjectsContext);
};

// Provider component
export const ProjectsProvider: React.FC<ProjectsProviderProps> = ({ children }) => {
  const { projects, loading } = useGetProjects();

  return (
    <ProjectsContext.Provider value={{ projects, loading }}>
      {children}
    </ProjectsContext.Provider>
  );
};
