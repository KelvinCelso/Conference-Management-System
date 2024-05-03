import React, { useState } from "react";
import usePaperAssessment from "../../../../hooks/usePaperAssesment"; // Import your custom hook
import { PaperAssesmentFormProps } from "../../../../types/dashboard/Reviewer/props";
import { PaperAssesmentDataType } from "../../../../types/dashboard/Reviewer/types";
import { initialPaperAssesmentData } from "../../../../data/pages/dashboard/Reviewer/InitialPaperAssesmentData";
import useCreateProject from "../../../../hooks/useCreateProject";
import useCreateDoc from "../../../../hooks/useCreateDoc";
import useAuthentication from "../../../../hooks/useAuthentication";
import { StyledPaperAssesmentForm } from "../../../../styles/pages/dashboard/Reviewer/SubmittedConferences/PaperAssesmentForm.styled";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  topicComment: z.string(),
  topic: z.number(),
  contributionComment: z.string(),
  contribution: z.number(),
  academicQualityComment: z.string(),
  academicQuality: z.number(),
  verificationOfResultsComment: z.string(),
  verificationOfResults: z.number(),
  noveltyComment: z.string(),
  novelty: z.number(),
  literatureReviewAndBibliographyComment: z.string(),
  literatureReviewAndBibliography: z.number(),
  languageComment: z.string(),
  language: z.number(),
  styleAndFormatComment: z.string(),
  styleAndFormat: z.number(),
  summary: z.string(),
  commentsForOrganizingCommittee: z.string(),
  recommendation: z.string(),
});
const scoreMarks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const PaperAssessmentForm: React.FC<PaperAssesmentFormProps> = ({
  selectedPaper,
}) => {
  console.log(selectedPaper);
  const authUser = useAuthentication();

  const { submitAssessment, error } = usePaperAssessment();
  const [formData, setFormData] = useState<PaperAssesmentDataType>(
    initialPaperAssesmentData
  );

  const createReview = useCreateDoc();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createReview(
      {
        assesmentData: formData,
        correspondingAuthor: selectedPaper?.correspondingAuthor,
        projectId: selectedPaper?.projectId,
        reviewerId: authUser?.uid,
        assignedReviewers: selectedPaper?.assignedReviewers,
        paperId: selectedPaper?.paperId,
      },
      "reviewSubmissions"
    );
    try {
      await submitAssessment(
        formData,
        selectedPaper.correspondingAuthor,
        selectedPaper.projectId
      );
      // Reset the form after submission...
    } catch (err) {
      console.error("Error submitting assessment:", err);
      // Handle error scenarios...
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 ">
        <FormField
          control={form.control}
          name="topicComment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Topic Comment</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type your abstract here...."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between  space-x-2">
              <FormLabel>Topic:</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={String(field.value)}
              >
                <FormControl>
                  <SelectTrigger className="w-20">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {scoreMarks.map((score: number) => {
                    return (
                      <SelectItem key={score} value={String(score)}>
                        {score}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contributionComment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contribution comments</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type your abstract here...."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contribution"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between  space-x-2">
              <FormLabel>contribution:</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={String(field.value)}
              >
                <FormControl>
                  <SelectTrigger className="w-20">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {scoreMarks.map((score: number) => {
                    return (
                      <SelectItem key={score} value={String(score)}>
                        {score}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contributionComment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contribution comments</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type your abstract here...."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contribution"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between  space-x-2">
              <FormLabel>contribution:</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={String(field.value)}
              >
                <FormControl>
                  <SelectTrigger className="w-20">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {scoreMarks.map((score: number) => {
                    return (
                      <SelectItem key={score} value={String(score)}>
                        {score}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contributionComment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contribution comments</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type your abstract here...."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contribution"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between  space-x-2">
              <FormLabel>contribution:</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={String(field.value)}
              >
                <FormControl>
                  <SelectTrigger className="w-20">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {scoreMarks.map((score: number) => {
                    return (
                      <SelectItem key={score} value={String(score)}>
                        {score}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contributionComment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contribution comments</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type your abstract here...."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contribution"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between  space-x-2">
              <FormLabel>contribution:</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={String(field.value)}
              >
                <FormControl>
                  <SelectTrigger className="w-20">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {scoreMarks.map((score: number) => {
                    return (
                      <SelectItem key={score} value={String(score)}>
                        {score}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contributionComment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contribution comments</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type your abstract here...."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contribution"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between  space-x-2">
              <FormLabel>contribution:</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={String(field.value)}
              >
                <FormControl>
                  <SelectTrigger className="w-20">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {scoreMarks.map((score: number) => {
                    return (
                      <SelectItem key={score} value={String(score)}>
                        {score}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contributionComment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contribution comments</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type your abstract here...."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contribution"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between  space-x-2">
              <FormLabel>contribution:</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={String(field.value)}
              >
                <FormControl>
                  <SelectTrigger className="w-20">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {scoreMarks.map((score: number) => {
                    return (
                      <SelectItem key={score} value={String(score)}>
                        {score}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contributionComment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contribution comments</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type your abstract here...."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contribution"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between  space-x-2">
              <FormLabel>contribution:</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={String(field.value)}
              >
                <FormControl>
                  <SelectTrigger className="w-20">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {scoreMarks.map((score: number) => {
                    return (
                      <SelectItem key={score} value={String(score)}>
                        {score}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <Button className={`w-full bg-green-500 `} type="submit">
          Assess
        </Button>
      </form>
    </Form>
  );
};

export default PaperAssessmentForm;
