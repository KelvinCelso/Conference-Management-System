import { FormEvent, useState, ChangeEvent } from "react";
import Roles from "../Roles";
import LoginBox from "./LoginBox";
import { RoleType } from "../../../data/pages/Form/registration/InitialRegisterFormData";
import { InitialLoginFormDataType } from "../../../types/Form/login/types";
import { initialLoginFormData } from "../../../data/pages/Form/login/InitialLoginFormData";
import useGetUser from "../../../hooks/useGetUser";
import { StyledUserForm } from "../../../styles/pages/Form/UserForm.styled";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const LoginForm = () => {
  const [selectedRole, setSelectedRole] = useState<RoleType>("author");
  const [showUserForm, setShowUserForm] = useState<boolean>(false);
  const { getUser } = useGetUser();
  const handleApproveRole = () => {
    if (selectedRole) {
      setShowUserForm(true);
    }
  };

  const handleRoleChange = (roleName: RoleType) => {
    setSelectedRole(roleName);
  };
  const [loginFormData, setLoginFormData] =
    useState<InitialLoginFormDataType>(initialLoginFormData);
  function updateLoginFields(e: ChangeEvent<HTMLInputElement>) {
    setLoginFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  const signIn = (e: FormEvent) => {
    e.preventDefault();
    getUser(loginFormData.email, loginFormData.password, selectedRole);
  };
  return (
    // <Card className="flex flex-col items-center">
    //   <CardHeader className="w-full flex flex-col items-center justify-center">
    //     <CardTitle>Author</CardTitle>
    //     <CardDescription>
    //       Fill the fields below to create your new Author account!
    //     </CardDescription>
    //   </CardHeader>
    //   <CardContent className="space-y-2">
    //     <LoginForm />
    //   </CardContent>
    // </Card>
    <p>kelvin</p>
  );
};

export default LoginForm;
