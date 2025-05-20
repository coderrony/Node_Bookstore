
import express from "express";
import { getAddBook ,getEditBook,postAddBook, postEditBook} from "../controllers/adminControllers.js";



const adminRoutes = express.Router()

adminRoutes.get("/add-book",getAddBook)
adminRoutes.post("/add-book",postAddBook)

adminRoutes.get("/edit-book/:bookId",getEditBook)
adminRoutes.post("/edit-book",postEditBook)

export default adminRoutes