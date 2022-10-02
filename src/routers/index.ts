import { Router } from "express";
import postRouter from "./postRouter";
import authRouter from "./authRouter";

const router = Router();

router.use(authRouter)
router.use(postRouter)

if (process.env.NODE_ENV === "test") {
}

export default router;
