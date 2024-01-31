import { Router } from "express";
import UserController from "../controller/UserController";
import AuthController from "../controller/AuthController";

const router = Router();
const userController = new UserController();
const authController = new AuthController();
router.post("/signup", userController.createUser.bind(userController));
router.post("/login", authController.loginUser.bind(authController));
export default router;
