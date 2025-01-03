
import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

// **Customization Option Schema**
// Defines available customization options for a product, set by the admin.
const customizationOptionSchema = new Schema({
    type: {
        type: String,
        required: true,
        enum: ["text", "color", "size", "shape", "file", "number", "other"] // Type of customization
    },
    label: {
        type: String,
        required: true,
        trim: true // Display name for the customization option
    },
    options: {
        type: [String],
        default: [] // List of selectable options (if applicable)
    },
    isRequired: {
        type: Boolean,
        default: false // Indicates if this customization is mandatory
    },
    defaultValue: {
        type: Schema.Types.Mixed,
        default: null // Default value for this customization option
    }
});


// **Print Detail Schema**
// Defines specific printing details for customizable products.
const printDetailSchema = new mongoose.Schema({
    printArea: {
        type: [String],
        default: ["front", "back"] // Areas available for printing
    },
    printType: {
        type: [String],
        enum: ["embroidery", "Direct To Garment (DTG)"], // Printing method
        default: ["Direct To Garment (DTG)"]
    },
    designFileRequired: {
        type: Boolean,
        default: false // Indicates if a design file is mandatory
    }
});

const settingSchema = new mongoose.Schema({
    productType: {
        type: String
    },
    vendor: {
        type: String,
        default: "MAD Prints"
    },
    tags: {
        type: [String],

    },
    collections: {
        type: String
    }
});

// **Main Product Schema**
// Represents a product in the e-commerce platform.
const productSchema = new Schema(
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
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        sub_category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubCategory",
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
        // sub_category: {
        //     type: String,
        //     default: "" // Optional sub-category
        // },
        price: {
            type: Number,
            required: true,
            min: [0, "Price cannot be negative"] // Product price
        },
        currency_type: {
            type: String,
            required: true,
            enum: ["INR", "USD", "GB", "CA", "AU"],
            default: "INR"
        },
        deliveryRegion: {
            type: [String],
            enum: ["Asia", "North America", "Europe", "Oceania", "South America", "United Kingdom", "Rest of the world"],
            default: ["Asia", "North America", "Europe", "Oceania", "South America", "United Kingdom", "Rest of the world"],
        },
        productUID: {
            type: String,
            default: "apparel_product_gca_t- shirt_gsc_crewneck_gcu_unisex_gqa_heavy - weight_gsi_s_gco_white_gpr_4 -0_gildan_5000"
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
        customizationOptions: {
            type: [customizationOptionSchema], // Admin-defined customization options
            default: []
        },
        printDetails: {
            type: printDetailSchema, // Printing-specific details
            default: {}
        },
        available_colors: {
            type: [String],
            default: [] // Available color options
        },
        size_table_attached: {
            type: [
                {
                    imperial: { type: Boolean, default: false }, // For imperial size table (inches, pounds)
                    metric: { type: Boolean, default: false }    // For metric size table (cm, kg)
                }
            ],
            default: []
        },
        settings: {
            type: settingSchema,
            default: {
                productType: "",
                vendor: "MAD Prints",
                tags: [],
                collections: ""
            }
        },
        is_freeshiping: {
            type: Boolean,
            default: true // Product visibility status
        },
        is_published: {
            type: Boolean,
            default: true // Product visibility status
        }
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt timestamps
);

// Enable aggregation-based pagination for large datasets
productSchema.plugin(mongooseAggregatePaginate);

// Export the Product model
export const Product = mongoose.model("Product", productSchema);
