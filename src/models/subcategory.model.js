import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const subcategorySchema = new mongoose.Schema({
  subCategoryName: {
    type: String,
    required: true,
  },
  thumbnail: {
		type: String,
	},
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



export const SubCategory = mongoose.model('SubCategory', subcategorySchema);
