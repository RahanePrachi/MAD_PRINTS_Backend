const mongoose = require("mongoose");
const Category = require("../models/Category"); // Adjust the path as needed
// const Category = require("../models/Category"); 

const subcategorySchema = new mongoose.Schema({
  subCategoryName: {
    type: String,
    required: true,
  },
  // thumbnail: {
	// 	type: String,
	// },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});


// Export the Tags model
module.exports = mongoose.model("SubCategory", subcategorySchema);
