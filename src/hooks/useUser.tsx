"use client";

import { useQuery } from "@tanstack/react-query";

import { UserResponse } from "@/types/user-response";

const API_URL = "https://reqres.in";
const USERS_ENDPOINT = "/api/users?page=";

export async function getUsers(): Promise<UserResponse> {
  const response = await fetch(`${API_URL + USERS_ENDPOINT}1`);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
}

export function useUser() {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery<UserResponse>({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return {
    users,
    isLoading,
    error,
  };
}
