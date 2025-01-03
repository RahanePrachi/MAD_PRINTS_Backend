import {v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config(); 

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
// console.log('Cloudinary Config:', {
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
// });
const uploadOnCloudinary=async function (localFilePath) {
    console.log("localpath:",localFilePath)
    try{

        if(!localFilePath) return null;

        const response=await cloudinary.uploader.upload(localFilePath,{
            resource_type:'auto'
        });

        console.log("File is uploaded successfully! ",response.url)
        fs.unlinkSync(localFilePath);
        return response;
    }catch(error){
        console.error('Error uploading file to Cloudinary:', error.message);
        
        // Safe file deletion to prevent masking errors
        try {
            fs.unlinkSync(localFilePath);
        } catch (unlinkError) {
            console.warn('Failed to delete local file after upload error:', unlinkError.message);
        }

        return null; // Explicitly return null on failure
    }
    
}

const deleterCloudinaryFile=async function(cloudinaryUrl){
    try{
        const urlParts=cloudinaryUrl.split('/');
        const publicIdWithExtension=urlParts[urlParts.length-1];
        const publicId=publicIdWithExtension.split('.')[0];
        cloudinary.uploader.destroy(publicId,(error,result)=>{
            if(error){
                console.error('Error deleting image:', error);
            } else {
              console.log('Image deleted successfully:', result);
            }
        });
    }catch(error){
        console.error('Error deleting image:', error);
    
    }
}


export {uploadOnCloudinary,deleterCloudinaryFile}