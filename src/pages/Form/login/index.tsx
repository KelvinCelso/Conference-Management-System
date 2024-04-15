import useGetUser from "../../../hooks/useGetUser";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { getUser } = useGetUser();
  const navigate = useNavigate();
  // const signIn = (e: FormEvent) => {
  //   e.preventDefault();
  //   getUser(loginFormData.email, loginFormData.password, selectedRole);
  // };
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Card className="flex flex-col items-center">
        <CardHeader className="w-full flex flex-col items-center justify-center">
          <CardTitle>Login </CardTitle>
          <CardDescription>
            Fill your login credentials to get to your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 w-full">
          <LoginForm />
        </CardContent>
        <CardFooter>
          <p className="text-xs">
            Don't Have an Account?{" "}
            <span
              className="underline text-blue-700 cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Create a new account
            </span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
