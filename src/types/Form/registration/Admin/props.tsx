type AdminRegisterFormData = {
  email: string;
  password: string;
};
export type AdminRegisterFormProps = AdminRegisterFormData & {
  updateRegisterFields: (fields: Partial<AdminRegisterFormData>) => void;
};
