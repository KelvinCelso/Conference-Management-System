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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FormControl } from "@/components/ui/form";
import { ChevronDown, Loader2 } from "lucide-react";
import { PaperSubmissionDataTypeWithIds } from "@/types/hooks/types";
import { Input } from "@/components/ui/input";

const Papers = () => {
  const { loading, submittedPapers } = useGetSubmittedPapers();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [opens, setOpens] = useRecoilState(MenuState);
  const [assignedReviewers, setAssignedReviewers] = useState<string[][]>([]);
  const [assignedReviewerNames, setAssignedReviewerNames] = useState<
    string[][]
  >([]);
  const collectionName = "reviewerUsers";
  const { users } = useGetUsers(collectionName);
  const createPapersToBeReviewed = useCreatePapersToBeReviewed();
  const [updateStates, setUpdateStates] = useState<{
    [projectId: string]: boolean;
  }>({});
  const handleAssignedReviewerChange = (
    e: React.ChangeEvent<HTMLSelectElement | any>,
    dataIndex: number
  ) => {
    const assignedReviewerId = e.target.value;
    const assignedReviewer = users.find(
      (user) => user.id === assignedReviewerId
    );

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
    const updatedAssignedReviewers = [...assignedReviewers];
    const updatedAssignedReviewerNames = [...assignedReviewerNames];

    updatedAssignedReviewers[dataIndex].splice(index, 1);
    updatedAssignedReviewerNames[dataIndex].splice(index, 1);

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
    paperData: PaperSubmissionDataTypeWithIds,
    dataIndex: number
  ) => {
    try {
      setUpdateStates({ ...updateStates, [paperData.id]: true });
      const assignedReviewersData = assignedReviewers[dataIndex];

      // Prepare the data to send
      const dataToSend = {
        ...paperData,
        assignedReviewers: assignedReviewersData,
      };

      // Send the data for review
      await createPapersToBeReviewed(dataToSend, "toBeReviewed");
      setAssignedReviewers([]);
      console.log("Paper sent for review successfully!");
      setUpdateStates({ ...updateStates, [paperData.id]: false });
    } catch (error) {
      console.error("Error sending paper for review: ", error);
    }
  };

  const isOptionSelected = (value: string, dataIndex: number): boolean => {
    return assignedReviewers[dataIndex]?.includes(value) ?? false;
  };

  const handleSelectChange = (value: string, dataIndex: number) => {
    setAssignedReviewers((prevData) => {
      const updatedAssignedReviewers = [...prevData];
      const set = new Set(updatedAssignedReviewers[dataIndex]);

      // Toggle the selected value
      if (set.has(value)) {
        set.delete(value);
      } else {
        set.add(value);
      }

      updatedAssignedReviewers[dataIndex] = Array.from(set);
      return updatedAssignedReviewers;
    });
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
          <TableCaption>A list of your recent submitted papers.</TableCaption>
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
                      {row.authorNames.map((author) => (
                        <p key={author}>{author}</p>
                      ))}
                    </HoverCardContent>
                  </HoverCard>
                </TableCell>
                <TableCell>{row.abstract}</TableCell>
                <TableCell>{row.fileId}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="flex gap-2 justify-between items-center"
                      >
                        <span>Reviewer(s)</span>
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full">
                      {users.map((user, index) => (
                        <DropdownMenuCheckboxItem
                          key={index}
                          checked={isOptionSelected(user.id, idx)}
                          onCheckedChange={() =>
                            handleSelectChange(user.id, idx)
                          }
                          className="w-56"
                        >
                          {`${user.firstName} ${user.lastName}`}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                    {assignedReviewers[idx]?.map((reviewerId, idx2) => {
                      const user = users.find((user) => user.id === reviewerId);
                      return (
                        <Input
                          className="w-full"
                          disabled
                          key={idx2}
                          value={`${user?.firstName} ${user?.lastName}`}
                        />
                      );
                    })}
                  </DropdownMenu>
                </TableCell>
                <TableCell>
                  <Button
                    className="bg-green-500"
                    onClick={() => handleSendForReview(row, idx)}
                  >
                    {updateStates[row.id] ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        <span>"Please wait"</span>
                      </>
                    ) : (
                      "Send for review"
                    )}
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
