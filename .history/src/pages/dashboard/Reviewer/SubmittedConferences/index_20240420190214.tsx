import { useEffect, useState } from "react";
import useGetProjects from "../../../../hooks/useGetProjects";
import useAuthentication from "../../../../hooks/useAuthentication";
import useGetSubmittedPapers from "../../../../hooks/useGetPapersSubmissions";
import useDownloadPDF from "../../../../hooks/useDownloadPdf";
import PaperAssessmentForm from "../PaperAssesment"; // Import the PaperAssessmentForm component
import useGetToBeReviewed from "../../../../hooks/useGetToBeReviewed";
import { StyledSubmittedConferences } from "../../../../styles/pages/dashboard/Reviewer/SubmittedConferences";
import { StyledConferencePopupContainer } from "../../../../styles/pages/dashboard/Author/AllConferences/ConferencePopupContainer.styled";
import Backdrop from "../../../../components/dashboard/mutual/Backdrop";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SubmittedConferencesSkeleton from "@/components/Skeleton/SubmittedConferencesSkeleton";
import { MenuState, PaperReviewDialog } from "@/lib/recoil";
import { useRecoilState } from "recoil";
import { Button } from "@/components/ui/button";
import { PaperSubmissionDataTypeWithIds } from "@/types/hooks/types";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import useGetUsers from "@/hooks/useGetUsers";
import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";

const SubmittedConferences = () => {
  // const { projects, loading } = useGetProjects();
  const [isPaperAssessmentFormOpen, setIsPaperAssessmentFormOpen] =
    useState(false);
  // const [selectedPaper, setSelectedPaper] = useState(null);
  const { submittedPapers } = useGetSubmittedPapers();
  const { toBeReviewed, loading } = useGetToBeReviewed();
  const [opens, setOpens] = useRecoilState(MenuState);
  const authUser = useAuthentication();
  const { downloadLastPdf, downloadUrl, error } = useDownloadPDF();
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const { users } = useGetUsers("authorUsers");

  const handleDownload = (correspondingAuthorId: string, projectId: string) => {
    downloadLastPdf(correspondingAuthorId, projectId);
  };
  const [paperDialogState, setPaperDialogState] =
    useRecoilState(PaperReviewDialog);

  // const handleAssessment = (paper: any) => {
  //   setSelectedPaper(paper); // Set the selected paper for assessment
  // };
  const handleClosePaperAssesmentFormPopup = () => {
    setIsPaperAssessmentFormOpen(false);
  };
  const handleAssesPaperClick = (paper: any) => {
    setSelectedPaper(paper);
    setIsPaperAssessmentFormOpen(true);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setOpens(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [setOpens]);
  const handleDialogOpen = (projectId: string) => {
    setSelectedProjectId(projectId);

    setPaperDialogState(true);
  };

  const handleDialogClose = () => {
    setPaperDialogState(false);
    setSelectedProjectId("");
  };
  return (
    <div className="mt-navbar max-lg:mt-[50px] ml-sidebar max-lg:ml-0 flex-1 overflow-auto">
      {opens && (
        <div
          className="absolute top-0 right-0 bg-black/10 left-0 bottom-0 z-10"
          onClick={() => setOpens(false)}
        />
      )}
      {loading ? (
        <SubmittedConferencesSkeleton />
      ) : (
        <>
          <Table className="max-md:w-[1000px] max-sm:w-[900px]">
            <TableHeader>
              <TableRow>
                {/* <th>Paper</th> */}

                <TableHead>Project Id</TableHead>
                <TableHead>Corresponding Author</TableHead>
                <TableHead>Co-authors</TableHead>

                <TableHead>File</TableHead>
                <TableHead>Download File</TableHead>
                <TableHead>Asses Paper</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {toBeReviewed
                .filter(({ assignedReviewers }) =>
                  (assignedReviewers as string[]).includes(authUser?.uid!)
                )
                .map((paper: PaperSubmissionDataTypeWithIds, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{paper.projectId}</TableCell>
                      <TableCell>{paper.cAuthor}</TableCell>
                      <TableCell>
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <Button variant="link">Authors</Button>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-80">
                            {paper.authorNames.map((author) => (
                              <p key={author}>{author}</p>
                            ))}
                          </HoverCardContent>
                        </HoverCard>
                      </TableCell>

                      <TableCell>{paper.fileId}</TableCell>
                      <TableCell>
                        <Button
                          variant={"link"}
                          onClick={() =>
                            handleDownload(
                              paper.correspondingAuthor,
                              paper.projectId
                            )
                          }
                        >
                          Download PDF
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          className="bg-green-500"
                          onClick={() => handleDialogOpen(paper.id)}
                        >
                          Assess Paper
                        </Button>
                      </TableCell>
                      {/* <td>
                <select
                  name="assignedReviewers"
                  value={
                    assignedReviewers[index]?.[
                      assignedReviewers[index]?.length - 1
                    ] || ""
                  }
                  onChange={(e) => handleAssignReviewer(e, index)}
                >
                  <option value="">Select Reviewer</option>
                  {authUser?.uid && (
                    <option value={authUser?.uid!}>{authUser?.uid}</option>
                  )}
                </select>
              </td> */}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          <Dialog open={paperDialogState} onOpenChange={handleDialogClose}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Submit Papers</DialogTitle>
                <DialogDescription>
                  fill the forms to resubmit the paper
                </DialogDescription>
              </DialogHeader>
              {selectedProjectId && (
                <PaperAssessmentForm
                  // correspondingAuthor={selectedPaper.correspondingAuthor}
                  // projectId={selectedPaper.projectId}
                  selectedPaper={selectedPaper}
                  onClose={handleClosePaperAssesmentFormPopup}
                />
              )}
            </DialogContent>
          </Dialog>
          {isPaperAssessmentFormOpen && (
            <StyledConferencePopupContainer>
              <Backdrop onClick={handleClosePaperAssesmentFormPopup} />
              <PaperAssessmentForm
                // correspondingAuthor={selectedPaper.correspondingAuthor}
                // projectId={selectedPaper.projectId}
                selectedPaper={selectedPaper}
                onClose={handleClosePaperAssesmentFormPopup}
              />
            </StyledConferencePopupContainer>
          )}
        </>
      )}
    </div>
  );
};

export default SubmittedConferences;
