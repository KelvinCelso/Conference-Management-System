import useGetProjects from "../../../../hooks/useGetProjects";
import ConferencesTable from "./ConferencesTable";

const AllConferences = () => {
  const { projects, loading } = useGetProjects();
  const isProjectsEmpty = projects.length === 0;
  return (
    <div className="flex-1 px-6 pt-20">
      {loading ? (
        <div>Loading...</div>
      ) : isProjectsEmpty ? (
        <div>No Projects Available</div>
      ) : (
        <ConferencesTable projects={projects} />
      )}
    </div>
  );
};

export default AllConferences;
