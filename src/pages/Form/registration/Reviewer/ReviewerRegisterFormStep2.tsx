import DropdownInputWithLabel from "../../../../components/Form/DropdownInputWithLabel";
import { initialRegisterFormData } from "../../../../data/pages/Form/registration/InitialRegisterFormData";
import { StyledUserFormStep } from "../../../../styles/pages/Form/UserFormStep.styled";
import { ReviewerRegisterFormStep2Props } from "../../../../types/Form/registration/Reviewer/props";
import { InitialRegisterFormDataType, NumberDropdownInputType, RegisterDropdownNamesType, StringDropdownInputType } from "../../../../types/Form/registration/types";

const ReviewerRegisterFormStep2: React.FC<ReviewerRegisterFormStep2Props> = ({
  affiliation,
  academicInterest,
  reviewCapacity,
  updateRegisterFields,
}) => {
  const handleDropdownChange = (
    fieldName: RegisterDropdownNamesType,
    selectedValue: string
  ) => {
    const updatedField = {
      ...(initialRegisterFormData.reviewer[
        fieldName as keyof InitialRegisterFormDataType["reviewer"]
      ] as (StringDropdownInputType | NumberDropdownInputType)),
      selectedOption: selectedValue,
    };
    updateRegisterFields({
      [fieldName]: updatedField,
    });
  };
  return (
    <StyledUserFormStep id="reviewerRegisterStep2">
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
        dropdownLabel="Review Capacity"
        selectedOption={reviewCapacity.selectedOption}
        options={reviewCapacity.options}
        handleDropdownChange={handleDropdownChange}
        dropdownName="reviewCapacity"
      />
    </StyledUserFormStep>
  );
};

export default ReviewerRegisterFormStep2;
