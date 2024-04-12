import React from "react";
import { AuthorRegisterFormStep2Props } from "../../../../types/Form/registration/Author/props";
import { StyledUserFormStep } from "../../../../styles/pages/Form/UserFormStep.styled";
import { initialRegisterFormData } from "../../../../data/pages/Form/registration/InitialRegisterFormData";
import {
  InitialRegisterFormDataType,
  RegisterDropdownNamesType,
  StringDropdownInputType,
} from "../../../../types/Form/registration/types";
import DropdownInputWithLabel from "../../../../components/Form/DropdownInputWithLabel";
const AuthorRegisterFormStep2: React.FC<AuthorRegisterFormStep2Props> = ({
  affiliation,
  academicInterest,
  program,
  supervisor,
  updateRegisterFields,
}) => {
  const handleDropdownChange = (
    fieldName: RegisterDropdownNamesType,
    selectedValue: string
  ) => {
    const updatedField = {
      ...(initialRegisterFormData.author[
        fieldName as keyof InitialRegisterFormDataType["author"]
      ] as StringDropdownInputType),
      selectedOption: selectedValue,
    };
    updateRegisterFields({
      [fieldName]: updatedField,
    });
  };
  return (
    <StyledUserFormStep id="authorRegisterStep2">
      <DropdownInputWithLabel
        dropdownLabel="Affiliation"
        selectedOption={affiliation.selectedOption}
        options={affiliation.options}
        handleDropdownChange={handleDropdownChange}
        dropdownName="affiliation"
      />
      <DropdownInputWithLabel
        dropdownLabel="Academic Interest"
        selectedOption={academicInterest.selectedOption}
        options={academicInterest.options}
        handleDropdownChange={handleDropdownChange}
        dropdownName="academicInterest"
      />
      <DropdownInputWithLabel
        dropdownLabel="Program"
        selectedOption={program.selectedOption}
        options={program.options}
        handleDropdownChange={handleDropdownChange}
        dropdownName="program"
      />
      <DropdownInputWithLabel
        dropdownLabel="Supervisor"
        selectedOption={supervisor.selectedOption}
        options={supervisor.options}
        handleDropdownChange={handleDropdownChange}
        dropdownName="supervisor"
      />
    </StyledUserFormStep>
  );
};

export default AuthorRegisterFormStep2;
