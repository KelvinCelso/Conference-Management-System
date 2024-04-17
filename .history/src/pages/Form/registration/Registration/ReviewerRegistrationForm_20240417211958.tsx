import FirstStepForm from "./FirstStepForm";
import AuthorSecondStepForm from "./AuthorSeconStepForm";
import { useRecoilState } from "recoil";
import { authorformStepState } from "@/lib/recoil";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import ReviewerSecondStepForm from "./ReviewerSeconStepForm";

const ReviewerRegistrationForm = () => {
  const [step, setStep] = useRecoilState(authorformStepState);

  return (
    <div className="min-w-full space-y-5">
      {step === 1 && <FirstStepForm />}
      {step === 2 && <ReviewerSecondStepForm />}
    </div>
  );
};

export default ReviewerRegistrationForm;
