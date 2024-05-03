import { useEffect, useState } from "react";
import useGetSubmittedPapers from "../../../../hooks/useGetPapersSubmissions";
import { StyledPapers } from "../../../../styles/pages/dashboard/Admin/Papers/index.styled";
import useGetUsers from "../../../../hooks/useGetUsers";
import useCreatePapersToBeReviewed from "../../../../hooks/useCreatePapersToBeReviewed";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import PapersSkeleton from "@/components/Skeleton/PapersSkeleton";
import { MenuState } from "@/lib/recoil";
import { useRecoilState } from "recoil";

const Papers = () => {
  const { loading, submittedPapers } = useGetSubmittedPapers();
  const [opens, setOpens] = useRecoilState(MenuState);
  const [assignedReviewers, setAssignedReviewers] = useState<string[][]>([]);
  const [assignedReviewerNames, setAssignedReviewerNames] = useState<
    string[][]
  >([]);
  const collectionName = "reviewerUsers";
  const { users } = useGetUsers(collectionName);
  const createPapersToBeReviewed = useCreatePapersToBeReviewed();
  const handleAssignedReviewerChange = (
    e: React.ChangeEvent<HTMLSelectElement | any>,
    dataIndex: number
  ) => {
    const assignedReviewerId = e.target.value;
    const assignedReviewer = users.find(
      (user: any) => user.id === assignedReviewerId
    );
    console.log(submittedPapers);
    if (assignedReviewer) {
      setAssignedReviewers((prevData) => {
        const updatedAssignedReviewers = [...prevData];
        const set = new Set(updatedAssignedReviewers[dataIndex]); // Convert to Set
        set.add(assignedReviewerId); // Add the new value
        updatedAssignedReviewers[dataIndex] = Array.from(set); // Convert back to array
        return updatedAssignedReviewers;
      });

      setAssignedReviewerNames((prevData) => {
        const updatedAssignedReviewerNames = [...prevData];
        const set = new Set(updatedAssignedReviewerNames[dataIndex]); // Convert to Set
        set.add(`${assignedReviewer.firstName} ${assignedReviewer.lastName}`); // Add the new value
        updatedAssignedReviewerNames[dataIndex] = Array.from(set); // Convert back to array
        return updatedAssignedReviewerNames;
      });
    }
  };

  const removeAssignedReviewer = (index: number, dataIndex: number) => {
    // Create copies of assignedReviewers and assignedReviewerNames arrays
    const updatedAssignedReviewers = [...assignedReviewers];
    const updatedAssignedReviewerNames = [...assignedReviewerNames];

    // Remove the selected element at the specified index from both arrays
    updatedAssignedReviewers[dataIndex].splice(index, 1);
    updatedAssignedReviewerNames[dataIndex].splice(index, 1);

    // Update the state with the updated arrays
    setAssignedReviewers(updatedAssignedReviewers);
    setAssignedReviewerNames(updatedAssignedReviewerNames);
  };

  const maxTableContentLength = 9;
  const handleOverflowedText = (givenText: string) => {
    if (givenText.length > maxTableContentLength) {
      return `${givenText.substring(0, maxTableContentLength)}...`;
    } else {
      return givenText;
    }
  };
  const handleSendForReview = async (
    paperData: any,
    assignedReviewersData: any
  ) => {
    try {
      const dataToSend = {
        ...paperData,
        assignedReviewers: assignedReviewersData,
      };
      await createPapersToBeReviewed(dataToSend, "toBeReviewed");
      console.log("Paper sent for review successfully!");
    } catch (error) {
      console.error("Error sending paper for review: ", error);
    }
  };
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
        <PapersSkeleton />
      ) : (
        <Table className="max-md:w-[1000px] max-sm:w-[900px]">
          <TableCaption>A list of your recent submitted Papers.</TableCaption>
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
            {submittedPapers?.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-medium">{row.projectId}</TableCell>
                <TableCell>{row.cAuthor}</TableCell>
                <TableCell>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="link">Authors</Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      {row.authorNames.map((author: any) => {
                        return <p>{author}</p>;
                      })}
                    </HoverCardContent>
                  </HoverCard>
                </TableCell>
                <TableCell>{row.abstract}</TableCell>
                <TableCell>{row.fileId}</TableCell>
                <TableCell>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Reviewer" />
                    </SelectTrigger>
                    <SelectContent>
                      {users.map((user: any) => (
                        <SelectItem
                          value={user.id}
                          onChange={(e) => handleAssignedReviewerChange(e, idx)}
                        >
                          {" "}
                          {`${user.firstName} ${user.lastName}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button
                    className="bg-green-500"
                    onClick={() =>
                      console.log("this is review", row, assignedReviewers[idx])
                    }
                  >
                    Send for review
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
export default Papers;
