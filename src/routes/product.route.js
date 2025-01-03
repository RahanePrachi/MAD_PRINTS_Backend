// ROutes of product
import express from 'express';
import { upload } from '../middlewares/multer.middleware.js';
import { createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct } from '../controllers/product.controller.js';
const router = express.Router();

router.post('/products',upload.any(), createProduct);
router.get('/products/:id', getProductById);
router.get('/products', getProducts);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;