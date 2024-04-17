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
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
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
import useCreateUser from "@/hooks/useCreateUser";
import { auth } from "@/firebase";
import { useState } from "react";

const formSchema = z.object({
  affiliation: z.string({
    required_error: "Please introduce your Affiliation",
  }),
  academicInterest: z.string({
    required_error: "Please introduce your Academic Interest",
  }),
  program: z.string({
    required_error: "Please introduce your program",
  }),
  supervisor: z.string({
    required_error: "Please introduce your Supervisor",
  }),
});

const AuthorSecondStepForm = () => {
  const [step, setStep] = useRecoilState(authorformStepState);
  const { createUser } = useCreateUser("author");
  const [user, setUser] = useRecoilState(UserBaseInfoState);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      affiliation: "",
      program: "",
      academicInterest: "",
      supervisor: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const newUser = {
      ...user,
      affiliation: values.affiliation,
      program: values.program,
      academicInterest: values.academicInterest,
      supervisor: values.supervisor,
    };
    await createUser(auth, newUser);
    setLoading(false);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full "
      >
        <div className="space-y-4 w-full">
          <div className="flex space-x-2">
            <FormField
              control={form.control}
              name="affiliation"
              render={({ field }) => (
                <FormItem className="w-[188px]">
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
                      {initialRegisterFormData.author.affiliation.options.map(
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
              name="program"
              render={({ field }) => (
                <FormItem className="w-[188px]">
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
          </div>

          <FormField
            control={form.control}
            name="supervisor"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Supervisor</FormLabel>
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
                          ? initialRegisterFormData.author.supervisor.options.find(
                              (value) => value === field.value
                            )
                          : "Your supervisor"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search supervisor...." />
                      <CommandEmpty>No language found.</CommandEmpty>

                      <CommandList>
                        {initialRegisterFormData.author.supervisor.options.map(
                          (value) => (
                            <CommandItem
                              value={value}
                              key={value}
                              onSelect={() => {
                                form.setValue("supervisor", value);
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
                          ? initialRegisterFormData.author.academicInterest.options.find(
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
        <div className="flex space-x-2">
          <Button
            className="w-full bg-secondary  text-black hover:text-white"
            onClick={() => setStep(1)}
          >
            Go Back
          </Button>
          <Button
            className="w-full bg-green-500"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>"Please wait"</span>
              </>
            ) : (
              "Complete"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AuthorSecondStepForm;
