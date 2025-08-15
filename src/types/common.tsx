import { IconType } from "react-icons";

export const userRoles = {
  USER: "user",
};
export type TRoles = keyof typeof userRoles;

export interface TLoginValues {
  fullName:string
  email: string;
  password: string;
  username: string;
  confirmPassword: string;
}


export interface SidbarItem {
  title: string;
  path: string;
  parentPath?: string;
  child?: SidbarItem[];
  icon?: IconType;
}


export interface TExprt {
  id: string;
  name: string;
  imageUrl: string;
  category: { categoryName: string };
}



