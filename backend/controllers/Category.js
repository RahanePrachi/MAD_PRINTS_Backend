const Category=require("../models/Category")

// Create Category
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    
		//validation
		if (!name) {
			return res
				.status(400)
				.json({ success: false, message: "All fields are required" });
		}

    const category = await Category.create({ name });
    res.status(200).json({
      success: true,
      message: "Categorys Created Successfully",
      data: category,
    });
  } catch (error) {
    res.status(400).json({ 
        success: false, 
        message: error.message });
  }
};

// Get All Categories
exports.getCategories = async (req, res) => {
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
exports.getCategoryDetails = async (req, res) => {
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
// exports.updateCategory = async (req, res) => {
//   try {
//     const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!category)
//       return res
//         .status(404)
//         .json({ success: false, message: "Category not found" });
//     res.status(200).json({ success: true, data: category });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

// Delete Category
// exports.deleteCategory = async (req, res) => {
//   try {
//     const category = await Category.findByIdAndDelete(req.params.id);
//     if (!category)
//       return res
//         .status(404)
//         .json({ success: false, message: "Category not found" });
//     await Subcategory.deleteMany({ category: category._id });
//     res
//       .status(200)
//       .json({ success: true, message: "Category deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

