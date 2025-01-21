import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  storeURL: {
        type: String,
    },
    billingCurrency:{
        type:String,
        required:true,
    },
    profitMargin:{
        type: Number,
        required: true,
    },
  
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});



export const Store = mongoose.model('StoreSchema', storeSchema);
