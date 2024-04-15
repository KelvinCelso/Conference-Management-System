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
        <TableCell>
          <Skeleton className="h-10 w-[83px] bg-gray-400" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-[70px] bg-gray-400" />
        </TableCell>
      </TableRow>
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead className="w-40">Title</TableHead>
          <TableHead className="w-40">Topic</TableHead>
          <TableHead className="w-40">Start Date</TableHead>
          <TableHead className="w-40">Reg./Limit</TableHead>
          <TableHead className="w-40">Register</TableHead>
          <TableHead className="w-40">More Info</TableHead>
          <TableHead className="w-40"></TableHead>
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
  );
};

export default AllConferencesSkeleton;
