const Product = require("../models/Product");

const { uploadImageCloudinary } = require("../utils/imageUploader");

exports.createProduct = async (req, res) => {
  try {
    const {  title, category, subcategories} = req.body;
    const imageFile = req.files?.productImage;

    // Validation
    if (!title || !category || !imageFile) {
      return res
        .status(400)
        .json({ success: false, message: "Title, description, category, and product image are required." });
    }

    // Upload image to Cloudinary
    const uploadedImage = await uploadImageCloudinary(
      imageFile,
      process.env.FOLDER_NAME
    );

    const product = await Product.create({
      image: uploadedImage.secure_url,
      title,

      category,
      subcategories,
     
    });

    res.status(200).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
};

exports.getProducts = async (req, res) => {
    try {
      const { categoryId, subcategoryId} = req.query;
  
    
      let query = {};
  
      // If subcategoryId is provided, query by subcategories
      if (subcategoryId) {
        query.subcategories = subcategoryId;
      }
  
      // If categoryId is provided, query by category
      if (categoryId) {
        query.category = categoryId;
      }
  
      // Fetch products from the database
      const products = await Product.find(query);
   console.log("products: ", products);
      // If no products are found, return an appropriate response
      if (products.length === 0) {
        return res.status(200).json({
          success: true,
          message: "No products found for the given criteria.",
        });
      }
  
      // Success response with product data
      res.status(200).json({
        success: true,
        data: products,
      });
    } catch (error) {
      // Handle any unexpected errors
      res.status(500).json({
        success: false,
        message: "An error occurred while fetching products.",
        error: error.message,
      });
    }
  };
  