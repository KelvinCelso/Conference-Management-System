import React from "react";
import { StyledDashboardPageLayout } from "../../../../styles/pages/dashboard/DashboardPageLayout.styled";
import useGetCollection from "../../../../hooks/useGetCollection";
import useAuthentication from "../../../../hooks/useAuthentication";
import { MenuState } from "@/lib/recoil";
import { useRecoilState } from "recoil";

const ReviewerResponse = () => {
  const finalReviewsState = useGetCollection("finalReviews");
  const authUser = useAuthentication();
  const [opens, setOpens] = useRecoilState(MenuState);
  console.log(authUser?.uid);
  console.log(finalReviewsState);
  return (
    <div className="mt-navbar max-lg:mt-[50px] ml-sidebar max-lg:ml-0 flex-1 overflow-auto">
      {opens && (
        <div
          className="absolute top-0 right-0 bg-black/10 left-0 bottom-0 z-10"
          onClick={() => setOpens(false)}
        />
      )}
      {finalReviewsState && finalReviewsState?.loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h4>Reviewers</h4>
          <div>
            {finalReviewsState?.collection
              .filter(
                (result: any) => result.correspondingAuthor === authUser?.uid
              )
              .map((res) => {
                return (
                  <div key={res.id}>
                    <h5>{res.abstract}</h5>
                    <p>{res.review}</p>
                    <p>{res.cAuthor}</p>
                    {/* <p>{res.finalResult}</p> */}
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewerResponse;
