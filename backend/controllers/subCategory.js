const SubCategory=require("../models/subCategory");
const Category=require("../models/Category")
const Product=require("../models/Product")
// Create Subcategory
exports.createSubcategory = async (req, res) => {
    try {
      const { subCategoryName, category } = req.body;
  
      // Validate input
      // if (!subCategoryName ) {
      //   return res.status(400).json({
      //     success: false,
      //     message: "Subcategory name and category ID are required",
      //   });
      // }
  
      // Verify the parent category exists
      const parentCategory = await Category.findById(category);
      if (!parentCategory) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }
  
      // Create the subcategory
      const subcategory = await SubCategory.create({ subCategoryName, category });
  
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
exports.getSubcategories = async (req, res) => {
  try {
    const subcategories = await SubCategory.find().populate('category');
    res.status(200).json({ success: true, data: subcategories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Subcategory
// exports.updateSubcategory = async (req, res) => {
//   try {
//     const subcategory = await SubCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!subcategory) return res.status(404).json({ success: false, message: 'Subcategory not found' });
//     res.status(200).json({ success: true, data: subcategory });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
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

