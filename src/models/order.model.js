import mongoose, { Schema } from "mongoose";

// Customization Schema
const customizationValueSchema = new Schema({
    label: { type: String, required: true }, // Customization label
    type: { 
        type: String, 
        required: true, 
        enum: ["text", "color", "size", "shape", "file", "number", "other"] 
    }, // Customization type
    value: { type: Schema.Types.Mixed, required: true } // Customization value
}, { _id: false }); // No separate _id for subdocument

// Order Schema
const orderSchema = new Schema({
    addressDetails: { type: Types.ObjectId, ref: 'AddressDetail', required: true }, // Reference to details
    products: [{
        productId: { type: Types.ObjectId, ref: 'Product', required: true }, // Product reference
        customization: [customizationValueSchema], // Array of customization values
        quantity: { type: Number, required: true, min: 1 }, // Ensure valid quantity
        price: { type: Number, required: true, min: 0 } // Ensure non-negative price
    }],
    
    totalAmount: { type: Number, required: true, min: 0 }, // Ensure valid total amount
    status: { 
        type: String, 
        enum: ['pending', 'shipped', 'delivered'], 
        default: 'pending' 
    } // Order status
}, { timestamps: true });

// Export Models
const Order = model('Order', orderSchema);
module.exports = Order;
