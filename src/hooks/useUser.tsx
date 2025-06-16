"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { UserResponse } from "@/types/user-response";
import { User } from "@/types/user";
import { getUsers } from "@/lib/api";

type Page = number;

export function useUser() {
  const searchParams = useSearchParams();
  const pageFromParams = parseInt(searchParams.get("page") || "1", 10);

  const [page, setPage] = useState<Page>(pageFromParams);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const queryClient = useQueryClient();

  const {
    data: users,
    isLoading,
    error,
  } = useQuery<UserResponse>({
    queryKey: ["users", page],
    queryFn: () => getUsers(page),
  });

  // Persistance would occur here. In a real application, the post request would change the backend state.
  const createUser = useMutation({
    mutationFn: async (newUser: User) => {
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
    selectedUser,
    setSelectedUser,
  };
}
