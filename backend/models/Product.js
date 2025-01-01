// import mongoose, { Schema } from "mongoose";
// import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const mongoose = require("mongoose");
// **Customization Option Schema**
// Defines available customization options for a product, set by the admin.
// const customizationOptionSchema = new mongoose.Schema({
//     type: { 
//         type: String, 
//         required: true,
//         enum: ["text", "color", "size", "shape", "file", "number", "other"] // Type of customization
//     },
//     label: { 
//         type: String, 
//         required: true,
//         trim: true // Display name for the customization option
//     },
//     options: { 
//         type: [String], 
//         default: [] // List of selectable options (if applicable)
//     },
//     isRequired: { 
//         type: Boolean, 
//         default: false // Indicates if this customization is mandatory
//     },
//     defaultValue: { 
//         type: Schema.Types.Mixed, 
//         default: null // Default value for this customization option
//     }
// });

// **Customization Value Schema**
// Stores user-provided values based on the defined customization options.
// const customizationValueSchema = new mongoose.Schema({
//     label: { type: String, required: true }, // Label of the customization
//     type: { 
//         type: String, 
//         required: true,
//         enum: ["text", "color", "size", "shape", "file", "number", "other"] // Type of customization value
//     },
//     value: { type: Schema.Types.Mixed, required: true } // Actual value provided by the user
// });

// **Print Detail Schema**
// Defines specific printing details for customizable products.
// const printDetailSchema = new mongoose.Schema({
//     printArea: {
//         type: [String],
//         default: ["front", "back"] // Areas available for printing
//     },
//     printType: {
//         type: String,
//         enum: ["digital", "screen", "embroidery"], // Printing method
//         default: "digital"
//     },
//     designFileRequired: {
//         type: Boolean,
//         default: false // Indicates if a design file is mandatory
//     }
// });

// **Main Product Schema**
// Represents a product in the e-commerce platform.
const productSchema =  new mongoose.Schema(
    {
        images: {
            type: [String], // URLs of product images
            required: true
        },
        thumbnail: {
            type: String, // Thumbnail image URL
            required: true
        },
        title: {
            type: String,
            required: true,
            trim: true // Product title
        },
        description: {
            type: String,
            required: true,
            trim: true // Product description
        },
        // category: {
        //     type: String,
        //     required: true,
        //     enum: [
        //         "Men's Clothing", "Women's Clothing", "Kids' Clothing",
        //         "Wall Art", "Tote Bags", "Hats", "Phone Cases",
        //         "Mugs & Bottles", "Stationery", "Calendars", "Cards", "Brands"
        //     ] // Predefined categories
        // },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
          },
        subcategories: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "SubCategory",
            },
          ],
        price: {
            type: Number,
            required: true,
            min: [0, "Price cannot be negative"] // Product price
        },
        stock: {
            type: Number,
            required: true,
            min: [0, "Stock cannot be negative"] // Product stock
        },
        brand: {
            type: String,
            trim: true // Brand name
        },
        features: {
            type: [String],
            required: true // Key product features
        },
        care_instructions: {
            type: [String],
            default: [] // Product care instructions
        },
        // customizationOptions: {
        //     type: [customizationOptionSchema], // Admin-defined customization options
        //     default: []
        // },
        // userCustomizations: {
        //     type: [customizationValueSchema], // User-selected customization values
        //     default: []
        // },
        // printDetails: {
        //     type: printDetailSchema, // Printing-specific details
        //     default: {}
        // },
        available_colors: {
            type: [String],
            default: [] // Available color options
        },
        isPublished: {
            type: Boolean,
            default: true // Product visibility status
        }
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt timestamps
);

// Enable aggregation-based pagination for large datasets
// productSchema.plugin(mongooseAggregatePaginate);

// Export the Product model
// export const Product = mongoose.model("Product", productSchema);
module.exports = mongoose.model("Product", productSchema);
