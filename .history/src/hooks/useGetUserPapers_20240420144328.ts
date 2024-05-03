import React, { useEffect, useState } from "react";
import useAuthentication from "./useAuthentication";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { SubmittedPapersStateType } from "@/types/hooks/types";
import { PaperSubmissionDataType } from "@/types/dashboard/Author/types";

function useGetUserPapers() {
  const authUser = useAuthentication();
  const [userPapers, setUsePapers] = useState<PaperSubmissionDataType[]>([]);

  useEffect(() => {
    const fetchDocs = async () => {
      if (!authUser) return console.log("user does not exit", authUser);
      console.log("this time we passed");
      const userRef = doc(db, "authorUsers", authUser?.uid);
      console.log("salam");
      const userSnapshot = await getDoc(userRef);
      console.log("here2", userSnapshot);
      if (userSnapshot.exists()) {
        console.log("this is user info", userSnapshot.data());
        setUsePapers(userSnapshot.data().submittedPapers);
      }
    };
    return () => {
      fetchDocs();
    };
  }, [authUser]);
  return userPapers;
}

export default useGetUserPapers;
