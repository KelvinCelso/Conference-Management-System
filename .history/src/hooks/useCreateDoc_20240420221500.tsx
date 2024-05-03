import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import useAuthentication from "./useAuthentication";

const useCreateDoc = () => {
  const authUser = useAuthentication();
  const createDoc = async (
    docData: any,
    collectionName: string,
    tobeReviewedId: string
  ) => {
    try {
      if (authUser && authUser.uid) {
        const docRef = await addDoc(collection(db, collectionName), docData);
        console.log("Document written with ID: ", docRef.id);
        const docWithDataId = { ...docData, id: docRef.id };
        const userRef = doc(db, "reviewerUsers", authUser.uid);
        await updateDoc(userRef, {
          reviewedProjects: arrayUnion({
            ...docWithDataId,
          }),
        });

        return docWithDataId;
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  return createDoc;
};

export default useCreateDoc;
