// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Express } from "express-serve-static-core";
import { DecodedToken } from "../utils/types";


declare module "express-serve-static-core" {
  interface Request {
    tokenData: DecodedToken;
  }
}