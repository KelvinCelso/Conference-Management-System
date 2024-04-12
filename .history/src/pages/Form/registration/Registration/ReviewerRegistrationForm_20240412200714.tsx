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
      <div className="flex flex-col items-center justify-center">
        <Progress
          value={step == 2 ? 50 : 0}
          className={cn("w-full h-5 bg-white border ")}
        ></Progress>
        <p>
          <span className="text-green-500">{step}</span>/2
        </p>
      </div>
    </div>
  );
};

export default ReviewerRegistrationForm;
