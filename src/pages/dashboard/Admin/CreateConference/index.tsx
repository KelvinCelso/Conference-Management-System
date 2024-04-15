import { useState } from "react";
import { initialProjectData } from "../../../../data/pages/dashboard/Admin/InitialProjectData";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ProjectDataType } from "../../../../types/dashboard/Admin/types";
import { initialRegisterFormData } from "../../../../data/pages/Form/registration/InitialRegisterFormData";
import useCreateProject from "../../../../hooks/useCreateProject";
import useGetUsers from "../../../../hooks/useGetUsers";
import { Button } from "@/components/ui/button";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  description: z.string().email({
    message: "Invalid email address",
  }),
  starDate: z.string().email({
    message: "Invalid email address",
  }),
  endDate: z.string().email({
    message: "Invalid email address",
  }),
  bsc: z.string().email({
    message: "Invalid email address",
  }),
  msc: z.string().email({
    message: "Invalid email address",
  }),
  phd: z.string().email({
    message: "Invalid email address",
  }),
  other: z.string().email({
    message: "Invalid email address",
  }),
  studentCapacity: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});

const CreateConference = () => {
  const [projectData, setProjectData] =
    useState<ProjectDataType>(initialProjectData);
  const [assignedReviewers, setAssignedReviewers] = useState<string[]>([]);
  const [assignedReviewerNames, setAssignedReviewerNames] = useState<string[]>(
    []
  );
  const collectionName = "reviewerUsers";
  const { users } = useGetUsers(collectionName);
  const createProject = useCreateProject();
  const checkboxItems = initialRegisterFormData.author.program;
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const index = projectData.canApply.options.indexOf(value);
    if (name === "canApply") {
      if (index === -1) {
        setProjectData({
          ...projectData,
          canApply: {
            ...projectData.canApply,
            options: [...projectData.canApply.options, value],
          },
          // canApply: [...projectData.canApply, value],
        });
      } else {
        const updateCanApply = [...projectData.canApply.options];
        updateCanApply.splice(index, 1);
        setProjectData({
          ...projectData,
          canApply: {
            ...projectData.canApply,
            options: [...updateCanApply],
          },
        });
      }
    } else {
      setProjectData({ ...projectData, [name]: value });
    }
  };
  const handleStudentCapatity = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProjectData({
      ...projectData,
      [name]: value,
    });
  };
  const handleCheckboxChecked = (value: string) => {
    return projectData.canApply.options.includes(value);
  };
  const handleDateChange = (
    date: Date | null,
    inputName: "startDate" | "endDate"
  ) => {
    setProjectData({
      ...projectData,
      deadline: {
        ...projectData.deadline,
        [inputName]: date,
      },
    });
  };
  // const handleAssignedReviewerChange = (
  //   e: React.ChangeEvent<HTMLSelectElement>
  // ) => {
  //   const assignedReviewerId = e.target.value;
  //   const assignedReviewer = users.find(
  //     (user: any) => user.id === assignedReviewerId
  //   );

  //   if (assignedReviewer && !assignedReviewers.includes(assignedReviewerId)) {
  //     setAssignedReviewers((prevAuthors) => [
  //       ...prevAuthors,
  //       assignedReviewerId,
  //     ]);
  //     setAssignedReviewerNames((prevNames) => [
  //       ...prevNames,
  //       `${assignedReviewer.firstName} ${assignedReviewer.lastName}`,
  //     ]);
  //     setProjectData((prev) => ({
  //       ...prev,
  //     }));
  //   }
  // };
  // const removeAssignedReviewer = (index: number) => {
  //   const updatedAssignedReviewers = [...assignedReviewers];
  //   updatedAssignedReviewers.splice(index, 1);

  //   const updatedAuthorNames = [...assignedReviewerNames];
  //   updatedAuthorNames.splice(index, 1);

  //   setAssignedReviewers(updatedAssignedReviewers);
  //   setAssignedReviewerNames(updatedAuthorNames);

  //   setProjectData((prev) => ({
  //     ...prev,
  //     assignedReviewers: updatedAssignedReviewers,
  //   }));
  // };
  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   createProject(projectData, "projects");
  //   setProjectData(initialProjectData);
  // };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      starDate: "",
      endDate: "",
      bsc: "",
      msc: "",
      phd: "",
      other: "",
      studentCapacity: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 w-full "
      >
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={projectData.title}
            onChange={handleChange}
          />
        </div>
        {/* <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>description</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
        <div>
          <label>Topic:</label>
          <input
            type="text"
            name="topic"
            value={projectData.topic}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={projectData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label>Start Date:</label>
          <DatePicker
            selected={projectData.deadline.startDate}
            onChange={(date: Date) => handleDateChange(date, "startDate")}
            selectsStart
            startDate={projectData.deadline.startDate}
            endDate={projectData.deadline.endDate}
            placeholderText="Select start date"
            name="startDate"
          />
        </div>
        <div>
          <label>End Date:</label>
          <DatePicker
            selected={projectData.deadline.endDate}
            onChange={(date: Date) => handleDateChange(date, "endDate")}
            selectsEnd
            startDate={projectData.deadline.startDate}
            endDate={projectData.deadline.endDate}
            minDate={projectData.deadline.startDate}
            placeholderText="Select end date"
            name="endDate"
          />
        </div>
        <div>
          {checkboxItems.options.map((inputValue, index) => {
            return (
              <div key={index}>
                <label htmlFor="">{inputValue}</label>
                <input
                  value={inputValue}
                  type="checkbox"
                  name="canApply"
                  checked={handleCheckboxChecked(inputValue)}
                  id=""
                  onChange={handleChange}
                />
              </div>
            );
          })}
        </div>
        <div>
          <label htmlFor="">Student Capacity</label>
          <input
            type="number"
            name="studentCapacity"
            id=""
            min={1}
            max={10}
            value={projectData.studentCapacity}
            onChange={handleStudentCapatity}
          />
        </div>
        {/* <div>
          <label>Assign reviewer(s):</label>
          <select
            name="assignedReviewers"
            value={assignedReviewers[assignedReviewers.length - 1] || ""} // Set value to the last selected author ID or an empty string if no author is selected
            onChange={handleAssignedReviewerChange}
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
          {assignedReviewerNames.map((reviewerName, index) => (
            <div key={index}>
              {reviewerName}{" "}
              <button
                type="button"
                onClick={() => removeAssignedReviewer(index)}
              >
                x
              </button>
            </div>
          ))}
        </div> */}
        <Button className="w-full bg-green-500" type="submit">
          Create project
        </Button>
      </form>
    </Form>
  );
};

export default CreateConference;
