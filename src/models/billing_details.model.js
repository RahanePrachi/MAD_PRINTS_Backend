import { Schema } from "mongoose";

const billingAddressDetailsSchema=new Schema({
    name :{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    },
    flatHouse:{
        type:String,
        required:true
    },
    streetAddress:{
        type:String,
        required:true
    },
    landmark:{
        type:String
    },
    townCity:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    shoppingMode:{
        type:String,
        required:true
    }

});


export const AddressDetail = mongoose.model("AddressDetail", billingAddressDetailsSchema);
