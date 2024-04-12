import TextInputWithLabel from "../../../../components/Form/TextInputWithLabel";
import { StyledUserFormStep } from "../../../../styles/pages/Form/UserFormStep.styled";
import { AuthorRegisterFormStep3Props } from "../../../../types/Form/registration/Author/props";

const AuthorRegisterFormStep3: React.FC<AuthorRegisterFormStep3Props> = ({
  password,
  updateRegisterFields,
}) => {
  return (
    <StyledUserFormStep id="authorRegisterStep3">
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

export default AuthorRegisterFormStep3;
