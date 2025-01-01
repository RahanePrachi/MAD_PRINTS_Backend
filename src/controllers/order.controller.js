import Order from '../models/Order.js'; // Adjust the path as needed
import AddressDetail from '../models/AddressDetail.js';


// Place a New Order (Guest or Registered User)
export const placeOrder = async (req, res) => {
    try {
        const { addressDetails, products, totalAmount, status } = req.body;

        // Validate Address Details
        if (!addressDetails) {
            return res.status(400).json({ error: "Address details are required." });
        }

        // Validate Products Array
        if (!products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ error: "At least one product is required." });
        }

        // Validate Total Amount
        if (typeof totalAmount !== 'number' || totalAmount <= 0) {
            return res.status(400).json({ error: "Total amount must be a positive number." });
        }

        // Validate Each Product
        for (const product of products) {
            const { productId, quantity, price, customization } = product;

            if (!productId) {
                return res.status(400).json({ error: "Product ID is required for each product." });
            }

            if (typeof quantity !== 'number' || quantity < 1) {
                return res.status(400).json({ error: "Product quantity must be at least 1." });
            }

            if (typeof price !== 'number' || price < 0) {
                return res.status(400).json({ error: "Product price must be a non-negative number." });
            }

            if (customization && !Array.isArray(customization)) {
                return res.status(400).json({ error: "Customization must be an array." });
            }

            // Validate if Product Exists
            const existingProduct = await Product.findById(productId);
            if (!existingProduct) {
                return res.status(404).json({ error: `Product with ID ${productId} not found.` });
            }
        }

        // Validate Address Exists
        const existingAddress = await AddressDetail.findById(addressDetails);
        if (!existingAddress) {
            return res.status(404).json({ error: "Address details not found." });
        }

        // Create Order Document
        const order = new Order({
            addressDetails,
            products,
            totalAmount,
            status: status || 'pending'
        });

        // Save Order
        await order.save();

        res.status(201).json({ message: "Order placed successfully!", order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to place order. Please try again later." });
    }
};

// Get Order Details by ID
export const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findById(orderId)
            .populate('addressDetails')
            .populate('products.productId');

        if (!order) {
            return res.status(404).json({ error: "Order not found." });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch order details." });
    }
};

// List All Orders (Admin Only)
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('addressDetails')
            .populate('products.productId')
            .sort({ createdAt: -1 });

        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch orders." });
    }
};

// Update Order Status
export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        if (!['pending', 'shipped', 'delivered'].includes(status)) {
            return res.status(400).json({ error: "Invalid status value." });
        }

        const order = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ error: "Order not found." });
        }

        res.status(200).json({ message: "Order status updated successfully!", order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update order status." });
    }
};

// Delete an Order
export const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findByIdAndDelete(orderId);

        if (!order) {
            return res.status(404).json({ error: "Order not found." });
        }

        res.status(200).json({ message: "Order deleted successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete order." });
    }
};