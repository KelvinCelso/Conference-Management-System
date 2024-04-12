import { useState } from "react";
import { initialProjectData } from "../../../../data/pages/dashboard/Admin/InitialProjectData";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ProjectDataType } from "../../../../types/dashboard/Admin/types";
import { initialRegisterFormData } from "../../../../data/pages/Form/registration/InitialRegisterFormData";
import useCreateProject from "../../../../hooks/useCreateProject";
import { StyledCreateConference } from "../../../../styles/pages/dashboard/Admin/CreateConference/index.styled";
import useGetUsers from "../../../../hooks/useGetUsers";
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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createProject(projectData, "projects");
    setProjectData(initialProjectData);
  };

  return (
    <StyledCreateConference>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={projectData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Topic:</label>
          <input
            type="text"
            name="topic"
            value={projectData.topic}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={projectData.description}
            onChange={handleChange}
            required
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
            required
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
            required
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
        <button type="submit">Create Project</button>
      </form>
    </StyledCreateConference>
  );
};

export default CreateConference;
