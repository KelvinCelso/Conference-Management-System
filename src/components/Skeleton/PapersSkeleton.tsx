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

const PapersSkeleton = () => {
  const SkeletonTableRow = ({ cellCount }: { cellCount: number }) => {
    const cells = Array.from({ length: cellCount }).map((_, index) => (
      <TableCell key={index}>
        <Skeleton className="h-4 bg-gray-400" />
      </TableCell>
    ));

    return <TableRow>{cells}</TableRow>;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-32">Conference ID</TableHead>
          <TableHead>Corresponding Author</TableHead>
          <TableHead>Co-authors</TableHead>
          <TableHead>Abstract</TableHead>
          <TableHead>File</TableHead>
          <TableHead>Assign Reviewer</TableHead>
          <TableHead>Send for review</TableHead>
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

export default PapersSkeleton;
