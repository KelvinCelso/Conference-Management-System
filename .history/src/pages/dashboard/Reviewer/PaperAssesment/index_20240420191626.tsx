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
    defaultValues: {
      abstract: "", // Prefill abstract if paper exists
      coAuthor: [], // Prefill authors if paper exists
      correspondingAuthor: "", // Prefill corresponding author if paper exists
      file: "",
    },
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
          name="abstract"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Abstract</FormLabel>
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

        <Button className={`w-full bg-green-500" `} type="submit">
          Assess
        </Button>
      </form>
    </Form>
  );
};

export default PaperAssessmentForm;
