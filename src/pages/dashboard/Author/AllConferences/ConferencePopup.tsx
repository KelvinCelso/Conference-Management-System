import React, { useState } from "react";
import { StyledConferencePopup } from "../../../../styles/pages/dashboard/Author/AllConferences/ConferencePopup.styled";
import { ConferencePopupProps } from "../../../../types/dashboard/Author/props";
import { StyledAccordion } from "../../../../styles/pages/dashboard/Author/AllConferences/Accordion.styled";

const ConferencePopup: React.FC<ConferencePopupProps> = ({
  project,
  onClose,
  handleApply,
  isUpdating,
  hasApplied,
}) => {
  const [expanded, setExpanded] = useState<string[]>([]);

  const handleAccordionClick = (itemName: string) => {
    setExpanded((prevExpanded) =>
      prevExpanded.includes(itemName)
        ? prevExpanded.filter((item) => item !== itemName)
        : [...prevExpanded, itemName]
    );
  };

  const isItemExpanded = (itemName: string) => {
    return expanded.includes(itemName);
  };

  return (
    <StyledConferencePopup>
      <button onClick={onClose}>Close</button>
      {project && (
        <div>
          <div>
            <StyledAccordion>
              <button
                className="expand-button"
                onClick={() => handleAccordionClick(project.id)}
                style={{ cursor: "pointer", marginBottom: "5px" }}
              >
                <strong>{project.id}</strong>
              </button>
              {isItemExpanded(project.id) && (
                <div className="expandable" style={{ paddingLeft: "20px" }}>{project.id}</div>
              )}
            </StyledAccordion>
            <StyledAccordion>
              <button
                className="expand-button"
                onClick={() => handleAccordionClick(project.title)}
                style={{ cursor: "pointer", marginBottom: "5px" }}
              >
                <strong>{project.title}</strong>
              </button>
              {isItemExpanded(project.title) && (
                <div className="expandable" style={{ paddingLeft: "20px" }}>{project.title}</div>
              )}
            </StyledAccordion>
            <StyledAccordion>
              <button
                className="expand-button"
                onClick={() => handleAccordionClick(project.topic)}
                style={{ cursor: "pointer", marginBottom: "5px" }}
              >
                <strong>{project.topic}</strong>
              </button>
              {isItemExpanded(project.topic) && (
                <div className="expandable" style={{ paddingLeft: "20px" }}>{project.topic}</div>
              )}
            </StyledAccordion>
          </div>
          <button
            onClick={() => handleApply(project.id)}
            disabled={isUpdating || hasApplied}
          >
            {isUpdating
              ? "Registering"
              : hasApplied
              ? "Registered"
              : "Register"}
          </button>
        </div>
      )}
    </StyledConferencePopup>
  );
};

export default ConferencePopup;
