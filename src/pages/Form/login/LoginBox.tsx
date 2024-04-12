import LoginTextInputWithLabel from "../../../components/Form/LoginTextInputWithLabel";
import { LoginBoxProps } from "../../../types/Form/login/props";
const LoginBox: React.FC<LoginBoxProps> = ({
  email,
  password,
  updateLoginFields,
}) => {
  return (
    <div>
      <LoginTextInputWithLabel
        inputId="loginEmail"
        inputName="email"
        inputType="email"
        inputValue={email}
        inputLabel="Email"
        isRequired={true}
        placeholder="example@gmail.com"
        handleLoginInputChange={updateLoginFields}
      />
      <LoginTextInputWithLabel
        inputId="loginPassword"
        inputName="password"
        inputType="password"
        inputValue={password}
        inputLabel="Password"
        isRequired={true}
        placeholder="hgwef6&Dgj5$JVfFj"
        handleLoginInputChange={updateLoginFields}
      />
      <button type="submit">Sign In</button>
    </div>
  );
};

export default LoginBox;
