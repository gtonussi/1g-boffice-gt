"use client";

import { useQuery } from "@tanstack/react-query";

import { UserResponse } from "@/types/user-response";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getUsers(): Promise<UserResponse> {
  if (!API_URL) throw new Error("API_URL is not defined");

  const response = await fetch(`${API_URL}/users`);

  if (!response.ok) throw new Error("Failed to fetch users");

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
