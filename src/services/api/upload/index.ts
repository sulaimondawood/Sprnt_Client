import axios from "axios";
import { api } from "../config";

export const UploadAPI = {
  async uploadFile(payload: FormData) {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dbu0whbs4/auto/upload?folder=sprnt",
      payload,
    );

    return res.data;
  },

  async getUploadSignature() {
    const res = await api.get("/uploads/signature");
    return res.data.data;
  },
};
