import { Post } from "../controllers/postController";
import * as functionsPosts from '../repositories/postRepository'
import * as authFunctions from '../repositories/authRepository'

export async function createPost(post: Post, usersId: number) {
    const user = await authFunctions.findById(usersId)
    if(!user){
        throw { type: "Forbidden", message: "You don't have permission" }
    }
    const noteAndId = await functionsPosts.findTitleAndId(user.id, post.title)
    if(noteAndId){
        throw { type: "Conflict", message: "Nota com o mesmo titulo já criada" }
    }
    const postCreated = await functionsPosts.create({...post, usersId})
    return postCreated
}

export async function getUserPost(userId: number, page: number) {
    const user = await authFunctions.findById(userId)
    if(isNaN(page)){
        page = 1
    }
    if(!user){
        throw { type: "Not Found", message: "User not found" }
    }
    const Posts = await functionsPosts.getUserPost(userId, page)
    return Posts
}


export async function getAllPost(page: number) {
    if(isNaN(page)){
        page = 1
    }
    const Posts = await functionsPosts.getAll(page)
    return Posts
}

export async function getPostById(postId: number) {
    const post = await functionsPosts.getPostById(postId)
    if(post.length === 0){
        throw { type: "Not Found", message: "User not found" }
    }
    return post
}

export async function patchPost(postId: number, userId: number, edit: functionsPosts.Edit) {
    const existPost = await functionsPosts.getPostById(postId)
    if(existPost.length === 0){
        throw { type: "Not Found", message: "Post not found" }
    }
    const post = await functionsPosts.verifyUserIdWithPost(userId, postId)
    if(!post){
        throw { type: "Forbidden", message: "You don't have permission" }
    }
    await functionsPosts.patchById(postId, edit)
    return
}

export async function deletePost(postId: number, userId: number) {
    const existPost = await functionsPosts.getPostById(postId)
    if(existPost.length === 0){
        throw { type: "Not Found", message: "Post not found" }
    }
    const post = await functionsPosts.verifyUserIdWithPost(userId, postId)
    if(!post){
        throw { type: "Forbidden", message: "You don't have permission" }
    }
    await functionsPosts.deleteById(postId)
    return
}