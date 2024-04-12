import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import FirstStepForm from "./FirstStepForm";
import AuthorSecondStepForm from "./AuthorSeconStepForm";
import { useRecoilState } from "recoil";
import { authorformStepState } from "@/lib/recoil";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const AuthorRegistrationForm = () => {
  const [step, setStep] = useRecoilState(authorformStepState);

  return (
    <div className="min-w-full space-y-5">
      {step === 1 && <FirstStepForm />}
      {step === 2 && <AuthorSecondStepForm />}
      <div className="flex flex-col items-center justify-center space-y-4">
        <Progress
          value={step == 2 ? 50 : 0}
          className={cn("w-full h-5 bg-white border ")}
        ></Progress>
        <p className="text-sm">
          <span className="text-green-500">{step}</span>/2
        </p>
      </div>
    </div>
  );
};

export default AuthorRegistrationForm;
