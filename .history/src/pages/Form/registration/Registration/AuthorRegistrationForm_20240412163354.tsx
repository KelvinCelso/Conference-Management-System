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
    <>
      {step === 1 && <FirstStepForm />}
      {step === 2 && <AuthorSecondStepForm />}
      <div className="flex flex-col items-center justify-center">
        <ProgressPrimitive.Root
          value={step == 2 ? 50 : 0}
          className={cn("w-full h-5 bg-white border ")}
        >
          <ProgressPrimitive.Indicator
            className="bg-green-500"
            style={{
              transform: `translateX(-${100 - ((step == 2 && 50) || 0)}%)`,
            }}
          />
        </ProgressPrimitive.Root>
        <p>{step}/2</p>
      </div>
    </>
  );
};

export default AuthorRegistrationForm;
