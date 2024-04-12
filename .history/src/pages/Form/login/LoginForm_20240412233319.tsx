import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { UserBaseInfoState, authorformStepState } from "@/lib/recoil";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});

const LoginForm = () => {
  const [step, setStep] = useRecoilState(authorformStepState);

  const [user, setUser] = useRecoilState(UserBaseInfoState);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // setUser({
    //   firstName: values.firstName,
    //   lastName: values.lastName,
    //   email: values.email,
    //   password: values.password,
    //   phone: values.phone,
    // });
    setStep(2);
  }
  useEffect(() => {
    if (step === 1) {
      form.reset(user); // Reset form with the stored values
    }
  }, [step]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 ">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full bg-green-500" type="submit">
          Login
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
