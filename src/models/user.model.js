import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        role: {
            type: String,
            enum: ["Admin", "Customer", "Vendor"],
            default: "Customer",
        },
        image: {
            type: String, // Storing as URL
            default: "",
        },
        token: {
            type: String,
        },
        phoneNumber: {
            type: String,
            match: [/^\d{10,15}$/, "Please provide a valid phone number"],
        },
        // address: [
        //     {
        //         street: { type: String, required: true },
        //         city: { type: String, required: true },
        //         state: { type: String, required: true },
        //         country: { type: String, required: true },
        //         zipCode: { type: String, required: true },
        //     },
        // ],
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true, // Automatically adds `createdAt` and `updatedAt`
    }
);

// Plugin for pagination
userSchema.plugin(mongooseAggregatePaginate);

export const User = mongoose.model("User", userSchema);
