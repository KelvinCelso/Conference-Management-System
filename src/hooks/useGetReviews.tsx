import { useEffect, useState } from "react";
import { QuerySnapshot, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { initialReviewsStateData } from "../data/hooks/SubmittedPapersStateData";

const useGetReviews = () => {
  const [reviewsState, setReviewsState] =
    useState(initialReviewsStateData);
  useEffect(() => {
    const getProjects = async () => {
      try {
        const reviewsCollectionRef = collection(db, "reviewSubmissions");
        const querySnapshot: QuerySnapshot = await getDocs(
          reviewsCollectionRef
        );
        const reviewsDataWithIds: any = [];
        querySnapshot.forEach((doc) => {
          const reviews =
            doc.data();
            reviewsDataWithIds.push({ id: doc.id, ...reviews });
        });

        setReviewsState({
          reviews: reviewsDataWithIds,
          loading: false,
        });
      } catch (error) {
        console.error("Error fetching projects:", error);
        setReviewsState((prevState) => ({
          ...prevState,
          loading: false,
        }));
      }
    };

    getProjects();
  }, []); // Empty dependency array ensures this runs only once on mount
  return reviewsState;
};

export default useGetReviews;