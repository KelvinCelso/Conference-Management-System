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

const ResultsSkeleton = () => {
  const SkeletonTableRow = ({ cellCount }: { cellCount: number }) => {
    const cells = Array.from({ length: cellCount }).map((_, index) => (
      <TableCell key={index}>
        <Skeleton className="h-4 bg-gray-400" />
      </TableCell>
    ));

    return <TableRow>{cells}</TableRow>;
  };

  return (
    <Table className="max-md:w-[1000px] max-sm:w-[900px]">
      <TableHeader>
        <TableRow>
          <TableHead className="w-24">Paper Id</TableHead>
          <TableHead>File Name</TableHead>
          <TableHead>Author Names</TableHead>
          <TableHead>Assigned Reviewers</TableHead>
          <TableHead>Final Result</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <SkeletonTableRow cellCount={9} />
        <SkeletonTableRow cellCount={9} />
        <SkeletonTableRow cellCount={9} />
        <SkeletonTableRow cellCount={9} />
        <SkeletonTableRow cellCount={9} />
      </TableBody>
    </Table>
  );
};

export default ResultsSkeleton;
