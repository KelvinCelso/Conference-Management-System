import { ICreateUser, IUserBaseInfo } from "@/hooks/useCreateUser";
import { atom } from "recoil";

export const authorformStepState = atom({
  key: "authorFormStepState",
  default: 1,
});

export const SubmittedState = atom({
  key: "SubmittedState",
  default: undefined,
});

export const UserBaseInfoState = atom<IUserBaseInfo | null>({
  key: "userBaseInfoState",
  default: null,
});
