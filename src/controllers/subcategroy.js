const Subcategory = require('../models/subcategory');
const Category = require('../models/Category');

// Create Subcategory
exports.createSubcategory = async (req, res) => {
  try {
    const { name, description, imageUrl, category } = req.body;
    const subcategory = await Subcategory.create({ name, description, imageUrl, category });

    await Category.findByIdAndUpdate(category, { $push: { subcategories: subcategory._id } });

    res.status(201).json({ success: true, data: subcategory });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get All Subcategories
exports.getSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find().populate('category');
    res.status(200).json({ success: true, data: subcategories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Subcategory
exports.updateSubcategory = async (req, res) => {
  try {
    const subcategory = await Subcategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!subcategory) return res.status(404).json({ success: false, message: 'Subcategory not found' });
    res.status(200).json({ success: true, data: subcategory });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete Subcategory
exports.deleteSubcategory = async (req, res) => {
  try {
    const subcategory = await Subcategory.findByIdAndDelete(req.params.id);
    if (!subcategory) return res.status(404).json({ success: false, message: 'Subcategory not found' });

    await Category.findByIdAndUpdate(subcategory.category, { $pull: { subcategories: subcategory._id } });

    res.status(200).json({ success: true, message: 'Subcategory deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
