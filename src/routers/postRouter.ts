import { Router } from "express";
import { validateAuthUser } from "../middlewares/authMiddleware";
import Validate from "../middlewares/joiValidate";

const postRouter = Router();

postRouter.use(validateAuthUser)
postRouter.post('/post/create', Validate('post'))
postRouter.get('/post', )
postRouter.get('/post/:{idPost}', )
postRouter.patch('/post/:{idPost}', )
postRouter.delete('/post/:{idPost}', )

export default postRouter;