import { IUsersType } from "../types/userType";
import jwt from 'jsonwebtoken';
import * as userFunctions from '../repositories/authRepository';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config()


export async function loginUser(user: IUsersType) {
    const existUser = await userFunctions.findOne(user.email)
    if (!existUser) {
        throw { type: "Unauthorized", message: "Password or Email wrong" }
    }

    if (! (await bcrypt.compare(user.password, existUser.password))) {
        throw { type: "Unauthorized", message: "Password or Email wrong" }
    }
    const token = jwt.sign({ id: existUser.id }, process.env.SECRET_TOKEN! as string, { expiresIn: '1h'})
    return token
}

export async function registerUser(user: IUsersType) {
    const existUser = await userFunctions.findOne(user.email)
    if (existUser) {
        throw { type: "Conflict", message: "Email alredy used" }
    }
    user.password = bcrypt.hashSync(user.password, Number(process.env.SALT_HASH!))
    return await userFunctions.insert(user)
}