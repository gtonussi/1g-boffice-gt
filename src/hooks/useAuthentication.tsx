"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import * as api from "@/lib/api";

export function useAuthentication() {
  const router = useRouter();

  const login = useMutation({
    mutationFn: api.login,
    onSuccess: ({ token }) => {
      setCookie("token", token);
      router.push("/users");
    },
  });

  const register = useMutation({
    mutationFn: api.register,
    onSuccess: ({ token }) => {
      setCookie("token", token);
      router.push("/users");
    },
  });

  return {
    login,
    register,
  };
}
