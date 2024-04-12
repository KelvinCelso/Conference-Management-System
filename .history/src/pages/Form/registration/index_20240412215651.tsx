import { FormEvent, useState } from "react";

import useRegistrationForm from "../../../hooks/useRegistrationForm";
import useRegisterFormData from "../../../hooks/useRegisterFormData";
import { RoleType } from "../../../data/pages/Form/registration/InitialRegisterFormData";
import { auth } from "../../../firebase";
import useCreateUser from "../../../hooks/useCreateUser";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import RegistrationForm from "./Registration/AuthorRegistrationForm";

import ReviewerRegistrationForm from "./Registration/ReviewerRegistrationForm";
const RegisterForm = () => {
  const [selectedRole, setSelectedRole] = useState<RoleType>("author");
  const [showUserForm, setShowUserForm] = useState<boolean>(false);
  const handleApproveRole = () => {
    if (selectedRole) {
      setShowUserForm(true);
    }
  };
  const { registerFormSteps, registerFormStepsData } =
    useRegisterFormData(selectedRole);
  const { next, ...rest } = useRegistrationForm(registerFormSteps);
  const { createUser } = useCreateUser(
    registerFormStepsData[selectedRole],
    selectedRole
  );

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Tabs defaultValue="account" className="w-[50%]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Author</TabsTrigger>
          <TabsTrigger value="reviewer">Reviewer</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card className="flex flex-col items-center">
            <CardHeader className="w-full flex flex-col items-center justify-center">
              <CardTitle>Author</CardTitle>
              <CardDescription>
                Fill the fields below to create your new Author account!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <RegistrationForm />
            </CardContent>
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
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RegisterForm;
