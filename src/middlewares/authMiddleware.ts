import jwt from 'jsonwebtoken';
import * as userFunctions from '../repositories/authRepository';
import { NextFunction, Request, Response } from 'express';

interface TokenPayload {
    id: number,
    iat: number,
    exp: number
}

export async function validateAuthUser(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if (!token) {
        throw { type: "Forbidden", message: "You don't have permission" }
    }

    const data = jwt.verify(token, process.env.SECRET_TOKEN!, async function (err, decoded){
        if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
        
        const newData = jwt.verify(token, process.env.SECRET_TOKEN!)
        const { id } = newData as TokenPayload
        const user = await userFunctions.findById(id)
        if (!user) {
            throw { type: "Forbidden", message: "You don't have permission" }
        }
        next()
    } )
}