import express from "express"
import formidable from "express-formidable"
const router =express.Router()

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js"
import checkId from "../middlewares/checkId.js"
import { addProduct,fetchProducts,fetchNewProducts,filterProducts, fetchProductsById,fetchTopProduct, addProductReview,fetchAllProducts, updateProductDetails,removeProduct } from "../controllers/productController.js"


router.route("/")
.get(fetchProducts)
.post(authenticate,authorizeAdmin, formidable(), addProduct)
router.route("/allproducts")
.get(fetchAllProducts)

router.route("/:id/reviews").post(authenticate,checkId,addProductReview)

router.get("/top", fetchTopProduct)
router.get("/new",fetchNewProducts)
router.route("/:id")
.get(fetchProductsById)
.put(authenticate,authorizeAdmin, formidable(), updateProductDetails)
.delete(authenticate,authorizeAdmin,removeProduct)

router.route('/filtered-products').post(filterProducts)

export default router