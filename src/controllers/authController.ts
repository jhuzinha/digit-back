import { Request, Response } from "express";
import  * as userService from '../services/authService'
import { IUsersType } from "../types/userType";

export async function userLogin(req: Request, res: Response) {
    const { password, email }: IUsersType = req.body;
    const token = await userService.loginUser({ password, email })
    res.status(200).send({token})
}

export async function userRegister(req: Request, res: Response) {
    const { password, email }: IUsersType = req.body;
    const user = await userService.registerUser({ password, email })
    res.status(201).send(user)
}