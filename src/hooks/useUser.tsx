"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import { UserResponse } from "@/types/user-response";
import { User } from "@/types/user";
import { getUsers } from "@/lib/api";

type Page = number;

export function useUser() {
  const searchParams = useSearchParams();
  const pageFromParams = parseInt(searchParams.get("page") || "1", 10);

  const [page, setPage] = useState<Page>(pageFromParams);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Those refs are used to persist mutations in memory
  const createdUsersRef = useRef<User[]>([]);
  const updatedUsersRef = useRef<Map<number, User>>(new Map());

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
      return { ...newUser, id: Math.ceil(Math.random() * 1000) }; // Simulating a new user creation
    },
    onSuccess: (newUser) => {
      createdUsersRef.current.unshift(newUser);
    },
  });

  const updateUser = useMutation({
    mutationFn: async (updatedUser: User) => {
      return updatedUser;
    },
    onSuccess: (updatedUser) => {
      updatedUsersRef.current.set(updatedUser.id, updatedUser);
    },
  });

  const mergedUsers = useMemo(() => {
    if (!users) return undefined;

    // Apply updates
    const updatedApiUsers = users.data.map((user) =>
      updatedUsersRef.current.has(user.id) ? updatedUsersRef.current.get(user.id)! : user,
    );

    return {
      ...users,
      data: [...createdUsersRef.current, ...updatedApiUsers],
    };
  }, [users]);

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
    users: mergedUsers,
    selectedUser,
    setSelectedUser,
  };
}
