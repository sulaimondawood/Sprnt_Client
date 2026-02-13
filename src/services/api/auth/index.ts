import axios from "axios";
import { api, request } from "../config";

export type RegisterPayload = {
  email: string;
  fullname: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export const AuthAPI = {
  async register(payload: RegisterPayload) {
    const res = await request.post("/auth/sign-up/rider", payload);
    return res.data;
  },
  async login(payload: LoginPayload) {
    const res = await request.post("/auth/login", payload);
    return res.data;
  },
};
