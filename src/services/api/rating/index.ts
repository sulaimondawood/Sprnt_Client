import { api } from "../config";

export interface RatingPost {
  rating: number;
  comment: string;

  rideId: string;
}

export const RatingAPI = {
  async getRatings() {
    const res = await api.get("/ratings/driver");
    return res.data.data;
  },

  async rate(payload: RatingPost) {
    const res = await api.post("/ratings", payload);
    return res.data.data;
  },
};
