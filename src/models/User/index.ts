import prisma from "../prisma";
import { User, UserDTO } from "../../services/userService/types";

export class UserRepository {
  async createUser(userRequest: UserDTO): Promise<User> {
    try {
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
}
