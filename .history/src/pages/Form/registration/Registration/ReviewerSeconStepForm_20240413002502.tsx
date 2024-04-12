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

import { useRecoilState } from "recoil";
import { UserBaseInfoState, authorformStepState } from "@/lib/recoil";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { initialRegisterFormData } from "@/data/pages/Form/registration/InitialRegisterFormData";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { auth } from "@/firebase";
import useCreateUser from "@/hooks/useCreateUser";

const formSchema = z.object({
  affiliation: z.string({
    required_error: "Please introduce your Affiliation",
  }),
  academicInterest: z.string({
    required_error: "Please introduce your Academic Interest",
  }),
  reviewCapacity: z.string({
    required_error: "Please introduce your review capacity",
  }),
});
const ReviewerSecondStepForm = () => {
  const [step, setStep] = useRecoilState(authorformStepState);
  const [user, setUser] = useRecoilState(UserBaseInfoState);
  const { createUser } = useCreateUser("reviewer");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      affiliation: "",
      reviewCapacity: "",
      academicInterest: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const newUser = {
      ...user,
      affiliation: values.affiliation,
      academicInterest: values.academicInterest,
      reviewCapacity: values.reviewCapacity,
    };
    await createUser(auth, newUser);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-fit ">
        <div className="space-y-2 w-fit">
          <div className="flex space-x-2 w-fit">
            <FormField
              control={form.control}
              name="affiliation"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Affiliation</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Your Affiliation" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {initialRegisterFormData.reviewer.affiliation.options.map(
                        (value) => (
                          <SelectItem key={value} value={value}>
                            {value}
                          </SelectItem>
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
              name="reviewCapacity"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="w-52">Review capacity</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Select your capacity"
                          className="w-56"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="w-56">
                      {initialRegisterFormData.reviewer.reviewCapacity.options.map(
                        (value) => (
                          <SelectItem
                            key={value}
                            value={String(value)}
                            className="w-56"
                          >
                            {value}
                          </SelectItem>
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
            name="academicInterest"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Academic Interest</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? initialRegisterFormData.reviewer.academicInterest.options.find(
                              (value) => value === field.value
                            )
                          : "Your Academic Interest"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search interest..." />
                      <CommandEmpty>No Interest found.</CommandEmpty>

                      <CommandList>
                        {initialRegisterFormData.reviewer.academicInterest.options.map(
                          (value) => (
                            <CommandItem
                              value={value}
                              key={value}
                              onSelect={() => {
                                form.setValue("academicInterest", value);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {value}
                            </CommandItem>
                          )
                        )}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

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

export default ReviewerSecondStepForm;
