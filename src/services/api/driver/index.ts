import { api } from "../config";

export const DriverAPI = {
  async completeProfile(payload) {
    const res = await api.post("/onboard", payload);
  },
};
