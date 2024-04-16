import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AllConferencesSkeleton = () => {
  const SkeletonTableRow = ({ cellCount }: { cellCount: number }) => {
    const cells = Array.from({ length: cellCount }).map((_, index) => (
      <TableCell key={index}>
        <Skeleton className="h-4 bg-gray-400" />
      </TableCell>
    ));

    return (
      <TableRow>
        <TableCell className="w-12">
          <Skeleton className="h-4 bg-gray-400" />
        </TableCell>
        {cells}
        {/* <TableCell>
          <Skeleton className="h-10 w-[83px] bg-gray-400" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-[70px] bg-gray-400" />
        </TableCell> */}
      </TableRow>
    );
  };

  return (
    <Table className="max-md:w-[1000px] max-sm:w-[900px]">
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Topic</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>Reg./Limit</TableHead>
          <TableHead>Register</TableHead>
          <TableHead>More Info</TableHead>
          <TableHead className="w-32"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <SkeletonTableRow cellCount={7} />
        <SkeletonTableRow cellCount={7} />
        <SkeletonTableRow cellCount={7} />
        <SkeletonTableRow cellCount={7} />
        <SkeletonTableRow cellCount={7} />
      </TableBody>
    </Table>
  );
};

export default AllConferencesSkeleton;
