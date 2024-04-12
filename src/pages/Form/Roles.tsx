import { StyledRoles } from "../../styles/pages/Form/Roles.styled";
import { RolesProps } from "../../types/Form/props";
import RoleRadio from "./RoleRadio";
import { roleRadioInputsData } from "../../data/pages/Form/RoleRadioInputsData";
import ApproveBtn from "./ApproveBtn";
const Roles: React.FC<RolesProps> = ({
  handleApproveRole,
  handleRoleChange,
  selectedRole,
  isLogin,
}) => {
  return (
    <StyledRoles id="roles" role="radiogroup">
      <div className="radio-group" role="radiogroup">
        {roleRadioInputsData.map((radio) => {
          if (radio.inputValue === "admin" && !isLogin) return null;
          return (
            <RoleRadio
              key={radio.inputId}
              radioData={radio}
              handleRoleChange={handleRoleChange}
              selectedRole={selectedRole}
              isLogin={isLogin}
            />
          );
        })}
      </div>
      <ApproveBtn handleApproveRole={handleApproveRole} />
    </StyledRoles>
  );
};

export default Roles;
