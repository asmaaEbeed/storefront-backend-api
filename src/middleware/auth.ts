import { NextFunction, Request, Response } from "express";
import { authenticate } from '../services/auth'

const authenticateModel = new authenticate()


export function authMiddleware(req: Request, res: Response, next:NextFunction) {
    try {
        const token = req.headers['authorization']?.split(' ')[1];
        if(!token) throw new Error("Invalid token");

        const user = authenticateModel.verify(token);
        console.log("user");
        console.log(user);

        res.locals.user = user;
        next();

    } catch(e) {
        res.status(401).send("Unauthorized")
    }
}