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
import { Link, useNavigate } from "react-router-dom";
import company_logo from "../../../../src/assets/images/company-logo.webp";

const Login = () => {
  const { getUser } = useGetUser();
  const navigate = useNavigate();
  // const signIn = (e: FormEvent) => {
  //   e.preventDefault();
  //   getUser(loginFormData.email, loginFormData.password, selectedRole);
  // };
  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center">
      <div className="w-20 py-6">
        <Link to="/">
          <img src={company_logo} alt="author" />
        </Link>
      </div>
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
