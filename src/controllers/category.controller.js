import { Category } from"../models/category.model.js"
import { deleterCloudinaryFile, uploadOnCloudinary } from "../utils/cloudinary.js";
import { SubCategory } from "../models/subcategory.model.js";
// Create Category
const createCategory = async (req, res) => {
  let thumbnail_url=""
  try {
    const { name } = req.body;
    const thumbnail = req.files['photo']?.[0]?.path;
    //validation
    if (!name || !thumbnail) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

      //upload image to cloudinary
        const thumbnailImage = await uploadOnCloudinary(
          thumbnail,
          process.env.FOLDER_NAME
        );

    thumbnail_url=thumbnailImage.secure_url;
    const category = await Category.create({ name,  thumbnail: thumbnailImage.secure_url });

    res.status(200).json({
      success: true,
      message: "Categorys Created Successfully",
      data: category,
    });
  } catch (error) {
    if(thumbnail_url !== "")
      deleterCloudinaryFile(thumbnail_url)
    res.status(400).json({ 
        success: false, 
        message: error.message });
  }
};

// Get All Categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find()
                                .populate("subcategories");
    res.status(200).json({ 
        success: true, 
        data: categories });
  } catch (error) {
    res.status(500).json({ 
        success: false, 
        message: error.message });
  }
};


//specific category details with populated subcategories and products
const getCategoryDetails = async (req, res) => {
  try {
    const { categoryId } = req.params;

    // Find the category by ID and populate subcategories and products
    const category = await Category.findById(categoryId)
      .populate("subcategories")
      .populate("products");

    // Check if the category exists
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Update Category
const updateCategory = async (req, res) => {
  let thumbnail_url=""
  try {
    const { name } = req.body;
    const thumbnail = req.files['photo']?.[0]?.path; // Optional thumbnail image
    const updates = {};

    // If a new name is provided
    if (name) {
      updates.name = name;
    }

    // If a new thumbnail is provided
    if (thumbnail) {
      // Upload the new thumbnail image to Cloudinary
      const thumbnailImage = await uploadOnCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      );
      thumbnail_url=thumbnailImage.secure_url
      updates.thumbnail = thumbnailImage.secure_url; // Update the thumbnail URL
    }

    // Perform the update
    const category = await Category.findByIdAndUpdate(req.params.id, updates, {
      new: true, // Return the updated document
      runValidators: true, // Validate updated fields
    });

    // If the category doesn't exist
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    // Respond with the updated category
    res.status(200).json({ 
      success: true, 
      message: "Category updated successfully", 
      data: category 
    });
  } catch (error) {
    if (thumbnail_url !==""){
      deleterCloudinaryFile(thumbnail_url)
    }
    console.error("Error in updateCategory:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};


//Delete Category
const deleteCategory = async (req, res) => {
  let thumbnail_url=""
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    thumbnail_url=category.thumbnail
    if (!category)
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });

    await SubCategory.deleteMany({ category: category._id });
   
    if(thumbnail_url!==""){
      deleterCloudinaryFile(thumbnail_url)
    }
    return res
      .status(200)
      .json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  createCategory,
  getCategories ,
  getCategoryDetails,
  updateCategory,
  deleteCategory 
}
