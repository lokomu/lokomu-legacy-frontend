import { Auth, LoginRequest, RegisterRequest } from "@/types/entities";
import axios from "axios";

const API_URL = import.meta.env.VITE_BASEURL;

export async function login(loginRequest: LoginRequest): Promise<Auth> {
  const auth: Auth = { isLoggedIn: false, authResponse: null };

  try {
    const response = await axios.post(API_URL + "auth/login", loginRequest);
    if (response.status === 200) {
      auth.isLoggedIn = true;
      auth.authResponse = response.data;
    }
  } catch (error) {
    auth.isLoggedIn = false;
  }
  return auth;
}

export async function registerUser(userInfo: RegisterRequest) {
  try {
    return await axios.post(API_URL + "auth/signup", userInfo);
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
  }
}
