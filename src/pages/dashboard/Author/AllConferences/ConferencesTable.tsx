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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { auth } from "@/firebase";
import useGetProjects from "@/hooks/useGetProjects";

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
  const { loading } = useGetProjects();

  return (
    <>
      <Table>
        <TableCaption>A list of your recent Conferences.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Topic</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>Reg./Limit</TableHead>
            <TableHead>Register</TableHead>
            <TableHead>More Info</TableHead>
            <TableHead></TableHead>
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
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="link"
                        onClick={() => handleMoreInfoClick(row)}
                      >
                        More Info
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                          Make changes to your profile here. Click save when
                          you're done.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Id
                          </Label>
                          <Input
                            disabled
                            value={row.id}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="username" className="text-right">
                            Conference Name
                          </Label>
                          <Input
                            disabled
                            value={row.title}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="username" className="text-right">
                            Topic
                          </Label>
                          <Input
                            disabled
                            value={row.topic}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="username" className="text-right">
                            Start Date
                          </Label>
                          <Input
                            disabled
                            value={dateToString(row.deadline.startDate)}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="username" className="text-right">
                            Start Date
                          </Label>
                          <Input
                            disabled
                            value={dateToString(row.deadline.endDate)}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
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
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};
export default ConferencesTable;
