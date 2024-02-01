import { NextFunction, Request, Response } from "express";
import { JwtUtility } from "../utils/jwt";

export const authenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;
        if(!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const jwtToken = token.split(" ")[1];
        const jwtUtility = new JwtUtility();
        const decodedToken = await jwtUtility.validateToken(jwtToken);
        req.tokenData = decodedToken;
        return next();
    } catch (err) {
        // TODO: handle error gracefully
        console.error(err);
        return res.status(500).json({ err, message: "Something went wrong" });
    }
}