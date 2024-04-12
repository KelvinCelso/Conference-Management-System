import { FormEvent, useState } from "react";
import Roles from "../Roles";
import RegistrationBox from "./RegistrationBox";
import useRegistrationForm from "../../../hooks/useRegistrationForm";
import useRegisterFormData from "../../../hooks/useRegisterFormData";
import { RoleType } from "../../../data/pages/Form/registration/InitialRegisterFormData";
import { auth } from "../../../firebase";
import useCreateUser from "../../../hooks/useCreateUser";
import { StyledUserForm } from "../../../styles/pages/Form/UserForm.styled";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import RegistrationForm from "./Registration/AuthorRegistrationForm";
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
  const signUp = (e: FormEvent) => {
    e.preventDefault();
    next();
    if (rest.isLastStep) {
      createUser(
        auth,
        registerFormStepsData[selectedRole].email,
        registerFormStepsData[selectedRole].password
      );
    }
  };

  const handleRoleChange = (roleName: RoleType) => {
    setSelectedRole(roleName);
  };
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Tabs defaultValue="account" className="w-[50%]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Reviewer</TabsTrigger>
          <TabsTrigger value="password">Author</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card className="flex flex-col items-center">
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <RegistrationForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RegisterForm;
