
import express from "express";
import { getAddBook ,postAddBook} from "../controllers/adminControllers.js";



const adminRoutes = express.Router()

adminRoutes.get("/add-book",getAddBook)
adminRoutes.post("/add-book",postAddBook)

export default adminRoutes