import axios from "axios";

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

class CloudinaryService {
  async upload(image) {
    if (!cloudName || !uploadPreset) {
      throw new Error(
        "Missing Cloudinary configuration. Copy .env.example to .env and fill in the Cloudinary values."
      );
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", uploadPreset);

    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const response = await axios.post(uploadUrl, formData);
    return response.data.secure_url;
  }
}

export default new CloudinaryService();
