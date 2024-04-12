import { useEffect, useState } from "react";
import { QuerySnapshot, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { initialToBeReviewedStateData } from "../data/hooks/SubmittedPapersStateData";

const useGetToBeReviewed = () => {
  const [toBeReviewedState, setToBeReviewedState] =
    useState(initialToBeReviewedStateData);
  useEffect(() => {
    const getProjects = async () => {
      try {
        const toBeReviewedCollectionRef = collection(db, "toBeReviewed");
        const querySnapshot: QuerySnapshot = await getDocs(
            toBeReviewedCollectionRef
        );
        const toBeReviewedDataWithIds: any = [];
        querySnapshot.forEach((doc) => {
          const toBeReviewed =
            doc.data();
            toBeReviewedDataWithIds.push({ id: doc.id, ...toBeReviewed });
        });

        setToBeReviewedState({
          toBeReviewed: toBeReviewedDataWithIds,
          loading: false,
        });
      } catch (error) {
        console.error("Error fetching projects:", error);
        setToBeReviewedState((prevState) => ({
          ...prevState,
          loading: false,
        }));
      }
    };

    getProjects();
  }, []); // Empty dependency array ensures this runs only once on mount
  return toBeReviewedState;
};

export default useGetToBeReviewed;