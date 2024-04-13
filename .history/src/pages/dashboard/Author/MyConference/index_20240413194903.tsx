import { useEffect } from "react";
import { StyledMyConference } from "../../../../styles/pages/dashboard/Author/MyConference";
import useUserAppliedProjects from "../../../../hooks/useUserAppliedProjects"; // Adjust the path
import ReadOnlyUserData from "./ReadOnlyUserData";
import AppliedProjectData from "./AppliedProjectData";
import useUserData from "../../../../hooks/useUserData";

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
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {/* <ReadOnlyUserData userDataElements={userDataElements} /> */}
          {userAppliedProjectsData.map((project) => {
            return (
              <AppliedProjectData
                key={project.projectId}
                projectData={project.userAppliedProject}
                projectId={project.projectId}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyConference;
