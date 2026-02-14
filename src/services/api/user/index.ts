import { api } from "../config";

export const UserAPI = {
  async profile() {
    const res = await api.get("/users/profile");
    return res.data;
  },
};
