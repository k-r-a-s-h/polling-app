import { UserRepository } from "../../models/User";
import { JwtUtility } from "../../utils/jwt";
import { UserLoginRequest, UserLoginResponse } from "../../types/auth/types";
import bcrypt from "bcrypt";
export class AuthService {
  private userRepository: UserRepository;
  private jwtUtility: JwtUtility;
  constructor() {
    this.userRepository = new UserRepository();
    this.jwtUtility = new JwtUtility();
  }

  async loginUser(
    userLoginRequest: UserLoginRequest
  ): Promise<UserLoginResponse> {
    try {
      const user = await this.userRepository.getUserByEmail(
        userLoginRequest.email
      );
      if (!user) {
        throw new Error("User not found");
      }
      const isPasswordValid = await bcrypt.compare(
        userLoginRequest.password,
        user.password
      );
      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }
      const token = await this.jwtUtility.generateLoginTokenForUser(user);
      return {
        token,
      };
    } catch (err) {
      // TODO: handle error gracefully
      console.error(err);
      throw err;
    }
  }
}
