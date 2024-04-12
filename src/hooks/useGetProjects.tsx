import { useEffect, useState } from "react";
import { ProjectDataType } from "../types/dashboard/Admin/types";
import { QuerySnapshot, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { ProjectDataTypeWithIds, ProjectStateType } from "../types/hooks/types";
import { initialProjectStateData } from "../data/hooks/ProjectStateData";

const useGetProjects = () => {
  const [projectState, setProjectState] = useState<ProjectStateType>(
    initialProjectStateData
  );

  useEffect(() => {
    const getProjects = async () => {
      try {
        const projectsCollectionRef = collection(db, "projects");
        const querySnapshot: QuerySnapshot = await getDocs(
          projectsCollectionRef
        );
        const projectsDataWithIds: ProjectDataTypeWithIds[] = [];
        querySnapshot.forEach((doc) => {
          const project: ProjectDataType = doc.data() as ProjectDataType;
          projectsDataWithIds.push({ id: doc.id, ...project });
        });

        setProjectState({ projects: projectsDataWithIds, loading: false });
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjectState((prevState) => ({ ...prevState, loading: false }));
      }
    };

    getProjects();
  }, []); // Empty dependency array ensures this runs only once on mount

  return projectState;
};

export default useGetProjects;
