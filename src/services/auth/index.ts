import { UserRepository } from "../../models/User";
import { User } from "../userService/types";
import jwt from "jsonwebtoken";
import { UserLoginRequest, UserLoginResponse } from "./types";
import bcrypt from "bcrypt";
export class AuthService {
    private userRepository: UserRepository;
    private jwtSecret: string;
    constructor() {
      this.userRepository = new UserRepository();
      this.jwtSecret = process.env.JWT_SECRET || "secret";
    }

    async loginUser(userLoginRequest:UserLoginRequest):Promise<UserLoginResponse>{
        try {
            const user = await this.userRepository.getUserByEmail(userLoginRequest.email);
            if(!user){
                throw new Error("User not found");
            }
            const isPasswordValid = await bcrypt.compare(userLoginRequest.password, user.password);
            if(!isPasswordValid){
                throw new Error("Invalid password");
            }
            const token = await this.generateLoginTokenForUser(user);
            return {
                token
            }
    } catch (err) {
        // TODO: handle error gracefully
        console.error(err);
        throw err;
        }
    }

  private async generateLoginTokenForUser(user: User): Promise<string> {
    try {
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        this.jwtSecret,
        { expiresIn: "1h" }
      );
      return token;
    } catch (err) {
      console.error(`Failed to generate the token`, err);
      throw err;
    }
  }
}
