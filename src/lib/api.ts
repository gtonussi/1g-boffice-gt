import axios from "axios";

const BASE_URL = "https://reqres.in/api";
const LOGIN_ENDPOINT = "/api/login";
const REGISTER_ENDPOINT = "/api/register";

export const api = axios.create({
  baseURL: BASE_URL,
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
  config.headers["x-api-key"] = "reqres-free-v1";
  const token = getTokenFromCookie();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function login(data: { email: string; password: string }) {
  const res = await api.post(LOGIN_ENDPOINT, data);
  return res.data;
}

export async function register(data: { email: string; password: string }) {
  const res = await api.post(REGISTER_ENDPOINT, data);
  return res.data;
}
