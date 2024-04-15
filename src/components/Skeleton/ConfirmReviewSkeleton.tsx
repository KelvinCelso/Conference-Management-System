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

const ConfirmReviewSkeleton = () => {
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
          <TableHead className="w-24">Project ID</TableHead>
          <TableHead>Corresponding Author</TableHead>
          <TableHead>Co-authors</TableHead>
          <TableHead>Assigned Reviewers</TableHead>
          <TableHead>Abstract</TableHead>
          <TableHead>File</TableHead>
          <TableHead>Download File</TableHead>
          <TableHead>Final Assesment</TableHead>
          <TableHead>Send</TableHead>
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

export default ConfirmReviewSkeleton;
