import { StyledAssesmentView } from "../../../../styles/pages/dashboard/Admin/ConfirmReview/AssesmentView.styled";
import { AssesmentViewProps } from "../../../../types/dashboard/Admin/props";

const AssesmentView: React.FC<AssesmentViewProps> = ({
  onClose,
  paperAssesment,
}) => {
    const assesmentData = paperAssesment.assesmentData;
  return (
    <StyledAssesmentView>
        <button onClick={onClose}>close</button>
      <div>
        <h4>Topic: {assesmentData.topic}</h4>
        <h4>Topic Comment: {assesmentData.topicComment}</h4>
      </div>
      <div>
        <h4>Contribution: {assesmentData.contribution}</h4>
        <h4>Contribution Comment: {assesmentData.contributionComment}</h4>
      </div>
      <div>
        <h4>Academic Quality: {assesmentData.academicQuality}</h4>
        <h4>Academic Quality Comment: {assesmentData.academicQualityComment}</h4>
      </div>
      <div>
        <h4>Verification of Results: {assesmentData.verificationOfResults}</h4>
        <h4>Verification of Results Comment: {assesmentData.verificationOfResultsComment}</h4>
      </div>
      <div>
        <h4>Novelty: {assesmentData.novelty}</h4>
        <h4>Novelty Comment: {assesmentData.noveltyComment}</h4>
      </div>
      <div>
        <h4>Literature Review and Bibliography: {assesmentData.literatureReviewAndBibliography}</h4>
        <h4>Literature Review and Bibliography Comment: {assesmentData.literatureReviewAndBibliographyComment}</h4>
      </div>
      <div>
        <h4>Language: {assesmentData.language}</h4>
        <h4>Language Comment: {assesmentData.languageComment}</h4>
      </div>
      <div>
        <h4>Style and Format: {assesmentData.styleAndFormat}</h4>
        <h4>Style and Format Comment: {assesmentData.styleAndFormatComment}</h4>
      </div>
      <div>
        <h4>Summary: {assesmentData.summary}</h4>
      </div>
      <div>
        <h4>Comments for Organizing Committee: {assesmentData.commentsForOrganizingCommittee}</h4>
      </div>
      <div>
        <h4>Recommendation: {assesmentData.recommendation}</h4>
      </div>
    </StyledAssesmentView>
  );
};

export default AssesmentView;
