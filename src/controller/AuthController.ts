import { Request, Response } from "express";
import { AuthService } from "../services/auth";

export default class AuthController {
    private authService: AuthService;
    constructor() {
        this.authService = new AuthService();
    }
    async loginUser(req:Request, res:Response):Promise<Response> {
        try {
            const userLoginRequest = req.body;
            const userLoginResponse = await this.authService.loginUser(userLoginRequest);
            return res.json(userLoginResponse);
        } catch (err) {
            // TODO: handle error gracefully
            console.error(err);
            return res.status(500).json({ err, message: "Something went wrong" });
        }
    }
}