import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

const uploadToCloudinary = async (filepath) => {
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_SECRET
    });
    try {
        if(!filepath){
            return null;
        }
    // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(filepath);
      fs.unlinkSync(filepath);
      return uploadResult.secure_url;
       
    } catch (error) {
      fs.unlinkSync(filepath);
      console.log("Cloudinary Error : ",error);
    }
}

export default uploadToCloudinary;