import express from 'express';
const router = express.Router();
import { placeOrder,getAllOrders, getOrderById, deleteOrder } from '../controllers/order.controller.js';


router.post('/placeorder', placeOrder);
router.get('/getAllOrders', getAllOrders);
router.get('/getorder/:id', getOrderById);
router.delete('/deleteorder/:id', deleteOrder);

export default router;