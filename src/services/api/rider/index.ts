import { CreateRideRequest } from "@/types/riders";
import { api } from "../config";
import { TripParams } from "../driver";

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

  async allRides(params: TripParams) {
    const res = await api.get("/riders/rides", {
      params,
    });
    return res.data.data;
  },

  async ridesOverview() {
    const res = await api.get("/riders/rides/overview");
    return res.data.data;
  },
};
