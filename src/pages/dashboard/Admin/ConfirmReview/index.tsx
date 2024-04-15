import { useState } from "react";
import useGetSubmittedPapers from "../../../../hooks/useGetPapersSubmissions";
import { StyledPapers } from "../../../../styles/pages/dashboard/Admin/Papers/index.styled";
import useGetUsers from "../../../../hooks/useGetUsers";
import useCreatePapersToBeReviewed from "../../../../hooks/useCreatePapersToBeReviewed";
import { StyledConfirmReview } from "../../../../styles/pages/dashboard/Admin/ConfirmReview/index.styled";
import useGetToBeReviewed from "../../../../hooks/useGetToBeReviewed";
import useDownloadPDF from "../../../../hooks/useDownloadPdf";
import useGetReviews from "../../../../hooks/useGetReviews";
import { StyledConferencePopupContainer } from "../../../../styles/pages/dashboard/Author/AllConferences/ConferencePopupContainer.styled";
import Backdrop from "../../../../components/dashboard/mutual/Backdrop";
import AssesmentView from "./AssesmentView";
import useCreateFinalReviews from "../../../../hooks/useCreateFinalReviews";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ConfirmReviewSkeleton from "@/components/Skeleton/ConfirmReviewSkeleton";

const Papers = () => {
  const [isAssesmentViewOpen, setIsAssesmentViewOpen] =
    useState<boolean>(false);
  const [selectedPaper, setSelectedPaper] = useState<any | null>(null);
  const [finalAssessments, setFinalAssessments] = useState<{
    [key: string]: string;
  }>({});
  const createFinalReviews = useCreateFinalReviews();
  const { submittedPapers } = useGetSubmittedPapers();
  const { toBeReviewed, loading } = useGetToBeReviewed();
  const { reviews } = useGetReviews();
  const { downloadLastPdf, downloadUrl, error } = useDownloadPDF();
  const collectionName = "reviewerUsers";
  const { users } = useGetUsers(collectionName);
  const createPapersToBeReviewed = useCreatePapersToBeReviewed();
  const handleFinalAssessmentChange = (
    paperId: string,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFinalAssessments((prevState) => ({
      ...prevState,
      [paperId]: event.target.value,
    }));
  };
  const handleDownload = (correspondingAuthorId: string, projectId: string) => {
    downloadLastPdf(correspondingAuthorId, projectId);
  };
  const handleCloseAssesmentView = () => {
    setIsAssesmentViewOpen(false);
  };
  const handleOpenAssesmentView = (paper: any) => {
    setSelectedPaper(paper);
    setIsAssesmentViewOpen(true);
  };
  const maxTableContentLength = 9;
  const handleOverflowedText = (givenText: string) => {
    if (givenText.length > maxTableContentLength) {
      return `${givenText.substring(0, maxTableContentLength)}...`;
    } else {
      return givenText;
    }
  };
  return (
    <div className="mt-navbar py-1 ml-sidebar flex-1">
      {loading ? (
        <ConfirmReviewSkeleton />
      ) : (
        <>
          <Table>
            <TableCaption>A list of </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24">Project ID</TableHead>
                <TableHead>Corresponding Author</TableHead>
                <TableHead>Co-authors</TableHead>
                <TableHead>Assigned Reviewers</TableHead>
                <TableHead>Abstract</TableHead>
                <TableHead>File</TableHead>
                <TableHead>Download File</TableHead>
                <TableHead>Final Assesment</TableHead>
                <TableHead>Send</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {toBeReviewed?.map((row: any, dataIndex) => {
                const paperReviewerIds = reviews
                  .filter((rev) => rev.paperId === row.paperId)
                  .map((rev: any) => rev.reviewerId);
                const paperReviews = reviews.filter(
                  (rev) => rev.paperId === row.paperId
                );
                return (
                  <TableRow key={dataIndex}>
                    <TableCell title={row.projectId}>
                      {handleOverflowedText(row.projectId)}
                    </TableCell>
                    <TableCell title={row.correspondingAuthor}>
                      {handleOverflowedText(row.correspondingAuthor)}
                    </TableCell>
                    <TableCell className="co-authors" title={row.authors}>
                      {row.authors.map((author: any) => {
                        return (
                          <p key={author}>{handleOverflowedText(author)}</p>
                        );
                      })}
                    </TableCell>
                    <TableCell
                      className="co-authors"
                      title={row.assignedReviewers}
                    >
                      {row.assignedReviewers.map((reviewer: any) => {
                        return (
                          <p key={reviewer}>
                            <span>{handleOverflowedText(reviewer)}</span>
                            <button
                              disabled={
                                reviewer !==
                                paperReviewerIds.find(
                                  (reviewerId) => reviewerId === reviewer
                                )
                              }
                              onClick={() =>
                                handleOpenAssesmentView(
                                  paperReviews.find(
                                    (review) => review.reviewerId === reviewer
                                  )
                                )
                              }
                            >
                              Assesment
                            </button>
                          </p>
                        );
                      })}
                    </TableCell>
                    <TableCell title={row.abstract}>
                      {handleOverflowedText(row.abstract)}
                    </TableCell>
                    <TableCell>{row.fileId}</TableCell>
                    {/* <td>
                    <div>
                      <label>Assign reviewer(s):</label>
                      <select
                        name="assignedReviewers"
                        value={
                          assignedReviewers[dataIndex]?.[
                            assignedReviewers[dataIndex]?.length - 1
                          ] || ""
                        } // Set value to the last selected author ID or an empty string if no author is selected
                        onChange={(e) =>
                          handleAssignedReviewerChange(e, dataIndex)
                        }
                      >
                        <option value="">Select...</option>
                        {users.map((user: any) => (
                          <option key={user.id} value={user.id}>
                            {`${user.firstName} ${user.lastName}`}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="selectedUserNames">
                      {assignedReviewerNames[dataIndex]?.map(
                        (reviewerName, index) => (
                          <div key={index}>
                            {reviewerName}{" "}
                            <button
                              type="button"
                              onClick={() =>
                                removeAssignedReviewer(index, dataIndex)
                              }
                            >
                              x
                            </button>
                          </div>
                        )
                      )}
                    </div>
                  </td> */}
                    <TableCell>
                      <button
                        onClick={() =>
                          handleDownload(row.correspondingAuthor, row.projectId)
                        }
                      >
                        Download PDF
                      </button>
                      <a href={downloadUrl!} target="_blank">
                        d
                      </a>
                    </TableCell>
                    <TableCell>
                      <select
                        value={finalAssessments[row.paperId] || ""}
                        onChange={(e) =>
                          handleFinalAssessmentChange(row.paperId, e)
                        }
                      >
                        <option value="">Select...</option>
                        <option value="Reject">Reject</option>
                        <option value="Weak Accept">Weak Accept</option>
                        <option value="Accept">Accept</option>
                        <option value="Strong Accept">Strong Accept</option>
                      </select>
                    </TableCell>
                    <TableCell>
                      <td>
                        <button
                          onClick={() => {
                            const finalReviewData = {
                              ...row,
                              reviews: paperReviews,
                              finalResult: finalAssessments[row.paperId],
                            };
                            createFinalReviews(finalReviewData, "finalReviews");
                          }}
                        >
                          Send
                        </button>
                      </td>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {isAssesmentViewOpen && (
            <>
              <StyledConferencePopupContainer>
                <Backdrop onClick={handleCloseAssesmentView} />
                <AssesmentView
                  paperAssesment={selectedPaper}
                  onClose={handleCloseAssesmentView}
                />
              </StyledConferencePopupContainer>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Papers;
