import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  setDoc,
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
        const docRef = doc(collection(db, collectionName));
        await setDoc(docRef, [{ ...docData, docId: docRef.id }]);
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
