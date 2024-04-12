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
  return <div className="bg-black w-screen h-screen"></div>;
};

export default RegisterForm;
