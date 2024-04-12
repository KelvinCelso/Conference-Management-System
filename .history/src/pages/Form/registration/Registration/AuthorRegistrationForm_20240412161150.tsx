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

const AuthorRegistrationForm = () => {
  const [step, setStep] = useRecoilState(authorformStepState);

  return (
    <>
      {step === 1 && <FirstStepForm />}
      {step === 2 && <AuthorSecondStepForm />}
    </>
  );
};

export default AuthorRegistrationForm;
