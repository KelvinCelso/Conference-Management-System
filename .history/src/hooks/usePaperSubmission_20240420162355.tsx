import { useState } from "react";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { db } from "../firebase";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { PaperSubmissionDataType } from "../types/dashboard/Author/types";
import useAuthentication from "./useAuthentication";
import {
  PaperSubmissionDataTypeWithIds,
  PaperSubmissionDataTypeWithIdsAndPaperId,
  SubmittedPapersStateType,
} from "@/types/hooks/types";

interface PaperSubmissionHookProps {
  paperSubmissionData: PaperSubmissionDataType;
  projectId: string; // Assuming projectId is a string
}
interface IPaperUpdate extends PaperSubmissionHookProps {
  paperId: string;
}

const usePaperSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const authUser = useAuthentication();
  const storage = getStorage(); // Initialize Firebase Storage
  const submitPaper = async ({
    paperSubmissionData,
    projectId,
  }: PaperSubmissionHookProps) => {
    setIsSubmitting(true);
    try {
      if (authUser && authUser.uid) {
        // Upload PDF file to Firebase storage
        const storageRef = ref(
          storage,
          `user_papers/${paperSubmissionData.correspondingAuthor}/${projectId}/${paperSubmissionData.file?.name}`
        );
        await uploadBytes(storageRef, paperSubmissionData.file!);

        // Save other data to Firestore
        const paperSubmissionRef = doc(collection(db, "paperSubmissions"));
        const paperId = paperSubmissionRef.id; // Use the document's ID as the paperId
        await setDoc(paperSubmissionRef, {
          paperId: paperId, // Add paperId to the document
          correspondingAuthor: paperSubmissionData.correspondingAuthor,
          authors: paperSubmissionData.authors,
          abstract: paperSubmissionData.abstract,
          projectId: projectId, // Use the provided projectId
          fileId: storageRef.name, // Save file ID/reference
        });

        const authorUserRef = doc(db, "authorUsers", authUser.uid); // Reference the specific document using userId
        await updateDoc(authorUserRef, {
          submittedPapers: arrayUnion({
            paperId: paperId, // Add unique paper ID
            correspondingAuthor: paperSubmissionData.correspondingAuthor,
            authors: paperSubmissionData.authors,
            abstract: paperSubmissionData.abstract,
            projectId: projectId,
            fileId: storageRef.name,
            // Add other fields as needed
          }),
        });

        setIsSubmitting(false);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
      setIsSubmitting(false);
    }
  };

  const updatePaper = async ({
    paperSubmissionData,
    projectId,
    paperId,
  }: IPaperUpdate) => {
    try {
      if (authUser && authUser.uid) {
        // Upload PDF file to Firebase storage
        const storageRef = ref(
          storage,
          `user_papers/${paperSubmissionData.correspondingAuthor}/${projectId}/${paperSubmissionData.file?.name}`
        );
        await uploadBytes(storageRef, paperSubmissionData.file!);

        const paperSubmissionRef = doc(db, "paperSubmissions", paperId);

        await updateDoc(paperSubmissionRef, {
          paperId: paperId, // Add paperId to the document
          correspondingAuthor: paperSubmissionData.correspondingAuthor,
          authors: paperSubmissionData.authors,
          abstract: paperSubmissionData.abstract,
          projectId: projectId, // Use the provided projectId
          fileId: storageRef.name, // Save file ID/reference
        });

        const authorUserRef = doc(db, "authorUsers", authUser.uid); // Reference the specific document using userId
        const docSnap = await getDoc(authorUserRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const submittedPapers = data.submittedPapers || [];

          // Step 2: Find the specific paper in the submittedPapers array
          const paperIndex = submittedPapers.findIndex(
            (paper: PaperSubmissionDataTypeWithIdsAndPaperId) =>
              paper.paperId === paperId
          );

          if (paperIndex !== -1) {
            // Step 3: Update the paper object
            submittedPapers[paperIndex] = {
              ...submittedPapers[paperIndex],
              correspondingAuthor: paperSubmissionData.correspondingAuthor,
              authors: paperSubmissionData.authors,
              abstract: paperSubmissionData.abstract,
              projectId: projectId,
              fileId: storageRef.name,
              // Add other fields as needed
            };

            // Step 4: Write the updated array back to the document
            await updateDoc(authorUserRef, {
              submittedPapers: submittedPapers,
            });
          } else {
            console.log(`Paper with ID ${paperId} not found.`);
          }
        } else {
          console.log("No such document!");
        }

        setIsSubmitting(false);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
      setIsSubmitting(false);
    }
  };
  return { submitPaper, isSubmitting, error, updatePaper };
};

export default usePaperSubmission;
