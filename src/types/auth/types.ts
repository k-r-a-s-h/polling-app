import { UserDTO } from "../user/types";

export type UserLoginRequest = Pick<UserDTO, "email" | "password">;

export interface UserLoginResponse {
  token: string;
}
