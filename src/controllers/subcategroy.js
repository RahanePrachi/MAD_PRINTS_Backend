import {SubCategory} from'../models/subcategory.model.js';
import {Category} from'../models/category.model.js';

// Create Subcategory
const createSubcategory = async (req, res) => {
  try {
    const {  subCategoryName,  categoryId } = req.body;
    console.log("printing subcategory: ", subCategoryName);
    const subcategory = await SubCategory.create({  subCategoryName, categoryId });
    console.log("printing subcategory: ", subcategory);
// Validate the input
if (! subCategoryName || !categoryId) {
    return res.status(400).json({
        success: false,
        message: "Missing required properties",
    });
}
    await Category.findByIdAndUpdate(categoryId, { $push: { subcategories: subcategory._id } });

    res.status(201).json({ success: true, data: subcategory });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
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

// Update Subcategory
const updateSubcategory = async (req, res) => {
  try {
    const subcategory = await Subcategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!subcategory) return res.status(404).json({ success: false, message: 'Subcategory not found' });
    res.status(200).json({ success: true, data: subcategory });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete Subcategory
const deleteSubcategory = async (req, res) => {
  try {
    const subcategory = await Subcategory.findByIdAndDelete(req.params.id);
    if (!subcategory) return res.status(404).json({ success: false, message: 'Subcategory not found' });

    await Category.findByIdAndUpdate(subcategory.category, { $pull: { subcategories: subcategory._id } });

    res.status(200).json({ success: true, message: 'Subcategory deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export {createSubcategory , getSubcategories, updateSubcategory, deleteSubcategory};