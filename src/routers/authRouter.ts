import { Router } from "express";
import { userLogin, userRegister } from "../controllers/authController";
import Validate from "../middlewares/joiValidate";


const authRouter = Router();

authRouter.post('/register', Validate('register'), userRegister)
authRouter.post('/login', Validate('login'), userLogin)

export default authRouter;