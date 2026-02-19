import { CreateRideRequest } from "@/types/riders";
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

  async createRideRequest(payload: CreateRideRequest) {
    const res = await api.post("/riders/create-ride-request", payload);
    return res.data.data;
  },
};
