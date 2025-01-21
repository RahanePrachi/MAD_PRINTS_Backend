import mongoose, { Schema } from "mongoose";

const billingAddressDetailsSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        mobile: {
            type: String,
            required: true,
        },
        pincode: {
            type: Number,
            required: true,
        },
        flatHouse: {
            type: String,
            required: true,
        },
        streetAddress: {
            type: String,
            required: true,
        },
        landmark: {
            type: String,
        },
        townCity: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        shoppingMode: {
            type: String,
            required: true,
        },
    },
    { _id: false } // No separate _id for embedded schema
);


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
    addressDetails: {
        type: billingAddressDetailsSchema,
        required: true, // Embedded address details
    },
    products: [{
        productId: { type:mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Product reference
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
// const Order = model('Order', orderSchema);
// module.exports = Order;
export const Order = mongoose.model("Order", orderSchema);
