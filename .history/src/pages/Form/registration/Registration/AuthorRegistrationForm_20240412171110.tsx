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

import * as ProgressPrimitive from "@radix-ui/react-progress";
const AuthorRegistrationForm = () => {
  const [step, setStep] = useRecoilState(authorformStepState);

  return (
    <div className="w-full">
      {step === 2 && <FirstStepForm />}
      {step === 1 && <AuthorSecondStepForm />}
      <div className="flex flex-col items-center justify-center">
        <Progress
          value={step == 2 ? 50 : 0}
          className={cn("w-full h-5 bg-white border ")}
        ></Progress>
        <p>{step}/2</p>
      </div>
    </div>
  );
};

export default AuthorRegistrationForm;
