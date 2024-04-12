import { ProjectDataType } from "../types/dashboard/Admin/types";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

const useCreateProject = () => {
  const createProject = async (
    projectData: ProjectDataType,
    collectionName: string
  ) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), projectData);
      console.log("Document written with ID: ", docRef.id);
      const projectWithDataId = { ...projectData, id: docRef.id };
      console.log(projectData);
      console.log(projectWithDataId);
      return projectWithDataId;
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  return createProject;
};

export default useCreateProject;
