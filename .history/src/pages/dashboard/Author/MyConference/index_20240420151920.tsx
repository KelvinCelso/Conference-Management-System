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
import { useRecoilState } from "recoil";
import { MenuState, PaperDialog } from "@/lib/recoil";
import useGetUserPapers from "@/hooks/useGetUserPapers";

const MyConference = () => {
  const [paperDialogStete, setPaperDialogState] = useRecoilState(PaperDialog);
  const { userAppliedProjectsData, loading } = useUserAppliedProjects();
  const userPapers = useGetUserPapers();
  const { userData } = useUserData();
  const userDataElements = useUserData();
  console.log(userDataElements);
  useEffect(() => {}, [userAppliedProjectsData]);

  const [opens, setOpens] = useRecoilState(MenuState);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setOpens(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [setOpens]);

  return (
    <div className="mt-navbar max-lg:mt-[50px] ml-sidebar max-lg:ml-0 flex-1 overflow-auto">
      {opens && (
        <div
          className="absolute top-0 right-0 bg-black/10 left-0 bottom-0 z-10"
          onClick={() => setOpens(false)}
        />
      )}
      {loading ? (
        <MyConferenceSkeleton />
      ) : (
        <Table className="max-md:w-[1000px] max-sm:w-[900px]">
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
              const pr = userData.submittedPapers?.find(
                (p) => p.projectId == project.projectId
              );
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
                    {}
                    <Dialog
                      open={paperDialogStete}
                      onOpenChange={setPaperDialogState}
                    >
                      <DialogTrigger asChild>
                        <Button className={"bg-green-800"}>
                          {pr ? "Resubmit Paper" : "Submit Paper"}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Submit Papers</DialogTitle>
                          <DialogDescription>
                            fill the forms to resubmit the paper
                          </DialogDescription>
                        </DialogHeader>
                        {userData.submittedPapers?.find(
                          (p) => p.projectId == project.projectId
                        ) ? (
                          <PaperSubmissionInputs
                            projectId={project.projectId}
                            paper={userData.submittedPapers?.find(
                              (p) => p.projectId == project.projectId
                            )}
                          />
                        ) : (
                          <PaperSubmissionInputs
                            projectId={project.projectId}
                          />
                        )}
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
