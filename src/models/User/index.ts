import prisma from "../prisma";
import { User, UserDTO } from "../../types/user/types";
import bcrypt from "bcrypt";
export class UserRepository {
  private SALT_ROUNDS!: number;
  UserRepository() {
    this.SALT_ROUNDS = process.env.SALT_ROUNDS
      ? parseInt(process.env.SALT_ROUNDS)
      : 10;
  }
  async createUser(userRequest: UserDTO): Promise<User> {
    try {
      // hasing password here
      // under the assumption that password has been validated to be there
      userRequest.password = await this.hashPassword(userRequest.password);
      const user = await prisma.user.create({
        data: userRequest,
      });
      return user;
    } catch (err) {
      console.error(`[UserRepository.createUser]`, err);
      throw err;
    }
  }

  async getUserById(id: string): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });
      return user;
    } catch (err) {
      console.error(`[UserRepository.getUserById]`, err);
      throw err;
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      return user;
    } catch (err) {
      console.error(`[UserRepository.getUserByEmail]`, err);
      throw err;
    }
  }

  private async hashPassword(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(this.SALT_ROUNDS);
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    } catch (err) {
      console.error(`[UserRepository.hashPassword]`, err);
      throw err;
    }
  }
}
