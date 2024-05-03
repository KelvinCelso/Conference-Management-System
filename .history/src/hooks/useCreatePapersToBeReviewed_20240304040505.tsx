import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

const useCreatePapersToBeReviewed = () => {
  const createPapersToBeReviewed = async (
    paperSubmissionData: any,
    collectionName: string
  ) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), paperSubmissionData);
      console.log("Document written with ID: ", docRef.id);
      const paperSubmissionWithDataId = { ...paperSubmissionData, id: docRef.id };
      console.log(paperSubmissionWithDataId);
      return paperSubmissionWithDataId;
    } catch (error) {
      console.error("Error adding document: ", error);
      throw error;
    }
  };

  return createPapersToBeReviewed;
};

export default useCreatePapersToBeReviewed;
