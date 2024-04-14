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
import { useRecoilState } from "recoil";
import { PaperDialog } from "@/lib/recoil";

const MyConference = () => {
  const { userAppliedProjectsData, loading } = useUserAppliedProjects();
  const [paperDialog, setPaperDialog] = useRecoilState(PaperDialog);
  const userDataElements = useUserData();
  console.log(userDataElements);
  useEffect(() => {
    // Here, you can work with the userAppliedProjects array
    // console.log(userAppliedProjects);
    // Or perform any other operations with the fetched projects
  }, [userAppliedProjectsData]);
  return (
    <div className="flex w-full justify-center px-10 py-20">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">id</TableHead>
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
                  <TableCell>{project.projectId}</TableCell>
                  <TableCell>{project.userAppliedProject.title}</TableCell>
                  <TableCell>{project.userAppliedProject.topic}</TableCell>
                  <TableCell>
                    {project.userAppliedProject.description}
                  </TableCell>
                  <TableCell>
                    <Dialog open={paperDialog}>
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
