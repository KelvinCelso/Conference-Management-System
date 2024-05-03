import React, { useState } from "react";
import useAuthentication from "./useAuthentication";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { SubmittedPapersStateType } from "@/types/hooks/types";
import { PaperSubmissionDataType } from "@/types/dashboard/Author/types";

async function useGetUserPapers() {
  const authUser = useAuthentication();
  const [userPaper, setUsePapers] = useState<PaperSubmissionDataType[]>([]);

  if (!authUser) throw new Error("user does not exist");
  const userRef = doc(db, "authorUser", authUser?.uid);
  const userSnapshot = await getDoc(userRef);
  if (userSnapshot.exists()) {
    setUsePapers(userSnapshot.data().submittedPapers);
  }
}

export default useGetUserPapers;
