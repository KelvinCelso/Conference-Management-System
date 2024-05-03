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
      if (!authUser) return console.log("user does not exit");
      try {
        const userRef = doc(db, "authorUser", authUser?.uid);
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
          console.log(userSnapshot);
          setUsePapers(userSnapshot.data().submittedPapers);
        }
      } catch (err) {
        console.error(err);
      }
    };
    return () => {
      fetchDocs();
    };
  }, [authUser]);
  return userPapers;
}

export default useGetUserPapers;
