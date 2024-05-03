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
import { MenuState } from "@/lib/recoil";
import { useRecoilState } from "recoil";
import { Button } from "@/components/ui/button";
import { PaperSubmissionDataTypeWithIds } from "@/types/hooks/types";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

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
  const [selectedPaper, setSelectedPaper] = useState(null); // State to track selected paper

  const handleDownload = (correspondingAuthorId: string, projectId: string) => {
    downloadLastPdf(correspondingAuthorId, projectId);
  };

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
                <TableHead>Corresponding Author</TableHead>
                <TableHead>Co-authors</TableHead>
                <TableHead>Project</TableHead>
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
                .map((paper: PaperSubmissionDataTypeWithIds, index) => (
                  <TableRow key={index}>
                    <TableCell>{paper.correspondingAuthor}</TableCell>
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
                    <TableCell>{paper.projectId}</TableCell>
                    <TableCell>{paper.fileId}</TableCell>
                    <TableCell>
                      <button
                        onClick={() =>
                          handleDownload(
                            paper.correspondingAuthor,
                            paper.projectId
                          )
                        }
                      >
                        Download PDF
                      </button>
                      <a href={downloadUrl!} target="_blank">
                        d
                      </a>
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => handleAssesPaperClick(paper)}>
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
                ))}
            </TableBody>
          </Table>
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
