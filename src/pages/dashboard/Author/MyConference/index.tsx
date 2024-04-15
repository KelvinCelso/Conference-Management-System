import { useEffect } from "react";
import useUserAppliedProjects from "../../../../hooks/useUserAppliedProjects"; // Adjust the path
import useUserData from "../../../../hooks/useUserData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import PaperSubmissionInputs from "./PaperSubmissionInputs";
import MyConferenceSkeleton from "@/components/Skeleton/MyConferenceSkeleton";

const MyConference = () => {
  const { userAppliedProjectsData, loading } = useUserAppliedProjects();
  const userDataElements = useUserData();
  console.log(userDataElements);
  useEffect(() => {}, [userAppliedProjectsData]);

  return (
    <div className="flex-1 justify-center py-20">
      {loading ? (
        <MyConferenceSkeleton />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Conference Name</TableHead>
              <TableHead>Conference Topic</TableHead>
              <TableHead>Conference Description</TableHead>
              <TableHead>Apply</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userAppliedProjectsData.map((project, idx) => {
              return (
                <TableRow key={idx}>
                  <TableCell className="w-72">{project.projectId}</TableCell>
                  <TableCell className="w-72">
                    {project.userAppliedProject.title}
                  </TableCell>
                  <TableCell className="w-72">
                    {project.userAppliedProject.topic}
                  </TableCell>
                  <TableCell className="w-72">
                    {project.userAppliedProject.description}
                  </TableCell>
                  <TableCell className="w-72">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-green-500">Submit Paper</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Edit profile</DialogTitle>
                          <DialogDescription>
                            Make changes to your profile here. Click save when
                            you're done.
                          </DialogDescription>
                        </DialogHeader>
                        <PaperSubmissionInputs projectId={project.projectId} />
                        <DialogFooter></DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default MyConference;
