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
import { useRecoilState } from "recoil";
import { authorformStepState } from "@/lib/recoil";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { initialRegisterFormData } from "@/data/pages/Form/registration/InitialRegisterFormData";
import { Command } from "lucide-react";
import { CommandInput } from "@/components/ui/command";
const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
  confirmPassword: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});

const AuthorSecondStepForm = () => {
  const [step, setStep] = useRecoilState(authorformStepState);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full "
      >
        <div className="space-y-2 w-full">
          <div className="flex space-x-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Affiliation</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your Affiliation" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {initialRegisterFormData.author.affiliation.options.map(
                        (value) => (
                          <SelectItem value={value}>{value}</SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Program</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your program" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {initialRegisterFormData.author.program.options.map(
                        (value) => (
                          <SelectItem value={value}>{value}</SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Command>
                  <FormControl>
                    <CommandInput placeholder="Search framework..." />
                  </FormControl>
                </Command>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex space-x-2 ">
          <Button
            className="w-full bg-secondary mt-5 text-black hover:text-white"
            onClick={() => setStep(1)}
          >
            Go Back
          </Button>
          <Button className="w-full bg-green-500 mt-5" type="submit">
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AuthorSecondStepForm;
