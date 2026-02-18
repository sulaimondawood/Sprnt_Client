import { api } from "../config";

export const RiderAPI = {
  async recentRides() {
    const res = await api.get("/riders/rides/recent");
    return res.data.data;
  },
};
