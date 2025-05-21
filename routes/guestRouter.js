
import express from "express";
import { getAddToCart,getAddToCartList ,deleteAddToCart} from "../controllers/guestControllers.js";



const guestRoutes = express.Router()

guestRoutes.get("/add-to-cart/:bookId",getAddToCart)
guestRoutes.get("/add-to-cart-list",getAddToCartList)

guestRoutes.get("/delete-add-to-cart/:bookId",deleteAddToCart)


export default guestRoutes