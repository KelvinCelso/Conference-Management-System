import { useEffect, useState } from "react";
import { AuthorUserDataType } from "../types/Form/registration/Author/types";
import useAuthentication from "./useAuthentication";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { UserDataProps } from "../types/hooks/types";

interface IUserData {
  role: "author" | "admin" | "reviewer";
}

const useUserData = (): UserDataProps => {
  const [userData, setUserData] = useState<AuthorUserDataType>(
    {} as AuthorUserDataType
  );
  const [userDataLoading, setUserDataLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null); // State for userId

  const authUser = useAuthentication();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setUserDataLoading(true);

        const authUid = authUser?.uid;
        if (!authUid) {
          setUserDataLoading(false);
          return;
        }

        setUserId(authUid); // Set userId here

        const authorUserDocRef = doc(db, "authorUsers", authUid);
        const authorUserSnapshot = await getDoc(authorUserDocRef);

        if (authorUserSnapshot.exists()) {
          const userDataFromSnapshot =
            authorUserSnapshot.data() as AuthorUserDataType;
          setUserDataLoading(false);
          return setUserData(userDataFromSnapshot);
        }

        const adminUserDocRef = doc(db, "adminUsers", authUid);
        const adminUserSnapshot = await getDoc(adminUserDocRef);

        if (adminUserSnapshot.exists()) {
          const userDataFromSnapshot =
            adminUserSnapshot.data() as AuthorUserDataType;
          setUserDataLoading(false);
          return setUserData(userDataFromSnapshot);
        }
        const reviewerUserDocRef = doc(db, "reviewerUsers", authUid);
        const revviewerSnapshot = await getDoc(reviewerUserDocRef);
        if (revviewerSnapshot.exists()) {
          const userDataFromSnapshot =
            revviewerSnapshot.data() as AuthorUserDataType;
          setUserDataLoading(false);
          return setUserData(userDataFromSnapshot);
        }
      } catch (error) {
        setUserDataLoading(false);
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [authUser]);

  return { userData, userDataLoading, userId }; // Include userId in the returned object
};

export default useUserData;
