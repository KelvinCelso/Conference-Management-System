import React, { useState } from "react";
import usePaperAssessment from "../../../../hooks/usePaperAssesment"; // Import your custom hook
import { PaperAssesmentFormProps } from "../../../../types/dashboard/Reviewer/props";
import { PaperAssesmentDataType } from "../../../../types/dashboard/Reviewer/types";
import { initialPaperAssesmentData } from "../../../../data/pages/dashboard/Reviewer/InitialPaperAssesmentData";
import useCreateProject from "../../../../hooks/useCreateProject";
import useCreateDoc from "../../../../hooks/useCreateDoc";
import useAuthentication from "../../../../hooks/useAuthentication";
import { StyledPaperAssesmentForm } from "../../../../styles/pages/dashboard/Reviewer/SubmittedConferences/PaperAssesmentForm.styled";
const PaperAssessmentForm: React.FC<PaperAssesmentFormProps> = ({
  selectedPaper,
}) => {
  console.log(selectedPaper);
  const authUser = useAuthentication();

  const { submitAssessment, error } = usePaperAssessment();
  const [formData, setFormData] = useState<PaperAssesmentDataType>(
    initialPaperAssesmentData
  );

  const createReview = useCreateDoc();

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createReview(
      {
        assesmentData: formData,
        correspondingAuthor: selectedPaper?.correspondingAuthor,
        projectId: selectedPaper?.projectId,
        reviewerId: authUser?.uid,
        assignedReviewers: selectedPaper?.assignedReviewers,
        paperId: selectedPaper?.paperId,
      },
      "reviewSubmissions"
    );
    try {
      await submitAssessment(
        formData,
        selectedPaper.correspondingAuthor,
        selectedPaper.projectId
      );
      // Reset the form after submission...
    } catch (err) {
      console.error("Error submitting assessment:", err);
      // Handle error scenarios...
    }
  };

  return (
    <>
      <div>
        <label>
          Topic:
          <select
            value={formData.topic}
            onChange={(e) =>
              setFormData({ ...formData, topic: parseInt(e.target.value) })
            }
          >
            {[...Array(11).keys()].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Topic Comment:
          <textarea
            value={formData.topicComment}
            cols={30}
            rows={5}
            onChange={(e) =>
              setFormData({ ...formData, topicComment: e.target.value })
            }
          />
        </label>
        <br />

        <label>
          Contribution:
          <select
            value={formData.contribution}
            onChange={(e) =>
              setFormData({
                ...formData,
                contribution: parseInt(e.target.value),
              })
            }
          >
            {[...Array(11).keys()].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Contribution Comment:
          <textarea
            value={formData.contributionComment}
            onChange={(e) =>
              setFormData({ ...formData, contributionComment: e.target.value })
            }
            cols={30}
            rows={5}
          />
        </label>
        <br />

        <label>
          Academic Quality:
          <select
            value={formData.academicQuality}
            onChange={(e) =>
              setFormData({
                ...formData,
                academicQuality: parseInt(e.target.value),
              })
            }
          >
            {[...Array(11).keys()].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Academic Quality Comment:
          <textarea
            value={formData.academicQualityComment}
            onChange={(e) =>
              setFormData({
                ...formData,
                academicQualityComment: e.target.value,
              })
            }
            cols={30}
            rows={5}
          />
        </label>
        <br />

        <label>
          Verification of Results:
          <select
            value={formData.verificationOfResults}
            onChange={(e) =>
              setFormData({
                ...formData,
                verificationOfResults: parseInt(e.target.value),
              })
            }
          >
            {[...Array(11).keys()].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Verification of Results Comment:
          <textarea
            value={formData.verificationOfResultsComment}
            onChange={(e) =>
              setFormData({
                ...formData,
                verificationOfResultsComment: e.target.value,
              })
            }
            cols={30}
            rows={5}
          />
        </label>
        <br />

        <label>
          Novelty:
          <select
            value={formData.novelty}
            onChange={(e) =>
              setFormData({
                ...formData,
                novelty: parseInt(e.target.value),
              })
            }
          >
            {[...Array(11).keys()].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Novelty Comment:
          <textarea
            value={formData.noveltyComment}
            onChange={(e) =>
              setFormData({
                ...formData,
                noveltyComment: e.target.value,
              })
            }
            cols={30}
            rows={5}
          />
        </label>
        <br />

        <label>
          Literature Review and Bibliography:
          <select
            value={formData.literatureReviewAndBibliography}
            onChange={(e) =>
              setFormData({
                ...formData,
                literatureReviewAndBibliography: parseInt(e.target.value),
              })
            }
          >
            {[...Array(11).keys()].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Literature Review and Bibliography Comment:
          <textarea
            value={formData.literatureReviewAndBibliographyComment}
            onChange={(e) =>
              setFormData({
                ...formData,
                literatureReviewAndBibliographyComment: e.target.value,
              })
            }
            cols={30}
            rows={5}
          />
        </label>
        <br />

        <label>
          Language:
          <select
            value={formData.language}
            onChange={(e) =>
              setFormData({
                ...formData,
                language: parseInt(e.target.value),
              })
            }
          >
            {[...Array(11).keys()].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
        <br />

        <label>
          Language Comment:
          <textarea
            value={formData.languageComment}
            onChange={(e) =>
              setFormData({
                ...formData,
                languageComment: e.target.value,
              })
            }
            cols={30}
            rows={5}
          />
        </label>
        <br />

        <label>
          Style and Format:
          <select
            value={formData.styleAndFormat}
            onChange={(e) =>
              setFormData({
                ...formData,
                styleAndFormat: parseInt(e.target.value),
              })
            }
          >
            {[...Array(11).keys()].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
        <br />

        <label>
          Style and Format Comment:
          <textarea
            value={formData.styleAndFormatComment}
            onChange={(e) =>
              setFormData({
                ...formData,
                styleAndFormatComment: e.target.value,
              })
            }
            cols={30}
            rows={5}
          />
        </label>
        <br />

        <label>
          Summary:
          <textarea
            value={formData.summary}
            onChange={(e) =>
              setFormData({
                ...formData,
                summary: e.target.value,
              })
            }
            cols={30}
            rows={5}
          />
        </label>
        <br />

        <label>
          Comments for Organizing Committee:
          <textarea
            value={formData.commentsForOrganizingCommittee}
            onChange={(e) =>
              setFormData({
                ...formData,
                commentsForOrganizingCommittee: e.target.value,
              })
            }
            cols={30}
            rows={5}
          />
        </label>
        <br />

        <label>
          Recommendation:
          <select
            value={formData.recommendation}
            onChange={(e) =>
              setFormData({ ...formData, recommendation: e.target.value })
            }
          >
            {["Reject", "Weak Accept", "Accept", "Strong Accept"].map(
              (option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              )
            )}
          </select>
        </label>
        <br />

        <button type="submit">Submit Assessment</button>
        {/* {error && <p>Error: {error}</p>} */}
      </div>
    </>
  );
};

export default PaperAssessmentForm;
