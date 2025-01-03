import {SubCategory} from "../models/subcategory.model.js";
import {Category} from "../models/category.model.js"
import {Product} from "../models/product.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
// Create Subcategory
const createSubcategory = async (req, res) => {
    try {
      const { subCategoryName, category } = req.body;
      
      //Validate input
      if (!subCategoryName  ) {
        return res.status(400).json({
          success: false,
          message: "all fields are required",
        });
      }
  
      // Verify the parent category exists
      const parentCategory = await Category.findById(category);
      if (!parentCategory) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }

      
      // Create the subcategory
      const subcategory = await SubCategory.create({ subCategoryName, category,});
  
      // Add the subcategory to the parent category
      await Category.findByIdAndUpdate(category, {
        $push: { subcategories: subcategory._id },
      });
  
      res.status(201).json({ success: true, data: subcategory });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  

// Get All Subcategories
const getSubcategories = async (req, res) => {
  try {
    const subcategories = await SubCategory.find().populate('category');
    res.status(200).json({ success: true, data: subcategories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  createSubcategory,
  getSubcategories,
}
// Update Subcategory
// exports.updateSubcategory = async (req, res) => {
//   try {
//     const { subCategoryId } = req.params; // Subcategory ID from URL
//     const { subCategoryName, category } = req.body; // Data from request body
    
//     // Validate input
//     if (!subCategoryId ) {
//       return res.status(400).json({
//         success: false,
//         message: "Subcategory ID and at least one field to update are required.",
//       });
//     }

//     // Find the subcategory to update
//     const subcategory = await SubCategory.findById(subCategoryId);
//     if (!subcategory) {
//       return res.status(404).json({
//         success: false,
//         message: "Subcategory not found.",
//       });
//     }

//     // If a new category is provided, verify it exists
//     if (category && category !== subcategory.category.toString()) {
//       const parentCategory = await Category.findById(category);
//       if (!parentCategory) {
//         return res.status(404).json({
//           success: false,
//           message: "New category not found.",
//         });
//       }

//       // Remove the subcategory from the old category
//       await Category.findByIdAndUpdate(subcategory.category, {
//         $pull: { subcategories: subCategoryId },
//       });

//       // Add the subcategory to the new category
//       await Category.findByIdAndUpdate(category, {
//         $push: { subcategories: subCategoryId },
//       });

//       // Update the category field in the subcategory
//       subcategory.category = category;
//     }


//     // Update subcategory fields
//     if (subCategoryName) {
//       subcategory.subCategoryName = subCategoryName;
//     }

//     // Save the updated subcategory
//     await subcategory.save();

//     res.status(200).json({
//       success: true,
//       data: subcategory,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


// Delete Subcategory
// exports.deleteSubcategory = async (req, res) => {
//   try {
//     const subcategory = await SubCategory.findByIdAndDelete(req.params.id);
//     if (!subcategory) return res.status(404).json({ success: false, message: 'Subcategory not found' });

//     await Category.findByIdAndUpdate(subcategory.category, { $pull: { subcategories: subcategory._id } });

//     res.status(200).json({ success: true, message: 'Subcategory deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

