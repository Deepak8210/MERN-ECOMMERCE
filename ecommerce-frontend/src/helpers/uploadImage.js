import axios from "axios";

const cloudinary_url = `https://api.cloudinary.com/v1_1/${
  import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
}/image/upload`;

const uploadImage = async (image, onProgress) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "mern-ecommerce");

  try {
    const { data } = await axios.post(cloudinary_url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export default uploadImage;
