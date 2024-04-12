import TextInputWithLabel from "../../../../components/Form/TextInputWithLabel";
import { StyledUserFormStep } from "../../../../styles/pages/Form/UserFormStep.styled";
import { ReviewerRegisterFormStep1Props } from "../../../../types/Form/registration/Reviewer/props";

const ReviewerRegisterFormStep1: React.FC<ReviewerRegisterFormStep1Props> = ({
  firstName,
  lastName,
  email,
  phone,
  updateRegisterFields,
}) => {
  return (
    <StyledUserFormStep id="reviewerRegisterStep1">
      <TextInputWithLabel
        inputId="reviewerRegisterFirstName"
        inputName="firstName"
        inputType="text"
        inputValue={firstName}
        inputLabel="First Name"
        isRequired={true}
        placeholder="Jon"
        handleInputChange={updateRegisterFields}
      />
      <TextInputWithLabel
        inputId="reviewerRegisterLastName"
        inputName="lastName"
        inputType="text"
        inputValue={lastName}
        inputLabel="Last Name"
        isRequired={true}
        placeholder="Doe"
        handleInputChange={updateRegisterFields}
      />
      <TextInputWithLabel
        inputId="reviewerRegisterEmail"
        inputName="email"
        inputType="email"
        inputValue={email}
        inputLabel="Email"
        isRequired={true}
        placeholder="example@gmail.com"
        handleInputChange={updateRegisterFields}
      />
      <TextInputWithLabel
        inputId="reviewerRegisterPhone"
        inputName="phone"
        inputType="phone"
        inputValue={phone}
        inputLabel="Phone"
        isRequired={true}
        placeholder="+123456789"
        handleInputChange={updateRegisterFields}
      />
    </StyledUserFormStep>
  );
};

export default ReviewerRegisterFormStep1;