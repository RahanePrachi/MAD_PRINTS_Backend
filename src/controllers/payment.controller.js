import Razorpay from "razorpay";
import crypto from "crypto";
import {Order} from "../models/order.model.js";
import {Product} from "../models/product.model.js";
import dotenv from "dotenv";
dotenv.config();
const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});

// Initiate Razorpay Order
const initiateOrder = async (req, res) => {
    const { cartItems } = req.body; // Array of product IDs and quantities
    const userId = req.user.id;

    if (!cartItems || cartItems.length === 0) {
        return res.status(400).json({
            success: false,
            message: "Cart is empty. Please add items to proceed.",
        });
    }

    let totalAmount = 0;
    try {
        for (const item of cartItems) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: `Product not found: ${item.productId}`,
                });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Insufficient stock for ${product.name}`,
                });
            }

            totalAmount += product.price * item.quantity;
        }

        const currency = "INR";
        const options = {
            amount: totalAmount * 100, // Amount in paise
            currency,
            receipt: `order_rcptid_${Date.now()}`,
        };

        const paymentResponse = await instance.orders.create(options);

        return res.status(200).json({
            success: true,
            orderDetails: paymentResponse,
        });
    } catch (error) {
        console.error("Error initiating order:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create Razorpay order.",
        });
    }
};

const verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, cartItems } = req.body;
    const userId = req.user.id;

    if (
        !razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature ||
        !cartItems ||
        cartItems.length === 0
    ) {
        return res.status(400).json({ success: false, message: "Invalid payment details." });
    }

    try {
        // Verify Signature
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature === razorpay_signature) {
            // Deduct stock and save order details
            for (const item of cartItems) {
                const product = await Product.findById(item.productId);

                if (product && product.stock >= item.quantity) {
                    product.stock -= item.quantity;
                    await product.save();
                }
            }

            // Save the order in the database (e.g., Order model)
            const newOrder = {
                user: userId,
                items: cartItems,
                totalAmount: cartItems.reduce((total, item) => total + item.quantity * item.price, 0),
                paymentId: razorpay_payment_id,
                status: "Paid",
            };

            // Assume we have an Order model
            await Order.create(newOrder);

            return res.status(200).json({
                success: true,
                message: "Payment verified and order placed successfully.",
            });
        }

        return res.status(400).json({
            success: false,
            message: "Invalid payment signature.",
        });
    } catch (error) {
        console.error("Error verifying payment:", error);
        return res.status(500).json({
            success: false,
            message: "Payment verification failed.",
        });
    }
};

export {
    initiateOrder, verifyPayment
}