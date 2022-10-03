import { Router } from "express";
import postRouter from "./postRouter";
import authRouter from "./authRouter";
import getPostRouter from "./getPostsRouter";
import { validateAuthUser } from "../middlewares/authMiddleware";

const router = Router();

router.use(getPostRouter)
router.use(authRouter)
router.use(postRouter)

if (process.env.NODE_ENV === "test") {
}

export default router;
