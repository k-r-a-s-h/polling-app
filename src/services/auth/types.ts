import { UserDTO } from "../userService/types";

export type UserLoginRequest = Pick<UserDTO, "email" | "password">

export interface UserLoginResponse {
    token: string
}