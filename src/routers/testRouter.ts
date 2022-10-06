import { Router } from "express";
import { clear } from "../controllers/e2eController";

const testRouter = Router();
/* istanbul ignore next */
testRouter.post("/e2e/reset", clear);

export default testRouter;