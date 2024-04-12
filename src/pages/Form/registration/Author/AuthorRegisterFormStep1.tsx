import TextInputWithLabel from "../../../../components/Form/TextInputWithLabel";
import { StyledUserFormStep } from "../../../../styles/pages/Form/UserFormStep.styled";
import { AuthorRegisterFormStep1Props } from "../../../../types/Form/registration/Author/props";
const AuthorRegisterFormStep1: React.FC<AuthorRegisterFormStep1Props> = ({
  firstName,
  lastName,
  email,
  phone,
  updateRegisterFields,
}) => {
  return (
    <StyledUserFormStep id="authorRegisterStep1">
      <TextInputWithLabel
        inputId="authorRegisterFirstName"
        inputName="firstName"
        inputType="text"
        inputValue={firstName}
        inputLabel="First Name"
        isRequired={true}
        placeholder="Jon"
        handleInputChange={updateRegisterFields}
      />
      <TextInputWithLabel
        inputId="authorRegisterLastName"
        inputName="lastName"
        inputType="text"
        inputValue={lastName}
        inputLabel="Last Name"
        isRequired={true}
        placeholder="Doe"
        handleInputChange={updateRegisterFields}
      />
      <TextInputWithLabel
        inputId="authorRegisterEmail"
        inputName="email"
        inputType="email"
        inputValue={email}
        inputLabel="Email"
        isRequired={true}
        placeholder="example@gmail.com"
        handleInputChange={updateRegisterFields}
      />
      <TextInputWithLabel
        inputId="authorRegisterPhone"
        inputName="phone"
        inputType="tel"
        inputValue={phone}
        inputLabel="Phone Number"
        isRequired={false}
        placeholder="+123456789"
        handleInputChange={updateRegisterFields}
      />
    </StyledUserFormStep>
  );
};

export default AuthorRegisterFormStep1;
