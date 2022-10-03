import { IncomingHttpHeaders } from 'http';
import jwt from 'jsonwebtoken';
import * as authFunctions from '../repositories/authRepository';

interface TokenPayload {
    id: number,
    iat: number,
    exp: number
}

export async function validateToken(headers: IncomingHttpHeaders) {
    const { authorization } = headers;
    const userToken = authorization?.replace('Bearer ', '');
    if (!userToken) {
        throw { type: "Unauthorized", message: "Token Invalid" }
    }
    const data = jwt.verify(userToken, process.env.SECRET_TOKEN!);
    const { id } = data as TokenPayload
    const user = await authFunctions.findById(id)
    if (!user) {
        throw { type: "Unauthorized", message: "Unauthorized" }
    }
    return user
}
