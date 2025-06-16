import { User } from "@/types/user";
import { UserResponse } from "@/types/user-response";
import axios from "axios";

const BASE_URL = "https://reqres.in";
const LOGIN_ENDPOINT = "/api/login";
const REGISTER_ENDPOINT = "/api/register";
const USERS_ENDPOINT = "/api/users?page=";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "x-api-key": "reqres-free-v1",
  },
});

export async function login(data: { email: string; password: string }): Promise<User> {
  const res = await api.post(LOGIN_ENDPOINT, data);
  return res.data;
}

export async function register(data: { email: string; password: string }): Promise<User> {
  const res = await api.post(REGISTER_ENDPOINT, data);
  return res.data;
}

export async function getUsers(page: number): Promise<UserResponse> {
  const res = await api.get(`${USERS_ENDPOINT}?page=${page}`);
  return res.data;
}
