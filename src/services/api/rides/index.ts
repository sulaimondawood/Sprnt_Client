import { api } from "../config";

export const RideAPI = {
  async rides() {
    const res = await api.get("/users/profile");
    return res.data.data;
  },

  async tripDetails(id: string) {
    const res = await api.get("/rides/" + id);
    return res.data.data;
  },
};
