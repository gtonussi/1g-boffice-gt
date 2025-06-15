"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { UserResponse } from "@/types/user-response";

const API_URL = "https://reqres.in";
const USERS_ENDPOINT = "/api/users?page=";

type Page = number;

export function useUser() {
  const searchParams = useSearchParams();
  const pageFromParams = parseInt(searchParams.get("page") || "1", 10);

  const [page, setPage] = useState<Page>(pageFromParams);

  const {
    data: users,
    isLoading,
    error,
  } = useQuery<UserResponse>({
    queryKey: ["users", page],
    queryFn: () => getUsers(page),
  });

  async function getUsers(page: Page): Promise<UserResponse> {
    const response = await fetch(`${API_URL + USERS_ENDPOINT}${page}`);

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    return response.json();
  }

  useEffect(() => {
    setPage((prev) => {
      if (prev !== pageFromParams) {
        return pageFromParams;
      }
      return prev;
    });
  }, [pageFromParams]);

  return {
    error,
    isLoading,
    page,
    setPage,
    users,
  };
}
