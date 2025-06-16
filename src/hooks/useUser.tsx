"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { UserResponse } from "@/types/user-response";
import { User } from "@/types/user";

const API_URL = "https://reqres.in";
const USERS_ENDPOINT = "/api/users?page=";

type Page = number;

export function useUser() {
  const searchParams = useSearchParams();
  const pageFromParams = parseInt(searchParams.get("page") || "1", 10);

  const [page, setPage] = useState<Page>(pageFromParams);

  const queryClient = useQueryClient();

  async function getUsers(page: Page): Promise<UserResponse> {
    const response = await fetch(`${API_URL + USERS_ENDPOINT}${page}`);
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    return response.json();
  }

  const {
    data: users,
    isLoading,
    error,
  } = useQuery<UserResponse>({
    queryKey: ["users", page],
    queryFn: () => getUsers(page),
  });

  const createUser = useMutation({
    mutationFn: async (newUser: User) => {
      // Note from testee: This part would connect to API as a POST request and return the response.
      return newUser;
    },
    onSuccess: (newUser) => {
      queryClient.setQueryData<UserResponse>(["users", page], (oldData) => {
        if (!oldData) return undefined;
        return {
          ...oldData,
          data: [newUser, ...oldData.data],
          total: oldData.total + 1,
          total_pages: Math.ceil((oldData.total + 1) / oldData.per_page),
        };
      });
    },
  });

  const updateUser = useMutation({
    mutationFn: async (updatedUser: User) => {
      // Note from testee: This part would connect to API as a PUT request and return the response.
      return updatedUser;
    },
    onSuccess: (updatedUser) => {
      queryClient.setQueryData<UserResponse>(["users", page], (oldData) => {
        if (!oldData) return undefined;
        const updatedData = oldData.data.map((user) =>
          user.id === updatedUser.id ? updatedUser : user,
        );
        return {
          ...oldData,
          data: updatedData,
        };
      });
    },
  });

  useEffect(() => {
    setPage((prev) => {
      if (prev !== pageFromParams) {
        return pageFromParams;
      }
      return prev;
    });
  }, [pageFromParams]);

  return {
    createUser,
    error,
    isLoading,
    page,
    setPage,
    updateUser,
    users,
  };
}
