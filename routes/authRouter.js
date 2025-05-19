
import express from "express";
import { getRegister,postRegister,getLogin,postLogin,getLogout} from "../controllers/authControllers.js";



const authRouters = express.Router()

authRouters.get("/register",getRegister)
authRouters.post("/register",postRegister)

authRouters.get("/login",getLogin)
authRouters.post("/login",postLogin)

authRouters.get("/logout",getLogout)

export default authRouters