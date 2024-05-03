import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

const useCreatePapersToBeReviewed = () => {
  const createPapersToBeReviewed = async (
    paperSubmissionData: any,
    collectionName: string
  ) => {
    try {
      const docRef = await addDoc(
        collection(db, collectionName),
        paperSubmissionData
      );
      const paperSubmissionWithDataId = {
        ...paperSubmissionData,
        id: docRef.id,
      };
      return paperSubmissionWithDataId;
    } catch (error) {
      console.error("Error adding document: ", error);
      throw error;
    }
  };

  return createPapersToBeReviewed;
};

export default useCreatePapersToBeReviewed;
