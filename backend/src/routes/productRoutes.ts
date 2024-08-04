import { Router } from "express";
import { getProducts, createProduct } from "../controllers/productController";

const router = Router()

router.route("/products")
        .get(getProducts)
        .post(createProduct)

export default router