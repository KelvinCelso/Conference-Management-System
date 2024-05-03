// export default PaperSubmissionInputs;
import React, { ChangeEvent, useEffect, useState } from "react";
import { PaperSubmissionDataType } from "../../../../types/dashboard/Author/types";
import { initialPaperSubmissionData } from "../../../../data/pages/dashboard/Author/InitialPaperSubmissionData";
import { PaperSubmissionInputsProps } from "../../../../types/dashboard/Author/props";
import usePaperSubmission from "../../../../hooks/usePaperSubmission";
import useGetUsers from "../../../../hooks/useGetUsers";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowDown,
  ArrowDown01,
  ArrowDownCircle,
  ArrowDownFromLine,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { useRecoilState } from "recoil";
import { PaperDialog } from "@/lib/recoil";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
const formSchema = z.object({
  abstract: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  coAuthor: z.string().array(),
  correspondingAuthor: z.string(),
  file: z.string(),
});

const PaperSubmissionInputs: React.FC<PaperSubmissionInputsProps> = ({
  projectId,
  paper,
}) => {
  const [paperDialog, setPaperDialog] = useRecoilState(PaperDialog);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [paperSubmissionData, setPaperSubmissionData] =
    useState<PaperSubmissionDataType>(initialPaperSubmissionData);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedAuthorNames, setSelectedAuthorNames] = useState<string[]>([]);
  const { submitPaper, isSubmitting, error } = usePaperSubmission();
  const collectionName = "authorUsers";
  const { users, loading } = useGetUsers(collectionName);
  const { toast } = useToast();

  const handleAbstractChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setPaperSubmissionData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (paper) {
      setSelectedItems([...selectedItems, ...paper?.authors]);
      if (paper.file?.name != null) {
        const fileName = paper.file.name;
        setPaperSubmissionData((prev) => ({
          ...prev,
          [fileName]: paper.file,
        }));
      }
    }
  }, [paper]);
  const closeDialog = () => setPaperDialog(false);
  const handleAuthorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAuthorId = e.target.value;
    const selectedAuthor = users.find(
      (user: any) => user.id === selectedAuthorId
    );
    console.log("we got here");

    if (selectedAuthor && !selectedAuthors.includes(selectedAuthorId)) {
      setSelectedAuthors((prevAuthors) => [...prevAuthors, selectedAuthorId]);
      setSelectedAuthorNames((prevNames) => [
        ...prevNames,
        `${selectedAuthor.firstName} ${selectedAuthor.lastName}`,
      ]);
      setPaperSubmissionData((prev) => ({
        ...prev,
        authors: [...prev.authors, selectedAuthorId],
      }));
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    const file: File | null = files ? files[0] : null;
    console.log(file);
    if (file && file.type === "application/pdf") {
      setPaperSubmissionData((prev) => ({
        ...prev,
        [name]: file,
      }));
    } else {
      console.error("Please select a PDF file.");
      // You might want to set an error state or display a message to the user here
    }
  };

  const removeAuthor = (index: number) => {
    const updatedAuthors = [...selectedAuthors];
    updatedAuthors.splice(index, 1);

    const updatedAuthorNames = [...selectedAuthorNames];
    updatedAuthorNames.splice(index, 1);

    setSelectedAuthors(updatedAuthors);
    setSelectedAuthorNames(updatedAuthorNames);

    setPaperSubmissionData((prev) => ({
      ...prev,
      authors: updatedAuthors,
    }));
  };
  const handleCorrespondingAuthor = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const correspondingAuthorId = e.target.value;
    console.log(correspondingAuthorId);
    setPaperSubmissionData((prev) => ({
      ...prev,
      correspondingAuthor: correspondingAuthorId,
    }));
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      abstract: paper && paper.abstract,
      coAuthor: paper ? paper?.authors : [],
      correspondingAuthor: paper ? paper?.correspondingAuthor : "",
      file: paper ? paper?.file?.name : "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setPaperSubmissionData((prev) => ({
      ...prev,
      correspondingAuthor: values.correspondingAuthor,
    }));
    setPaperSubmissionData((prev) => ({
      ...prev,
      abstract: values.abstract,
    }));

    await submitPaper({
      paperSubmissionData: {
        authorNames: paperSubmissionData.authorNames,
        abstract: values.abstract,
        correspondingAuthor: values.correspondingAuthor,
        file: paperSubmissionData.file,
        projectId,
        authors: paperSubmissionData.authors,
      },
      projectId,
    });
    setPaperDialog(false);
    toast({
      title: "Paper Submitted",
      description:
        "Your paper has been submitted, please wait for the response",
    });
  }
  const isOptionSelected = (value: string): boolean => {
    return selectedItems.includes(value) ? true : false;
  };
  const handleSelectChange = (value: string) => {
    if (!selectedItems.includes(value)) {
      setSelectedItems((prev) => [...prev, value]);
      setPaperSubmissionData((prev) => ({
        ...prev,
        authors: [...prev.authors, value],
      }));
    } else {
      const referencedArray = [...selectedItems];
      const indexOfItemToBeRemoved = referencedArray.indexOf(value);
      referencedArray.splice(indexOfItemToBeRemoved, 1);
      setSelectedItems(referencedArray);
    }
    console.log(selectedItems);
  };
  console.log(" this is paperrr", paper);
  return (
    <>
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
          <FormField
            control={form.control}
            name="coAuthor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CoAuthro(s)</FormLabel>
                <DropdownMenu>
                  <FormControl>
                    <DropdownMenuTrigger asChild className="w-full">
                      <Button
                        variant="outline"
                        className="flex gap-2 justify-between items-center"
                      >
                        <span>Select CoAuthor(s)</span>
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                  </FormControl>
                  <DropdownMenuContent className="w-full">
                    {users.map((user, idx) => (
                      <DropdownMenuCheckboxItem
                        key={idx}
                        checked={isOptionSelected(user.id)}
                        onCheckedChange={() => handleSelectChange(user.id)}
                        className="w-56"
                      >
                        {`${user.firstName} ${user.lastName}`}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <FormMessage />
              </FormItem>
            )}
          />
          {selectedItems.map((item, idx) => {
            const user = users.find((user) => user.id === item);
            if (user)
              return (
                <Input
                  className="w-full"
                  disabled
                  key={idx}
                  value={`${user.firstName + " " + user.lastName}`}
                />
              );
          })}

          <FormField
            control={form.control}
            name="correspondingAuthor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Corresponding Author</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        onChange={handleCorrespondingAuthor}
                        placeholder="Select your corresponding author"
                        className="w-56"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-56">
                    {paperSubmissionData.authors.map((authorId: string) => {
                      const correspondingUser = users.find(
                        (user: any) => user.id === authorId
                      );
                      return (
                        <SelectItem
                          key={authorId}
                          value={authorId}
                          className="w-56"
                        >
                          {correspondingUser
                            ? `${correspondingUser.firstName} ${correspondingUser.lastName}`
                            : ""}
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
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="file"
                    accept=".pdf"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleFileChange(e);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="w-full bg-green-500"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>"Please wait"</span>
              </>
            ) : (
              "submit"
            )}
          </Button>
        </form>
      </Form>
      {/* <form onSubmit={handleSubmitPaper}>
      <div>
        <div className="abstract">
          <label htmlFor="abstract">Abstract:</label>
          <textarea
            name="abstract"
            id="abstract"
            value={paperSubmissionData.abstract}
            onChange={handleAbstractChange}
          />
        </div>
        <div>
          <label>Select Co-author(s):</label>
          <select
            name="authors"
            value={selectedAuthors[selectedAuthors.length - 1] || ""} // Set value to the last selected author ID or an empty string if no author is selected
            onChange={handleAuthorChange}
          >
            <option value="">Select...</option>
            {users.map((user: any) => (
              <option key={user.id} value={user.id}>
                {`${user.firstName} ${user.lastName}`}
              </option>
            ))}
          </select>
        </div>
        <div className="selectedUserNames">
          {selectedAuthorNames.map((authorName, index) => (
            <div key={index}>
              {authorName}{" "}
              <button type="button" onClick={() => removeAuthor(index)}>
                x
              </button>
            </div>
          ))}
        </div>
        <div>
          <label>Corresponding Author:</label>
          <select
            name="correspondingAuthor"
            value={paperSubmissionData.correspondingAuthor}
            onChange={handleCorrespondingAuthor}
          >
            <option value="">Select Corresponding Author...</option>
            {paperSubmissionData.authors.map((authorId: string) => {
              const correspondingUser = users.find(
                (user: any) => user.id === authorId
              );
              return (
                <option key={authorId} value={authorId}>
                  {correspondingUser
                    ? `${correspondingUser.firstName} ${correspondingUser.lastName}`
                    : ""}
                </option>
              );
            })}
          </select>
        </div>
        <div className="pdf">
          <label htmlFor="file">Upload file</label>
          <input
            type="file"
            name="file"
            id="file"
            accept=".pdf"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Paper"}
        </button>
        {error && <p>{error}</p>}
      </div>
    </form> */}
    </>
  );
};

export default PaperSubmissionInputs;
