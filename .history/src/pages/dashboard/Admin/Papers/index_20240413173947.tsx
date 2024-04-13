import { useState } from "react";
import useGetSubmittedPapers from "../../../../hooks/useGetPapersSubmissions";
import { StyledPapers } from "../../../../styles/pages/dashboard/Admin/Papers/index.styled";
import useGetUsers from "../../../../hooks/useGetUsers";
import useCreatePapersToBeReviewed from "../../../../hooks/useCreatePapersToBeReviewed";

const Papers = () => {
  const { loading, submittedPapers } = useGetSubmittedPapers();
  const [assignedReviewers, setAssignedReviewers] = useState<string[][]>([]);
  const [assignedReviewerNames, setAssignedReviewerNames] = useState<
    string[][]
  >([]);
  const collectionName = "reviewerUsers";
  const { users } = useGetUsers(collectionName);
  const createPapersToBeReviewed = useCreatePapersToBeReviewed();
  const handleAssignedReviewerChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    dataIndex: number
  ) => {
    const assignedReviewerId = e.target.value;
    const assignedReviewer = users.find(
      (user: any) => user.id === assignedReviewerId
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
  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Conference ID</th>
              <th>Corresponding Author</th>
              <th>Co-authors</th>
              <th>Abstract</th>
              <th>File</th>
              <th>Assign Reviewer</th>
              <th>Send for review</th>
            </tr>
          </thead>
          <tbody>
            {submittedPapers?.map((row: any, dataIndex) => {
              return (
                <tr key={dataIndex}>
                  <td title={row.projectId}>
                    {handleOverflowedText(row.projectId)}
                  </td>
                  <td title={row.correspondingAuthor}>
                    {handleOverflowedText(row.correspondingAuthor)}
                  </td>
                  <td className="co-authors" title={row.authors}>
                    {row.authors.map((author: any) => {
                      return <p key={author}>{handleOverflowedText(author)}</p>;
                    })}
                  </td>
                  <td title={row.abstract}>
                    {handleOverflowedText(row.abstract)}
                  </td>
                  <td>{row.fileId}</td>
                  <td>
                    <div>
                      <label>Assign reviewer(s):</label>
                      <select
                        name="assignedReviewers"
                        value={
                          assignedReviewers[dataIndex]?.[
                            assignedReviewers[dataIndex]?.length - 1
                          ] || ""
                        } // Set value to the last selected author ID or an empty string if no author is selected
                        onChange={(e) =>
                          handleAssignedReviewerChange(e, dataIndex)
                        }
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
                      {assignedReviewerNames[dataIndex]?.map(
                        (reviewerName, index) => (
                          <div key={index}>
                            {reviewerName}{" "}
                            <button
                              type="button"
                              onClick={() =>
                                removeAssignedReviewer(index, dataIndex)
                              }
                            >
                              x
                            </button>
                          </div>
                        )
                      )}
                    </div>
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        handleSendForReview(row, assignedReviewers[dataIndex])
                      }
                    >
                      Send for review
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Papers;
