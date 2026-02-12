import axios from "axios";
import { api, request } from "../config";

type RegisterPayload = {
  email: string;
  fullname: string;
  password: string;
};

export const AuthAPI = {
  async register(payload: RegisterPayload) {
    const res = await request.post("/sign-up/driver");
    return res.data;
  },
};
