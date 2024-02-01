import { User } from "../types/user/types";
import jwt from "jsonwebtoken";
import { DecodedToken } from "../types/utils/types";

export class JwtUtility {
  private jwtSecret: string;
  constructor() {
    this.jwtSecret = process.env.JWT_SECRET || "secret";
  }
  async generateLoginTokenForUser(user: User): Promise<string> {
    try {
      const token = jwt.sign(
        {
          userId: user.id,
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

  async validateToken(token: string): Promise<DecodedToken> {
    try {
      const decoded = jwt.verify(token, this.jwtSecret);
      if (!decoded) {
        throw new Error("Invalid token");
      }
      return decoded as DecodedToken;
    } catch (err) {
      // TODO: handle error gracefully
      console.error(err);
      throw err;
    }
  }
}
