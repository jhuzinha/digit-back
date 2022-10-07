import { Response, Request } from "express";
import {validateToken} from '../utils/validateToken'
import * as postService from '../services/postService'
import { Edit } from "../repositories/postRepository";

export type Post = {
    title: string,
    text: string,
    image: string,
    summary: string  | null
}

export async function createPost(req: Request, res: Response) {
    const body: Post = req.body;
    const user = await validateToken(req.headers)
    const post = await postService.createPost(body, user.id)
    return res.status(201).send(post)
}


interface NewPosts {
    text?: string,
    title: string,
    createAt: Date,
    image: string,
    id: number
}

export async function getAllPost(req: Request, res: Response) {
    const page = Number(req.query.page)
    const posts = await postService.getAllPost(page)
    // const newPosts: NewPosts[] = removeText(posts)
    return res.status(200).send(posts)
}

export async function getUserPost(req: Request, res: Response) {
    const user = await validateToken(req.headers)
    console.log(user)
    const page = Number(req.query.page)
    const posts = await postService.getUserPost(user.id, page)
    // const newPosts: NewPosts[] = removeText(posts)
    return res.status(200).send(posts)
}

export async function getPostById(req: Request, res: Response) {
    const idPost = Number(req.params.idPost)
    const posts = await postService.getPostById(idPost)
    return res.status(200).send(posts)
}



export async function patchPost(req: Request, res: Response) {
    const edit: Edit = req.body;
    const idPost = Number(req.params.idPost)
    const user = await validateToken(req.headers)
    await postService.patchPost(idPost, user.id, edit)
    return res.status(200).send()
}

export async function deletePost(req: Request, res: Response) {
    const idPost = Number(req.params.idPost)
    const user = await validateToken(req.headers)
    await postService.deletePost(idPost, user.id)
    return res.status(200).send("Post deletado com sucesso")
}


function removeText(arr: any){
    const newArr: NewPosts[] = []
    for(let x= 0; arr.length > x; x++){
        arr[x].text = ''
        newArr.push({...arr[x]})
    }
    return newArr
}