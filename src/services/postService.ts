import { Post } from "../controllers/postController";
import * as functionsPosts from '../repositories/postRepository'
import * as authFunctions from '../repositories/authRepository'

export async function createPost(post: Post, usersId: number) {
    const user = await authFunctions.findById(usersId)
    if(!user){
        throw { type: "Forbidden", message: "You don't have permission" }
    }
    const postCreated = await functionsPosts.create({...post, usersId})
    return postCreated
}

export async function getUserPost(userId: number) {
    const user = await authFunctions.findById(userId)
    if(!user){
        throw { type: "Not Found", message: "User not found" }
    }
    const Posts = await functionsPosts.getUserPost(userId)
    return Posts
}


export async function getAllPost() {
    const Posts = await functionsPosts.getAll()
    return Posts
}

export async function getPostById(postId: number) {
    const post = await functionsPosts.getPostById(postId)
    if(post.length === 0){
        throw { type: "Not Found", message: "User not found" }
    }
    return post
}

export async function patchPost(postId: number) {
}

export async function deletePost(postId: number) {

}