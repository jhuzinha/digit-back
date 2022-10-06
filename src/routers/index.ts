import { Router } from "express";
import postRouter from "./postRouter";
import authRouter from "./authRouter";
import getPostRouter from "./getPostsRouter";
import testRouter from "./testRouter";

const router = Router();

router.use(getPostRouter)
router.use(authRouter)
router.use(postRouter)

if (process.env.NODE_ENV === "test") {
    router.use(testRouter)
}

export default router;
