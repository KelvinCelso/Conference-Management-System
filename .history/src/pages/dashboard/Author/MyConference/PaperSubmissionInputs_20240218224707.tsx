// export default PaperSubmissionInputs;
import React, { ChangeEvent, useState } from "react";
import { PaperSubmissionDataType } from "../../../../types/dashboard/Author/types";
import { initialPaperSubmissionData } from "../../../../data/pages/dashboard/Author/InitialPaperSubmissionData";
import { PaperSubmissionInputsProps } from "../../../../types/dashboard/Author/props";
import usePaperSubmission from "../../../../hooks/usePaperSubmission";
import useGetUsers from "../../../../hooks/useGetUsers";

const PaperSubmissionInputs: React.FC<PaperSubmissionInputsProps> = ({
  projectId,
}) => {
  const [paperSubmissionData, setPaperSubmissionData] =
    useState<PaperSubmissionDataType>(initialPaperSubmissionData);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedAuthorNames, setSelectedAuthorNames] = useState<string[]>([]);
  const { submitPaper, isSubmitting, error } = usePaperSubmission({
    paperSubmissionData,
    projectId,
  });
  const collectionName = "authorUsers";
  const { users, loading } = useGetUsers(collectionName);

  const handleAbstractChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setPaperSubmissionData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAuthorId = e.target.value;
    const selectedAuthor = users.find(
      (user: any) => user.id === selectedAuthorId
    );

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

  const handleSubmitPaper = (event: React.FormEvent<HTMLFormElement>) => {
    console.log("salam");
    event.preventDefault();
    // Call the submitPaper function from the hook
    submitPaper();
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
    setPaperSubmissionData((prev) => ({
      ...prev,
      correspondingAuthor: correspondingAuthorId,
    }));
  };

  return (
    <form onSubmit={handleSubmitPaper}>
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
    </form>
  );
};

export default PaperSubmissionInputs;
