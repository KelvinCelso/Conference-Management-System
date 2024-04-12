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
    <StyledSubmittedConferences>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                {/* <th>Paper</th> */}
                <th>Corresponding Author</th>
                <th>Co-authors</th>
                <th>Project</th>
                <th>File</th>
                <th>Download File</th>
                <th>Asses Paper</th>
              </tr>
            </thead>
            <tbody>
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
            </tbody>
          </table>
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
    </StyledSubmittedConferences>
  );
};

export default SubmittedConferences;
