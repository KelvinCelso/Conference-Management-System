import { useState } from "react";

import useRegistrationForm from "../../../hooks/useRegistrationForm";
import useRegisterFormData from "../../../hooks/useRegisterFormData";
import { RoleType } from "../../../data/pages/Form/registration/InitialRegisterFormData";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import company_logo from "../../../../src/assets/images/company-logo.webp";
import RegistrationForm from "./Registration/AuthorRegistrationForm";

import ReviewerRegistrationForm from "./Registration/ReviewerRegistrationForm";
import { Link, useNavigate } from "react-router-dom";
const RegisterForm = () => {
  const [selectedRole, setSelectedRole] = useState<RoleType>("author");
  const [showUserForm, setShowUserForm] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleApproveRole = () => {
    if (selectedRole) {
      setShowUserForm(true);
    }
  };
  const { registerFormSteps, registerFormStepsData } =
    useRegisterFormData(selectedRole);
  const { next, ...rest } = useRegistrationForm(registerFormSteps);

  return (
    <div className="flex flex-col w-full items-center justify-center py-16">
      <div className="w-20 pb-6">
        <Link to="/">
          <img src={company_logo} alt="author" />
        </Link>
      </div>
      <Tabs defaultValue="account">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Author</TabsTrigger>
          <TabsTrigger value="reviewer">Reviewer</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card className="flex flex-col items-center ">
            <CardHeader className="w-full flex flex-col items-center justify-center">
              <CardTitle>Author</CardTitle>
              <CardDescription>
                Fill the fields below to create your new Author account!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <RegistrationForm />
            </CardContent>
            <CardFooter>
              <p className="text-xs">
                Already Have an Account?{" "}
                <span
                  className="underline text-blue-700 cursor-pointer"
                  onClick={() => navigate("/signin")}
                >
                  Log in
                </span>
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="reviewer">
          <Card className="flex flex-col items-center">
            <CardHeader className="w-full flex flex-col items-center justify-center">
              <CardTitle>Reviewer</CardTitle>
              <CardDescription>
                Fill the fields below to create your new Reviewer account!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <ReviewerRegistrationForm />
            </CardContent>
            <CardFooter>
              <p className="text-xs">
                Already Have an Account?{" "}
                <span
                  className="underline text-blue-700 cursor-pointer"
                  onClick={() => navigate("/signin")}
                >
                  Log in
                </span>
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RegisterForm;
