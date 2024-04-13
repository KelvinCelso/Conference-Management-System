import useGetProjects from "../../../../hooks/useGetProjects";
import { StyledAllConferences } from "../../../../styles/pages/dashboard/Author/AllConferences/index.styled";
import { ProjectDataTypeWithIds } from "../../../../types/hooks/types";
import Conference from "./Conference";
import ConferencesTable from "./ConferencesTable";

const AllConferences = () => {
  const { projects, loading } = useGetProjects();
  const isProjectsEmpty = projects.length === 0;
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : isProjectsEmpty ? (
        <div>No Projects Available</div>
      ) : (
        <ConferencesTable projects={projects} />
      )}
    </>
  );
};

export default AllConferences;
