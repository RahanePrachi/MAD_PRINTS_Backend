// Product controller

import { Product } from "../models/product.model.js";
import { deleterCloudinaryFile, uploadOnCloudinary } from "../utils/cloudinary.js";
// **Controller Functions**
// const createProduct = async (req, res) => {
//     try {
//         const product = await Product.create(req.body);
//         res.status(201).json(product);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };
const createProduct = async (req, res) => {
    let imageUrls=[]
    try {
        // Check if required images are uploaded
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: "At least one product image is required"
            });
        }

        // Upload all images to Cloudinary
        const imageUploadPromises = req.files.map((file) => uploadOnCloudinary(file.path, "products"));
        const imageResponses = await Promise.all(imageUploadPromises);

        // Extract image URLs
        imageUrls = imageResponses.map((response) => response.secure_url);

        // Extract thumbnail (use the first image as default thumbnail)
        const thumbnail = imageUrls[0];

        // Create product object from request body
        const newProduct = new Product({
            images: imageUrls,
            thumbnail,
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            sub_category: req.body.sub_category,
            price: Number(req.body.price),
            currency_type: req.body.currency_type,
            deliveryRegion:JSON.parse(req.body.deliveryRegion),
            productUID: req.body.productUID,
            stock: Number(req.body.stock),
            brand: req.body.brand,
            features: JSON.parse(req.body.features) || [],
            care_instructions: JSON.parse(req.body.care_instructions),
            customizationOptions: JSON.parse(req.body.customizationOptions || "[]"),
            printDetails: JSON.parse(req.body.printDetails || "{}"),
            available_colors: JSON.parse(req.body.available_colors) || [],
            size_table_attached: JSON.parse(req.body.size_table_attached || "[]"),
            settings: JSON.parse(req.body.settings || "{}"),
            is_freeshiping: req.body.is_freeshiping === "true",
            is_published: req.body.is_published === "true"
        });

        // Save product to database
        await newProduct.save();

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product: newProduct
        });
    } catch (error) {
        console.error(error);
        imageUrls.map((item)=>{

            deleterCloudinaryFile(item)
        })
        res.status(500).json({
            success: false,
            message: "Failed to create product",
            error: error.message
        });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        console.log("req:", req.params.id);

        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
}
