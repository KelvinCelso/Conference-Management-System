import { StyledRegistrationBox } from "../../../styles/pages/Form/registration/RegistrationBox.styled";
import { RegistrationBoxProps } from "../../../types/Form/registration/props";
import UserFormButton from "../UserFormButton";

const RegistrationBox: React.FC<RegistrationBoxProps> = ({
  currentStepIndex,
  step,
  steps,
  isFirstStep,
  isLastStep,
  goTo,
  back,
}) => {
  return (
    <StyledRegistrationBox>
      <div id="steps">
        {new Array(steps.length).fill(0).map((_, index) => {
          return (
            <button key={index} type="button" onClick={() => goTo(index)}>
              {index + 1}
            </button>
          );
        })}
      </div>
      <div></div>
      <div id="currentStep">
        <span>
          {currentStepIndex + 1}/{steps.length}
        </span>
      </div>
      <div id="form">
        {step}
        <div>
          {!isFirstStep && (
            <button type="button" onClick={back}>
              Back
            </button>
          )}
          <UserFormButton isLastStep={isLastStep} buttonAction={"Next"} />
          {<button type={"submit"}>{isLastStep ? "Finish" : "Next"}</button>}
        </div>
      </div>
    </StyledRegistrationBox>
  );
};

export default RegistrationBox;
