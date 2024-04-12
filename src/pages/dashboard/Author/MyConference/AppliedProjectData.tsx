import React from "react";
import { AppliedProjectDataProps } from "../../../../types/dashboard/Author/props";
import PaperSubmissionInputs from "./PaperSubmissionInputs";

const AppliedProjectData: React.FC<AppliedProjectDataProps> = ({
  projectData,
  projectId
}) => {
  return (
    <div>
      <h3>{projectData.title}</h3>
      <p>{projectData.description}</p>
      <span>{projectId}</span>
      <PaperSubmissionInputs projectId = {projectId} />
    </div>
  );
};

export default AppliedProjectData;