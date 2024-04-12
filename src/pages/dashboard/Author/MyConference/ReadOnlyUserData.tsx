import { ReadOnlyUserDataProps } from "../../../../types/dashboard/Author/props";

const ReadOnlyUserData: React.FC<ReadOnlyUserDataProps> = ({
  userDataElements,
}) => {
  const { userData, userDataLoading } = userDataElements;
  const isUserDataAvailable = userData && Object.keys(userData).length > 0;

  return (
    <div>
      {userDataLoading ? (
        <p>Loading...</p>
      ) : isUserDataAvailable ? (
        <div>
          <div className="first-name">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={userData.firstName}
              readOnly={true}
            />
          </div>
          <div className="last-name">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={userData.lastName}
              readOnly={true}
            />
          </div>
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default ReadOnlyUserData;
