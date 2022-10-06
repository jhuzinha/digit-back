import { Response, Request } from "express";
import {validateToken} from '../utils/validateToken'
import * as postService from '../services/postService'

export type Post = {
    title: string,
    text: string,
    image: string
}

export async function createPost(req: Request, res: Response) {
    const body: Post = req.body;
    const user = await validateToken(req.headers)
    const post = await postService.createPost(body, user.id)
    return res.status(201).send(post)
}

export async function getAllPost(req: Request, res: Response) {
    const posts = await postService.getAllPost()
    return res.status(200).send(posts)
}

export async function getUserPost(req: Request, res: Response) {
    const userId = Number(req.params.userId)
    const posts = await postService.getUserPost(userId)
    return res.status(200).send(posts)
}

export async function getPostById(req: Request, res: Response) {
    const idPost = Number(req.params.idPost)
    const posts = await postService.getPostById(idPost)
    return res.status(200).send(posts)
}

export async function patchPost(req: Request, res: Response) {
    const user = await validateToken(req.headers)
    return res.status(200).send()
}

export async function deletePost(req: Request, res: Response) {
    const idPost = Number(req.params.idPost)
    const user = await validateToken(req.headers)
    await postService.deletePost(idPost, user.id)
    return res.status(200).send("Post deletado com sucesso")
}