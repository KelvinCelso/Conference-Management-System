import { IAuthorInfo, ICreateUser, IUserBaseInfo } from "@/hooks/useCreateUser";
import { atom } from "recoil";

export const authorformStepState = atom({
  key: "authorFormStepState",
  default: 1,
});

export const SubmittedState = atom({
  key: "SubmittedState",
  default: undefined,
});

export const UserBaseInfoState = atom<IUserBaseInfo>({
  key: "userBaseInfoState",
  default: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  },
});

export const UserAuthorInfoState = atom<IAuthorInfo>({
  key: "userAuthorInfoState",
  default: {
    affiliation: "",
    program: "",
    academicInterest: "",
    supervisor: "",
  },
});
