import TableSkeleton from "@/components/Skeleton/AllConferencesSkeleton";
import useGetProjects from "../../../../hooks/useGetProjects";
import ConferencesTable from "./ConferencesTable";
import { MenuState } from "@/lib/recoil";
import { useRecoilState } from "recoil";
import { useEffect } from "react";

const AllConferences = () => {
  const { projects, loading } = useGetProjects();
  const isProjectsEmpty = projects.length === 0;
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
