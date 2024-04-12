import TextInputWithLabel from "../../../../components/Form/TextInputWithLabel";
import { StyledUserFormStep } from "../../../../styles/pages/Form/UserFormStep.styled";
import { ReviewerRegisterFormStep3Props } from "../../../../types/Form/registration/Reviewer/props";

const ReviewerRegisterFormStep3: React.FC<ReviewerRegisterFormStep3Props> = ({
  password,
  updateRegisterFields,
}) => {
  return (
    <StyledUserFormStep id="reviewerRegisterStep3">
      <TextInputWithLabel
        inputId="authorRegisterPassword"
        inputName="password"
        inputType="password"
        inputValue={password}
        inputLabel="Password"
        isRequired={true}
        placeholder="jFuk&En2w9e@jre$18G"
        handleInputChange={updateRegisterFields}
      />
    </StyledUserFormStep>
  );
};

export default ReviewerRegisterFormStep3;
