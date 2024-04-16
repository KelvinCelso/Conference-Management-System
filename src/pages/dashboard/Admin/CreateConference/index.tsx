import { useEffect, useState } from "react";
import { initialProjectData } from "../../../../data/pages/dashboard/Admin/InitialProjectData";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ProjectDataType } from "../../../../types/dashboard/Admin/types";
import { initialRegisterFormData } from "../../../../data/pages/Form/registration/InitialRegisterFormData";
import useCreateProject from "../../../../hooks/useCreateProject";
import useGetUsers from "../../../../hooks/useGetUsers";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { MenuState } from "@/lib/recoil";
import { useRecoilState } from "recoil";

const inputStyle =
  "flex h-10 mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const CreateConference = () => {
  const [projectData, setProjectData] =
    useState<ProjectDataType>(initialProjectData);
  const [opens, setOpens] = useRecoilState(MenuState);
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

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createProject(projectData, "projects");
    setProjectData(initialProjectData);
    toast({
      description: "Conference added successfully!",
      duration: 1500,
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
    <div className="mt-navbar max-lg:mt-[50px] ml-sidebar max-lg:ml-0 flex-1 overflow-auto p-5">
      {opens && (
        <div
          className="absolute top-0 right-0 bg-black/10 left-0 bottom-0 z-10"
          onClick={() => setOpens(false)}
        />
      )}
      <Card className="flex flex-col items-center mb-4">
        <div className="mt-5" />
        <CardContent className="space-y-2 w-full">
          <form onSubmit={handleSubmit} className="space-y-4 w-full ">
            <div>
              <label className="text-sm">Title</label>
              <input
                type="text"
                name="title"
                value={projectData.title}
                onChange={handleChange}
                className={inputStyle}
                required
                placeholder="Insert the conference title"
              />
            </div>

            <div>
              <label className="text-sm">Topic</label>
              <input
                type="text"
                name="topic"
                value={projectData.topic}
                onChange={handleChange}
                className={inputStyle}
                required
                placeholder="Insert the conference topic"
              />
            </div>
            <div>
              <label className="text-sm">Description</label>
              <textarea
                name="description"
                value={projectData.description}
                onChange={handleChange}
                className={`${inputStyle} h-20`}
                placeholder="Insert the conference description"
                required
              ></textarea>
            </div>
            <div className="flex flex-col">
              <label className="text-sm">Start Date</label>
              <DatePicker
                selected={projectData.deadline.startDate}
                onChange={(date: Date) => handleDateChange(date, "startDate")}
                selectsStart
                startDate={projectData.deadline.startDate}
                endDate={projectData.deadline.endDate}
                placeholderText="Select start date"
                name="startDate"
                className={inputStyle}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm">End Date</label>
              <DatePicker
                selected={projectData.deadline.endDate}
                onChange={(date: Date) => handleDateChange(date, "endDate")}
                selectsEnd
                startDate={projectData.deadline.startDate}
                endDate={projectData.deadline.endDate}
                minDate={projectData.deadline.startDate}
                placeholderText="Select end date"
                name="endDate"
                className={inputStyle}
                required
              />
            </div>
            <div>
              <label className="text-sm">Degree</label>
              <RadioGroup className="flex" defaultValue="BSc">
                {checkboxItems.options.map((inputValue, index) => {
                  return (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={inputValue} id={inputValue} />
                      <label htmlFor={inputValue}>{inputValue}</label>
                    </div>
                  );
                })}
              </RadioGroup>
            </div>
            <div>
              <label className="text-sm">Student Capacity</label>
              <input
                type="number"
                name="studentCapacity"
                id=""
                min={1}
                max={10}
                value={projectData.studentCapacity}
                onChange={handleStudentCapatity}
                required
                className={inputStyle}
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
            <Button className="w-40 bg-green-500" type="submit">
              Create project
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateConference;
