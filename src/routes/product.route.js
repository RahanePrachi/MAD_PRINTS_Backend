// ROutes of product
import express from 'express';
import { upload } from '../middlewares/multer.middleware.js';
import {auth, isAdmin, isCustomer} from "../middlewares/auth.middleware.js"
import { createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct , getProductsByQuery} from '../controllers/product.controller.js';
const router = express.Router();

router.post('/products',upload.any(),auth, isAdmin, createProduct);
router.get('/products/:id', getProductById);
router.get('/products', getProducts);
router.get('/getproducts', getProductsByQuery);
router.put('/editproduct/:id', auth, updateProduct);

router.delete('/products/:id', deleteProduct);

export default router;