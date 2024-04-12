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
    <>
      {step === 1 && <FirstStepForm />}
      {step === 2 && <AuthorSecondStepForm />}
      <Progress value={33} className={cn("w-full h-5 bg-green-500")} />
    </>
  );
};

export default AuthorRegistrationForm;
