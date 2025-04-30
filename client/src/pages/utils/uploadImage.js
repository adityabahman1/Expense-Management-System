// utils/uploadImage.js
import axiosInstance from './axiosInstance';
import { API_PATHS } from './apiPath';

const uploadImage = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error;
  }
};

export default uploadImage;
