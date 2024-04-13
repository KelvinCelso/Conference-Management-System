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
        const submittedPapersCollectionRef = collection(db, "paperSubmissions");
        const querySnapshot = await getDocs(submittedPapersCollectionRef);
        const submittedPapersDataWithIds = [];

        // Iterate through each document
        for (const doc of querySnapshot.docs) {
          const submittedPaper = doc.data() as PaperSubmissionDataType;
          const correspondingUserId = submittedPaper.correspondingAuthor;

          // Get corresponding author details
          const correspondingUserRef = dc(
            db,
            "authorUsers",
            correspondingUserId
          );
          const correspondingUserSnap = await getDoc(correspondingUserRef);
          const correspondingUser: any = correspondingUserSnap.data();

          // Get names of all authors
          const authorNames = await Promise.all(
            submittedPaper.authors.map(async (authorId) => {
              const authorDocRef = dc(db, "authorUsers", authorId);
              const authorDocSnap = await getDoc(authorDocRef);
              const authorData: any = authorDocSnap.data();
              return `${authorData?.firstName} ${authorData?.lastName}`;
            })
          );

          submittedPapersDataWithIds.push({
            id: doc.id,
            cAuthor: `${correspondingUser?.firstName} ${correspondingUser?.lastName}`,
            authorNames: authorNames,
            ...submittedPaper,
          });
        }

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
