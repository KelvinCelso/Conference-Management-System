import React, { useState } from "react";
import { StyledDashboardPageLayout } from "../../../../styles/pages/dashboard/DashboardPageLayout.styled";
import useGetCollection from "../../../../hooks/useGetCollection";
import useAuthentication from "../../../../hooks/useAuthentication";
import { MenuState } from "@/lib/recoil";
import { useRecoilState } from "recoil";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import useGetUsers from "@/hooks/useGetUsers";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { AccordionHeader } from "@radix-ui/react-accordion";

const ReviewerResponse = () => {
  const finalReviewsState = useGetCollection("finalReviews");
  const authUser = useAuthentication();
  const [opens, setOpens] = useRecoilState(MenuState);
  const collectionName = "reviewerUsers";
  const { users } = useGetUsers(collectionName);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  console.log(authUser?.uid);
  console.log(finalReviewsState);
  const [selectedPaper, setSelectedPaper] = useState<any | null>(null);
  return (
    <div className="mt-navbar max-lg:mt-[50px] ml-sidebar max-lg:ml-0 flex-1 overflow-auto">
      {finalReviewsState && finalReviewsState?.loading ? (
        <div>Loading...</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Paper Id</TableHead>
              <TableHead>File Name</TableHead>
              <TableHead>Author Names</TableHead>
              <TableHead>Assigned Reviewers</TableHead>
              <TableHead> Final Result</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {finalReviewsState?.collection
              .filter(
                (result: any) => result.correspondingAuthor === authUser?.uid
              )
              .map((res: any, idx: number) => {
                return (
                  <TableRow key={idx}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{res.fileId}</TableCell>
                    <TableCell>
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Button variant="link">Authors</Button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                          {res.authorNames.map((author: string) => (
                            <p key={author}>{author}</p>
                          ))}
                        </HoverCardContent>
                      </HoverCard>
                    </TableCell>
                    <TableCell>
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Button variant="link">Reviewer</Button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                          {res.assignedReviewers.map((reviewer: any) => {
                            const us = users.find(
                              (user) => user.id === reviewer
                            );
                            const isReviewer =
                              reviewer !==
                              res.reviews?.find(
                                (reviewerId: any) =>
                                  reviewerId?.reviewerId === reviewer
                              )?.reviewerId;
                            return (
                              <>
                                <p> {`${us?.firstName} ${us?.lastName}`}</p>
                                <Button
                                  variant={"link"}
                                  className={`${
                                    !isReviewer && "text-green-500"
                                  }`}
                                  disabled={isReviewer}
                                  onClick={() => {
                                    setSelectedPaper(
                                      res.reviews?.find(
                                        (review: any) =>
                                          review?.reviewerId === reviewer
                                      )
                                    );
                                    setOpenDialog(true);
                                  }}
                                >
                                  Assesment
                                </Button>
                              </>
                            );
                          })}
                        </HoverCardContent>
                      </HoverCard>
                    </TableCell>
                    <TableCell
                      className={`${
                        res.finalResult === "Weak Accept" && "text-orange-600"
                      }
                      ${res.finalResult === "Reject" && "text-red-600"}
                      ${
                        res.finalResult === "Strong Accept" && "text-green-500"
                      }`}
                    >
                      {res.finalResult}
                    </TableCell>
                    {/* <p>{res.finalResult}</p> */}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      )}
      {selectedPaper && (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="h-[80vh]">
            <DialogHeader>
              <DialogTitle>Assessment Result</DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-[70vh] p-2">
              <div className="h-[60vh] space-y-2">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-sm">
                      Topic
                    </AccordionTrigger>

                    <AccordionContent>
                      <div className="space-y-2">
                        <div className="flex">
                          <p className="font-bold text-sm">Comment:</p>
                          <Textarea
                            disabled
                            value={selectedPaper.assesmentData.topicComment}
                          />
                        </div>
                        <div className="flex items-center justify-between space-x-2">
                          <p className="font-bold text-sm">score:</p>
                          <Input
                            className="w-16"
                            disabled
                            value={selectedPaper.assesmentData.topic}
                          ></Input>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionHeader>
                      <AccordionTrigger className="text-sm">
                        Contribution
                      </AccordionTrigger>
                    </AccordionHeader>

                    <AccordionContent>
                      <div className="space-y-2">
                        <div className="flex">
                          <p className="font-bold text-sm">Comment:</p>
                          <Textarea
                            disabled
                            value={
                              selectedPaper.assesmentData.contributionComment
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between space-x-2">
                          <p className="font-bold text-sm">score:</p>
                          <Input
                            className="w-16"
                            disabled
                            value={selectedPaper.assesmentData.contribution}
                          ></Input>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionHeader>
                      <AccordionTrigger className="text-sm">
                        Academic Quality
                      </AccordionTrigger>
                    </AccordionHeader>

                    <AccordionContent>
                      <div className="space-y-2">
                        <div className="flex">
                          <p className="font-bold text-sm">Comment:</p>
                          <Textarea
                            disabled
                            value={
                              selectedPaper.assesmentData.academicQualityComment
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between space-x-2">
                          <p className="font-bold text-sm">score:</p>
                          <Input
                            className="w-16"
                            disabled
                            value={selectedPaper.assesmentData.academicQuality}
                          ></Input>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionHeader>
                      <AccordionTrigger className="text-sm">
                        Verification Of Results
                      </AccordionTrigger>
                    </AccordionHeader>

                    <AccordionContent>
                      <div className="space-y-2">
                        <div className="flex">
                          <p className="font-bold text-sm">Comment:</p>
                          <Textarea
                            disabled
                            value={
                              selectedPaper.assesmentData
                                .verificationOfResultsComment
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between space-x-2">
                          <p className="font-bold text-sm">score:</p>
                          <Input
                            className="w-16"
                            disabled
                            value={
                              selectedPaper.assesmentData.verificationOfResults
                            }
                          ></Input>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionHeader>
                      <AccordionTrigger className="text-sm">
                        Novelty
                      </AccordionTrigger>
                    </AccordionHeader>

                    <AccordionContent>
                      <div className="space-y-2">
                        <div className="flex">
                          <p className="font-bold text-sm">Comment:</p>
                          <Textarea
                            disabled
                            value={selectedPaper.assesmentData.noveltyComment}
                          />
                        </div>
                        <div className="flex items-center justify-between space-x-2">
                          <p className="font-bold text-sm">score:</p>
                          <Input
                            className="w-16"
                            disabled
                            value={selectedPaper.assesmentData.novelty}
                          ></Input>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-6">
                    <AccordionHeader>
                      <AccordionTrigger className="text-sm">
                        Literature Review And Bibliography
                      </AccordionTrigger>
                    </AccordionHeader>

                    <AccordionContent>
                      <div className="space-y-2">
                        <div className="flex">
                          <p className="font-bold text-sm">Comment:</p>
                          <Textarea
                            disabled
                            value={
                              selectedPaper.assesmentData
                                .literatureReviewAndBibliographyComment
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between space-x-2">
                          <p className="font-bold text-sm">score:</p>
                          <Input
                            className="w-16"
                            disabled
                            value={
                              selectedPaper.assesmentData
                                .literatureReviewAndBibliography
                            }
                          ></Input>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-7">
                    <AccordionHeader>
                      <AccordionTrigger className="text-sm">
                        Language
                      </AccordionTrigger>
                    </AccordionHeader>

                    <AccordionContent>
                      <div className="space-y-2">
                        <div className="flex">
                          <p className="font-bold text-sm">Comment:</p>
                          <Textarea
                            disabled
                            value={selectedPaper.assesmentData.languageComment}
                          />
                        </div>
                        <div className="flex items-center justify-between space-x-2">
                          <p className="font-bold text-sm">score:</p>
                          <Input
                            className="w-16"
                            disabled
                            value={selectedPaper.assesmentData.language}
                          ></Input>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-8">
                    <AccordionHeader>
                      <AccordionTrigger className="text-sm">
                        Style And Format
                      </AccordionTrigger>
                    </AccordionHeader>

                    <AccordionContent>
                      <div className="space-y-2">
                        <div className="flex">
                          <p className="font-bold text-sm">Comment:</p>
                          <Textarea
                            disabled
                            value={
                              selectedPaper.assesmentData.styleAndFormatComment
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between space-x-2">
                          <p className="font-bold text-sm">score:</p>
                          <Input
                            className="w-16"
                            disabled
                            value={selectedPaper.assesmentData.styleAndFormat}
                          ></Input>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-9">
                    <AccordionHeader>
                      <AccordionTrigger className="text-sm">
                        finals
                      </AccordionTrigger>
                    </AccordionHeader>

                    <AccordionContent>
                      <div className="space-y-2">
                        <div className="flex">
                          <p className="font-bold text-sm">summary:</p>
                          <Textarea
                            disabled
                            value={selectedPaper.assesmentData.summary}
                          />
                        </div>
                        <div className="flex">
                          <p className="font-bold text-sm">
                            Comments for comittee:
                          </p>
                          <Textarea
                            disabled
                            value={
                              selectedPaper.assesmentData
                                .commentsForOrganizingCommittee
                            }
                          />
                        </div>
                        <div className="flex">
                          <p className="font-bold text-sm">Recommendation:</p>
                          <Textarea
                            disabled
                            value={selectedPaper.assesmentData.recommendation}
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ReviewerResponse;
