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

const MyConference = () => {
  const { userAppliedProjectsData, loading } = useUserAppliedProjects();
  const userDataElements = useUserData();
  console.log(userDataElements);
  useEffect(() => {
    // Here, you can work with the userAppliedProjects array
    // console.log(userAppliedProjects);
    // Or perform any other operations with the fetched projects
  }, [userAppliedProjectsData]);
  return (
    <div className="flex w-full items-center justify-center">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Table>
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
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default MyConference;
