"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

type UserContextType = {
  user: string | null;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);

  const value = useMemo(() => {
    return {
      user,
    } as UserContextType;
  }, [user]);

  useEffect(() => {
    // Simulate fetching user data
    const fetchUser = async () => {
      // Replace with actual API call
      const fetchedUser = "John Doe"; // Example user
      setUser(fetchedUser);
    };

    fetchUser();
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return ctx;
};
