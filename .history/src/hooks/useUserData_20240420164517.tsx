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
  const pathname = window.location.pathname;
  const authUser = useAuthentication();
  const [role, setRole] = useState<"author" | "admin" | "reviewer">();
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
        if (pathname.includes("/author-dashboard")) {
          const authorUserDocRef = doc(db, "authorUsers", authUid);
          const authorUserSnapshot = await getDoc(authorUserDocRef);

          if (authorUserSnapshot.exists()) {
            const userDataFromSnapshot =
              authorUserSnapshot.data() as AuthorUserDataType;
            setUserDataLoading(false);
            return setUserData(userDataFromSnapshot);
          }
          setRole("author");
        }

        if (pathname.includes("/admin-dashboard")) {
          const adminUserDocRef = doc(db, "adminUsers", authUid);
          const adminUserSnapshot = await getDoc(adminUserDocRef);

          if (adminUserSnapshot.exists()) {
            const userDataFromSnapshot =
              adminUserSnapshot.data() as AuthorUserDataType;
            setUserDataLoading(false);
            return setUserData(userDataFromSnapshot);
          }
          setRole("admin");
        }
        if (pathname.includes("/reviewer-dashboard")) {
          const reviewerUserDocRef = doc(db, "reviewerUsers", authUid);
          const reviewerSnapshot = await getDoc(reviewerUserDocRef);
          if (reviewerSnapshot.exists()) {
            const userDataFromSnapshot =
              reviewerSnapshot.data() as AuthorUserDataType;
            setUserDataLoading(false);
            return setUserData(userDataFromSnapshot);
          }
          setRole("reviewer");
        }
      } catch (error) {
        setUserDataLoading(false);
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [authUser]);

  return { userData, userDataLoading, userId, role }; // Include userId in the returned object
};

export default useUserData;
