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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

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
    <>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Topic</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>Reg./Limit</TableHead>
            <TableHead>Register</TableHead>
            <TableHead>More Info</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((row, idx) => {
            const projectHasApplied = row.appliedStudents.includes(
              authUser?.uid!
            );
            return (
              <TableRow key={idx}>
                <TableCell className="font-medium">{idx + 1}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.topic}</TableCell>
                <TableCell>{dateToString(row.deadline.startDate)}</TableCell>
                <TableCell>{dateToString(row.deadline.endDate)}</TableCell>
                <TableCell>{`${row.appliedStudents.length}/${row.studentCapacity}`}</TableCell>
                <TableCell>
                  {" "}
                  <Button
                    onClick={() => handleApply(row.id)}
                    disabled={isUpdating || projectHasApplied}
                    className="bg-green-500"
                  >
                    {isUpdating
                      ? "Registering"
                      : projectHasApplied
                      ? "Registered"
                      : "Register"}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    onClick={() => handleMoreInfoClick(row)}
                  >
                    More Info
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
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
    </>
  );
};
export default ConferencesTable;
