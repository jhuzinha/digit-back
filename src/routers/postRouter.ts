import { Router } from "express";
import Validate from "../middlewares/joiValidate";
import * as postController from '../controllers/postController';
import { validateAuthUser } from "../middlewares/authMiddleware";

const postRouter = Router();

postRouter.use(validateAuthUser)
postRouter.post('/post/create', Validate('post'), postController.createPost )
postRouter.patch('/post/:idPost', postController.patchPost )
postRouter.delete('/post/:idPost', postController.deletePost)

export default postRouter;