import { RoleType } from "../../../data/pages/Form/registration/InitialRegisterFormData";

import useGetUser from "../../../hooks/useGetUser";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const LoginForm = () => {
  const { getUser } = useGetUser();

  // const signIn = (e: FormEvent) => {
  //   e.preventDefault();
  //   getUser(loginFormData.email, loginFormData.password, selectedRole);
  // };
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Card className="flex flex-col items-center">
        <CardHeader className="w-full flex flex-col items-center justify-center">
          <CardTitle>Author</CardTitle>
          <CardDescription>
            Fill the fields below to create your new Author account!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
