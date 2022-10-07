import { Posts } from "@prisma/client";
import { prisma } from "../database";

export type PostsCreate = Omit<Posts, 'id' | 'createAt'>

export async function create(post: PostsCreate) {
    return await prisma.posts.create({ data: post })
}

export async function getAll(pag: number) {
    const NUMBER_VISIBLE = 10
    const page = pagination(pag, NUMBER_VISIBLE)
    return await prisma.posts.findMany({distinct: ['id'], select: {title: true, summary: true, id: true, image: true, createAt: true ,Users:{select: { email: true, id: true}}} , orderBy: {createAt: 'desc'}})
}

export async function getUserPost(userId: number, pag: number) {
    const NUMBER_VISIBLE = 10
    const page = pagination(pag, NUMBER_VISIBLE)
    return await prisma.posts.findMany({ take: 10, distinct: ['id'], skip: page, 
    select: {title: true, summary: true, text: false,  id: true, image: true, 
    createAt: true ,Users:{select: { email: true, id: true}}}, 
    orderBy: {createAt: 'desc'}, 
    where: {usersId: userId}})
}

export async function getPostById(postId: number) {
    return await prisma.posts.findMany({where: {id: postId}, distinct: ['id'], select: {title: true, summary: true, text: true,  id: true, image: true, createAt: true ,Users:{select: { email: true, id: true}}}})
}

export interface Edit {
    title?: string
    text?: string
    summary?: string
    image?: string
}

export async function patchById(postId: number, edit: Edit) {
    let data = { }

    if (edit.image){
        data = {...data, image: edit.image}
    }
    if (edit.summary){
        data = {...data, summary: edit.summary}
    }
    if (edit.text){
        data = {...data, text: edit.text}
    }
    if (edit.title){
        data = {...data, title: edit.title}
    }

    return await prisma.posts.update({
        where: {
            id: postId
        },
        data,
      })
}

export async function deleteById(postId: number) {
    return await prisma.posts.delete({where: {id: postId}})
}

export async function verifyUserIdWithPost(usersId: number, postId: number) {
    return await prisma.posts.findFirst({where: {usersId, id: postId} })
}

export async function findTitleAndId(idUser: number, title: string) {
    return await prisma.posts.findFirst({where: {usersId: idUser, title}})
}


function pagination(page: number, numberVisible: number){
    if(page > 1){
        page = page * numberVisible - numberVisible
    } else {
        page = 0
    }
    return page
}