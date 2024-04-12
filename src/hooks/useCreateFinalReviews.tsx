import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

const useCreateFinalReviews = () => {
  const createFinalReviews = async (
    reviewData: any,
    collectionName: string
  ) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), reviewData);
      console.log("Document written with ID: ", docRef.id);
      const finalReviewsWithId = { ...reviewData, id: docRef.id };
      console.log(finalReviewsWithId);
      return finalReviewsWithId;
    } catch (error) {
      console.error("Error adding document: ", error);
      throw error;
    }
  };

  return createFinalReviews;
};

export default useCreateFinalReviews;