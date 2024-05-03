import { useEffect, useState } from "react";
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
import { MenuState } from "@/lib/recoil";
import { useRecoilState } from "recoil";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { SelectContent, SelectTrigger } from "@radix-ui/react-select";
import { Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

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
  const [updateStates, setUpdateStates] = useState<{
    [projectId: string]: boolean;
  }>({});
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
  const [openDialog, setOpenDialog] = useState<boolean>(false);
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
  const [opens, setOpens] = useRecoilState(MenuState);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setOpens(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [setOpens]);

  return (
    <div className="mt-navbar max-lg:mt-[50px] ml-sidebar max-lg:ml-0 flex-1 overflow-auto">
      {opens && (
        <div
          className="absolute top-0 right-0 bg-black/10 left-0 bottom-0 z-10"
          onClick={() => setOpens(false)}
        />
      )}
      {loading ? (
        <ConfirmReviewSkeleton />
      ) : (
        <>
          <Table className="max-md:w-[1000px] max-sm:w-[900px]">
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
                      {handleOverflowedText(row.cAuthor)}
                    </TableCell>
                    <TableCell className="co-authors" title={row.authors}>
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Button variant="link">Authors</Button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                          {row.authorNames.map((author) => (
                            <p key={author}>{author}</p>
                          ))}
                        </HoverCardContent>
                      </HoverCard>
                    </TableCell>
                    <TableCell
                      className="co-authors"
                      title={row.assignedReviewers}
                    >
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Button variant="link">Authors</Button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                          {row.assignedReviewers.map((reviewer: any) => {
                            const us = users.find(
                              (user) => user.id === reviewer
                            );
                            const isReviewer =
                              reviewer !==
                              paperReviewerIds.find(
                                (reviewerId) => reviewerId === reviewer
                              );
                            return (
                              <>
                                <p> {`${us?.firstName} ${us?.lastName}`}</p>
                                <Button
                                  variant={"link"}
                                  className={`${
                                    !isReviewer && "text-green-500"
                                  }`}
                                  disabled={isReviewer}
                                  onClick={() => {
                                    setSelectedPaper(
                                      paperReviews.find(
                                        (review) =>
                                          review.reviewerId === reviewer
                                      )
                                    );
                                    setOpenDialog(true);
                                  }}
                                >
                                  Assesment
                                </Button>
                              </>
                            );
                          })}
                        </HoverCardContent>
                      </HoverCard>
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
                      <Button
                        variant={"link"}
                        onClick={() =>
                          handleDownload(row.correspondingAuthor, row.projectId)
                        }
                      >
                        Download PDF
                      </Button>
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
                        <Button
                          className="bg-green-500"
                          onClick={async () => {
                            setUpdateStates({
                              ...updateStates,
                              [dataIndex]: true,
                            });
                            if (!finalAssessments[row.paperId]) {
                              setUpdateStates({
                                ...updateStates,
                                [dataIndex]: false,
                              });
                              return toast({
                                title: "Error",
                                description: "Insert final review",
                                className: "bg-red-500",
                              });
                            }
                            const finalReviewData = {
                              ...row,
                              reviews: paperReviews,
                              finalResult: finalAssessments[row.paperId],
                            };

                            await createFinalReviews(
                              finalReviewData,
                              "finalReviews"
                            );
                            setUpdateStates({
                              ...updateStates,
                              [dataIndex]: false,
                            });
                            toast({
                              title: "Paper Assessed",
                              description:
                                "You have successfully submitted your final assessment",
                            });
                          }}
                        >
                          {updateStates[dataIndex] ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              <span>Please wait</span>
                            </>
                          ) : (
                            "Send final Review"
                          )}
                        </Button>
                      </td>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {/* <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogHeader>
              <DialogTitle>Assessment Result</DialogTitle>
            </DialogHeader>
            <DialogContent>
              <div>
                <p>Topic Comment</p>
                <Textarea
                  disabled
                  value={selectedPaper.assesmentData.topic.topicComment}
                />
              </div>
            </DialogContent>
          </Dialog> */}
          {/* {isAssesmentViewOpen && (
            <>
              <StyledConferencePopupContainer>
                <Backdrop onClick={handleCloseAssesmentView} />
                <AssesmentView
                  paperAssesment={selectedPaper}
                  onClose={handleCloseAssesmentView}
                />
              </StyledConferencePopupContainer>
            </>
          )} */}
        </>
      )}
    </div>
  );
};

export default Papers;
