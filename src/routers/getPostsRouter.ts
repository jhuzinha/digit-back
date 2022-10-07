import { Router } from "express";
import * as postController from '../controllers/postController'

const getPostRouter = Router();

getPostRouter.get('/post', postController.getAllPost)
getPostRouter.get('/post/:idPost', postController.getPostById)
getPostRouter.get('/posts/user', postController.getUserPost)


export default getPostRouter;