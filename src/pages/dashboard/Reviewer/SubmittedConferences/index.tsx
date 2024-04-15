import { useState } from "react";
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

const SubmittedConferences = () => {
  // const { projects, loading } = useGetProjects();
  const [isPaperAssessmentFormOpen, setIsPaperAssessmentFormOpen] =
    useState(false);
  // const [selectedPaper, setSelectedPaper] = useState(null);
  const { submittedPapers } = useGetSubmittedPapers();
  const { toBeReviewed, loading } = useGetToBeReviewed();
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
  return (
    <div className="mt-navbar py-1 ml-sidebar flex-1">
      {loading ? (
        <SubmittedConferencesSkeleton />
      ) : (
        <>
          <Table>
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
                .map((paper, index) => (
                  <tr key={index}>
                    <td>{paper.correspondingAuthor}</td>
                    <td>
                      {paper.authors.map((author: any) => {
                        return <p key={author}>{author}</p>;
                      })}
                    </td>
                    <td>{paper.projectId}</td>
                    <td>{paper.fileId}</td>
                    <td>
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
                    </td>
                    <td>
                      <button onClick={() => handleAssesPaperClick(paper)}>
                        Assess Paper
                      </button>
                    </td>
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
                  </tr>
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
