import { Firestore } from "firebase/firestore";
import { db } from "../firebase"; // Assuming db is the Firestore instance
import {
    doc,
    updateDoc,
  } from "firebase/firestore";
import { PaperAssesmentDataType } from "../types/dashboard/Reviewer/types";
import { useState } from "react";

const usePaperAssessment = () => {
  const [error, setError] = useState<string | null>(null);

  const submitAssessment = async (
    formData: PaperAssesmentDataType,
    correspondingAuthor: string,
    projectId: string
  ) => {
    try {
      const paperResultsRef = doc(db, "authorUsers", correspondingAuthor);

    //   await paperResultsRef.update({
    //     paperResults: [
    //       ...paperResults,
    //       {
    //         ...formData,
    //         projectId,
    //       },
    //     ],
    //   });
      await updateDoc(paperResultsRef, {
        paperResults: [
            ...paperResults,
            {
              ...formData,
              projectId,
            },
          ],
      });
    } catch (err: any) {
      setError(
        err.message || "An error occurred while submitting the assessment."
      );
    }
  };

  return { submitAssessment, error };
};

export default usePaperAssessment;
