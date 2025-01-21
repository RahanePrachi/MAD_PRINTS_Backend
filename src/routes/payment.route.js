// ROutes of payment
import express from 'express';
import {auth, isAdmin, isCustomer} from "../middlewares/auth.middleware.js"
const router = express.Router();

import {initiateOrder, verifyPayment} from "../controllers/payment.controller.js"

router.post("/capturePayment", auth, isCustomer, initiateOrder);
router.post("/verifyPayment",auth, isCustomer,verifyPayment);

export default router;