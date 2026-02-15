import { api } from "../config";

export const RideAPI = {
  async rides() {
    const res = await api.get("/users/profile");
    return res.data.data;
  },
};
