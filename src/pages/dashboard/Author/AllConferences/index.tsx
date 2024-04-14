import useGetProjects from "../../../../hooks/useGetProjects";
import ConferencesTable from "./ConferencesTable";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AllConferences = () => {
  const { projects, loading } = useGetProjects();
  const isProjectsEmpty = projects.length === 0;

  const SkeletonTableRow = ({ cellCount }: { cellCount: number }) => {
    const cells = Array.from({ length: cellCount }).map((_, index) => (
      <TableCell key={index}>
        <Skeleton className="h-4 w- bg-gray-400" />
      </TableCell>
    ));

    return (
      <TableRow>
        <TableCell className="w-10">
          <Skeleton className="h-4 w-4 bg-gray-400" />
        </TableCell>
        {cells}
        <TableCell>
          <Skeleton className="h-10 w-[83px] bg-gray-400" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-[50px] bg-gray-400" />
        </TableCell>
      </TableRow>
    );
  };

  return (
    <div className="flex-1 px-6 pt-20">
      {loading ? (
        <Table>
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
            <SkeletonTableRow cellCount={5} />
            <SkeletonTableRow cellCount={5} />
            <SkeletonTableRow cellCount={5} />
            <SkeletonTableRow cellCount={5} />
            <SkeletonTableRow cellCount={5} />
          </TableBody>
        </Table>
      ) : isProjectsEmpty ? (
        <div>No Projects Available</div>
      ) : (
        <ConferencesTable projects={projects} />
      )}
    </div>
  );
};

export default AllConferences;
