import { prisma } from "../../../src/database";

export async function verifyExistPost(title: string) {
    return await prisma.posts.findFirst({where: {title}})
}

export async function insertUser(user: { email: string, password: string}) {
    return await prisma.users.create({data: {email: user.email, password: user.password}})
}