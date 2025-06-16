import { TokenResponse } from "@/types/token-response";
import { UserResponse } from "@/types/user-response";
import axios from "axios";

//const BASE_URL = "https://reqres.in";
const BASE_URL = "";
const LOGIN_ENDPOINT = "/api/login";
const REGISTER_ENDPOINT = "/api/register";
const USERS_ENDPOINT = "/api/users?page=";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "x-api-key": "reqres-free-v1",
  },
});

function getTokenFromCookie(): string | null {
  if (typeof window === "undefined") return null;
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name === "token") {
      return decodeURIComponent(value);
    }
  }
  return null;
}

api.interceptors.request.use((config) => {
  const token = getTokenFromCookie();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function login(data: { email: string; password: string }): Promise<TokenResponse> {
  const res = await api.post(LOGIN_ENDPOINT, data);
  return res.data;
}

export async function register(data: { email: string; password: string }): Promise<TokenResponse> {
  const res = await api.post(REGISTER_ENDPOINT, data);
  return res.data;
}

export async function getUsers(page: number): Promise<UserResponse> {
  const res = await api.get(`${USERS_ENDPOINT}${page}`);
  return res.data;
}
