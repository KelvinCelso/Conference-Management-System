import React from 'react'
import { StyledDashboardPageLayout } from '../../../../styles/pages/dashboard/DashboardPageLayout.styled';
import useGetCollection from '../../../../hooks/useGetCollection';
import useAuthentication from '../../../../hooks/useAuthentication';

const ReviewerResponse = () => {
  const finalReviewsState = useGetCollection('finalReviews');
  const authUser = useAuthentication();
  console.log(authUser?.uid);
  console.log(finalReviewsState);
  return (
    <StyledDashboardPageLayout>
      {finalReviewsState &&
        finalReviewsState?.loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <h4>Reviewers</h4>
            <div>
              {
                finalReviewsState?.collection.filter((result: any) => (result.correspondingAuthor === authUser?.uid)).map((res)=>{
                  return (
                    <div key={res.id}>
                      <h5>{res.abstract}</h5>
                      <p>{res.review}</p>
                      {/* <p>{res.finalResult}</p> */}
                    </div>
                  )
                })
              }
            </div>
          </div>
        )
      }
    </StyledDashboardPageLayout>
  )
}

export default ReviewerResponse;