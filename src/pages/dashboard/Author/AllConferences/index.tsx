import TableSkeleton from "@/components/Skeleton/AllConferencesSkeleton";
import useGetProjects from "../../../../hooks/useGetProjects";
import ConferencesTable from "./ConferencesTable";

const AllConferences = () => {
  const { projects, loading } = useGetProjects();
  const isProjectsEmpty = projects.length === 0;

  return (
    <div className="flex-1 pt-20">
      {loading ? (
        <TableSkeleton />
      ) : isProjectsEmpty ? (
        <div>No Projects Available</div>
      ) : (
        <ConferencesTable projects={projects} />
      )}
    </div>
  );
};

export default AllConferences;
