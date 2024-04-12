import { FormEvent, useState } from "react";
import Roles from "../Roles";
import RegistrationBox from "./RegistrationBox";
import useRegistrationForm from "../../../hooks/useRegistrationForm";
import useRegisterFormData from "../../../hooks/useRegisterFormData";
import { RoleType } from "../../../data/pages/Form/registration/InitialRegisterFormData";
import { auth } from "../../../firebase";
import useCreateUser from "../../../hooks/useCreateUser";
import { StyledUserForm } from "../../../styles/pages/Form/UserForm.styled";
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
    // <StyledUserForm onSubmit={signUp}>
    //   {showUserForm ? (
    //     <RegistrationBox {...rest} />
    //   ) : (
    //     <Roles
    //       selectedRole={selectedRole}
    //       handleApproveRole={handleApproveRole}
    //       handleRoleChange={handleRoleChange}
    //       isLogin={false}
    //     />
    //   )}
    // </StyledUserForm>
    <div className="text-red-500 bg-blue-500 hover:bg-green-400">
      <p className="text-red-400 ">kelvin celso</p>
    </div>
  );
};

export default RegisterForm;
