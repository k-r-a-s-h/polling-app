import { Request, Response } from "express";
import UserService from "../services/userService";
export default class UserController {
    private userService: UserService;
    constructor() {
        this.userService = new UserService();
    }
    createUser = async (req:Request,res:Response):Promise<Response> => {
        try {
            const { body } = req;
            const user = await this.userService.createUser(body);
            return res.json(user);
        } catch(err) {
            console.log(err);
            return res.json({
                err,
                messge: "Something went wrong"
            })
        }
        
    }
}