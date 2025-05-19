
import express from "express";
import { getHome ,getBookDetails} from "../controllers/homeControllers.js";


const homeRoutes = express.Router()

homeRoutes.get("/",getHome)
homeRoutes.get("/book/:bookId",getBookDetails)

export default homeRoutes