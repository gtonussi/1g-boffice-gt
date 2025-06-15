"use client";

import { useUser } from "@/hooks/useUser";

export default function Home() {
  const { users, isLoading: isLoadingUsers } = useUser();

  return (
    <div className="flex justify-center">
      <div className="max-w-5xl">
        {isLoadingUsers ? (
          <>
            <p className="text-center text-gray-500">Loading users...</p>
          </>
        ) : (
          <>
            {users && users.data.length > 0
              ? users.data.map((user) => {
                  return <p key={user.id}>{user.email}</p>;
                })
              : null}
          </>
        )}
      </div>
    </div>
  );
}
