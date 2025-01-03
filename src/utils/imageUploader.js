// const cloudinary= require("cloudinary").v2
import { v2 as cloudinary } from 'cloudinary';

//upload image to cloudinary
const uploadImageCloudinary=async (file, folder, height, quality)=>{
    const options={folder};
    console.log("temp file path :", file.tempFilePath);
    if(height){
        options.height=height; //for compression
    }
    if(quality){
        options.quality=quality; //for compression
    }

    options.resource_type="auto";  //automatically determine kar lo kis type ka object hai

    return await cloudinary.uploader.upload(file.tempFilePath, options);


}

export {uploadImageCloudinary}