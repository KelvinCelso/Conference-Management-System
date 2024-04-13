import { useEffect, useState } from "react";
import {
  QuerySnapshot,
  collection,
  getDoc,
  getDocs,
  doc as dc,
} from "firebase/firestore";
import { db } from "../firebase";
import {
  PaperSubmissionDataTypeWithIds,
  SubmittedPapersStateType,
} from "../types/hooks/types";
import { initialsubmittedPapersStateData } from "../data/hooks/SubmittedPapersStateData";
import { PaperSubmissionDataType } from "../types/dashboard/Author/types";

const useGetSubmittedPapers = () => {
  const [submittedPapersState, setSubmittedPapersState] =
    useState<SubmittedPapersStateType>(initialsubmittedPapersStateData);
  useEffect(() => {
    const getProjects = async () => {
      try {
        let authorNames: string[] = [];
        const submittedPapersCollectionRef = collection(db, "paperSubmissions");
        const querySnapshot: QuerySnapshot = await getDocs(
          submittedPapersCollectionRef
        );
        const submittedPapersDataWithIds: PaperSubmissionDataTypeWithIds[] = [];
        querySnapshot.forEach(async (doc) => {
          const submittedPaper: PaperSubmissionDataType =
            doc.data() as PaperSubmissionDataType;
          const correspondingUserId = submittedPaper.correspondingAuthor;
          const userRef = dc(db, "authorUsers", correspondingUserId);
          const docSnap = await getDoc(userRef);
          submittedPaper.authors.forEach(async (id) => {
            const authorsDoc = dc(db, "authorUsers", id);
            const authorSnap = await getDoc(authorsDoc);
            authorNames = [
              ...authorNames,
              `${authorSnap.data()?.firstName + docSnap.data()?.lastName}`,
            ];
          });
          submittedPapersDataWithIds.push({
            id: doc.id,
            cAuthor: `${docSnap.data()?.firstName + docSnap.data()?.lastName}`,
            ...submittedPaper,
          });
        });

        setSubmittedPapersState({
          submittedPapers: submittedPapersDataWithIds,
          loading: false,
        });
      } catch (error) {
        console.error("Error fetching projects:", error);
        setSubmittedPapersState((prevState) => ({
          ...prevState,
          loading: false,
        }));
      }
    };

    getProjects();
  }, []); // Empty dependency array ensures this runs only once on mount
  return submittedPapersState;
};

export default useGetSubmittedPapers;
