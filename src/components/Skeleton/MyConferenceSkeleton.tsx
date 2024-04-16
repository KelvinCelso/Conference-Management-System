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

const MyConferenceSkeleton = () => {
  const SkeletonTableRow = ({ cellCount }: { cellCount: number }) => {
    const cells = Array.from({ length: cellCount }).map((_, index) => (
      <TableCell key={index}>
        <Skeleton className="h-4  bg-gray-400" />
      </TableCell>
    ));

    return (
      <TableRow>
        <TableCell className="w-12">
          <Skeleton className="h-4 w-4 bg-gray-400" />
        </TableCell>
        {cells}
      </TableRow>
    );
  };

  return (
    <Table className="max-md:w-[1000px] max-sm:w-[900px]">
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead className="w-40">Conference Name</TableHead>
          <TableHead className="w-40">Conference Topic</TableHead>
          <TableHead className="w-40">Conference Description</TableHead>
          <TableHead className="w-40">Apply</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <SkeletonTableRow cellCount={4} />
        <SkeletonTableRow cellCount={4} />
        <SkeletonTableRow cellCount={4} />
        <SkeletonTableRow cellCount={4} />
        <SkeletonTableRow cellCount={4} />
      </TableBody>
    </Table>
  );
};

export default MyConferenceSkeleton;
