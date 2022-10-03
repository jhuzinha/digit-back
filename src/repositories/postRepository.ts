import { Posts } from "@prisma/client";
import { prisma } from "../database";

export type PostsCreate = Omit<Posts, 'id' | 'createAt'>

export async function create(post: PostsCreate) {
    return await prisma.posts.create({ data: post })
}

export async function getAll() {
    return await prisma.posts.findMany({orderBy: {createAt: 'desc'}})
}

export async function getUserPost(userId: number) {
    return await prisma.posts.findMany({orderBy: {createAt: 'desc'}, where: {usersId: userId}})
}

export async function getPostById(postId: number) {
    return await prisma.posts.findMany({where: {id: postId}})
}

// export async function patchById(postId: number) {
//     return await prisma.posts.findMany({where: {id: postId}})
// }

export async function deleteById(postId: number) {
    return await prisma.posts.delete({where: {id: postId}})
}

export async function verifyUserIdWithPost(usersId: number, postId: number) {
    return await prisma.posts.findFirst({where: {usersId, id: postId} })
}