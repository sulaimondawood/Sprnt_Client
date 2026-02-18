import { api } from "../config";

export const RiderAPI = {
  async recentRides() {
    const res = await api.get("/riders/rides/recent");
    return res.data.data;
  },

  async currentRide() {
    const res = await api.get("/riders/rides/current");
    return res.data.data;
  },
};
