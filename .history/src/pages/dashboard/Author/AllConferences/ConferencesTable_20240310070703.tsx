import React, { useState } from "react";
import { ConferencesTableProps } from "../../../../types/dashboard/Author/props";
import { StyledConferencesTable } from "../../../../styles/pages/dashboard/Author/AllConferences/ConferencesTable.styled";
import { Timestamp } from "firebase/firestore";
import useUpdateProject from "../../../../hooks/useUpdateProject";
import { ProjectDataTypeWithIds } from "../../../../types/hooks/types";
import ConferencePopup from "./ConferencePopup";
import { StyledConferencePopupContainer } from "../../../../styles/pages/dashboard/Author/AllConferences/ConferencePopupContainer.styled";
import Backdrop from "../../../../components/dashboard/mutual/Backdrop";
import useAuthentication from "../../../../hooks/useAuthentication";

const ConferencesTable: React.FC<ConferencesTableProps> = ({ projects }) => {
  const { updateProject, isUpdating, hasApplied } = useUpdateProject(); // Initializing the hook
  const authUser = useAuthentication();
  const handleApply = async (id: string) => {
    // Assuming you want to update the project when the Apply button is clicked
    try {
      // Logic to update project with userData
      await updateProject(id);
    } catch (error) {
      console.error("Error applying to project:", error);
    }
  };
  const [selectedProject, setSelectedProject] =
    useState<ProjectDataTypeWithIds | null>(null);
  const [isConferencePopupOpen, setIsConferencePopupOpen] =
    useState<boolean>(false);
  const handleMoreInfoClick = (project: ProjectDataTypeWithIds) => {
    setSelectedProject(project);
    setIsConferencePopupOpen(true);
  };
  const handleCloseConferencePopup = () => {
    setIsConferencePopupOpen(false);
  };
  const maxTableContentLength = Infinity;
  const handleOverflowedText = (givenText: string) => {
    if (givenText.length > maxTableContentLength) {
      return `${givenText.substring(0, maxTableContentLength)}...`;
    } else {
      return givenText;
    }
  };
  const dateToString = (date: Date | null) => {
    return date && date instanceof Timestamp
      ? date.toDate().toDateString()
      : "No Start Date";
  };
  return (
    <StyledConferencesTable>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Topic</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Reg./Limit</th>
            <th>Register</th>
            <th>More Info</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((row) => {
            const projectHasApplied = row.appliedStudents.includes(
              authUser?.uid!
            ); // Check if the current user has applied to this project
            return (
              <tr key={row.id}>
                <td title={row.id}>{handleOverflowedText(row.id)}</td>
                <td title={row.title}>{handleOverflowedText(row.title)}</td>
                <td title={row.topic}>{handleOverflowedText(row.topic)}</td>
                <td title={dateToString(row.deadline.startDate)}>
                  {handleOverflowedText(dateToString(row.deadline.startDate))}
                </td>
                <td title={dateToString(row.deadline.endDate)}>
                  {handleOverflowedText(dateToString(row.deadline.endDate))}
                </td>
                <td>{`${row.appliedStudents.length}/${row.studentCapacity}`}</td>
                <td>
                  <button
                    onClick={() => handleApply(row.id)}
                    disabled={isUpdating || projectHasApplied}
                  >
                    {isUpdating
                      ? "Registering"
                      : projectHasApplied
                      ? "Registered"
                      : "Register"}
                  </button>
                </td>
                <td>
                  <button onClick={() => handleMoreInfoClick(row)}>
                    More Info
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {isConferencePopupOpen && (
        <>
          <StyledConferencePopupContainer>
            <Backdrop onClick={handleCloseConferencePopup} />
            <ConferencePopup
              project={selectedProject}
              onClose={handleCloseConferencePopup}
              handleApply={handleApply}
              isUpdating={isUpdating}
              hasApplied={hasApplied}
            />
          </StyledConferencePopupContainer>
        </>
      )}
    </StyledConferencesTable>
  );
};
export default ConferencesTable;
