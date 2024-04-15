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

const SubmittedConferencesSkeleton = () => {
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
          <TableHead>Corresponding Author</TableHead>
          <TableHead>Co-authors</TableHead>
          <TableHead>Project</TableHead>
          <TableHead>File</TableHead>
          <TableHead>Download File</TableHead>
          <TableHead>Asses Paper</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <SkeletonTableRow cellCount={6} />
        <SkeletonTableRow cellCount={6} />
        <SkeletonTableRow cellCount={6} />
        <SkeletonTableRow cellCount={6} />
        <SkeletonTableRow cellCount={6} />
      </TableBody>
    </Table>
  );
};

export default SubmittedConferencesSkeleton;
