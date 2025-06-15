"use client";

import { UsersTable } from "@/components/ui/users-table";

export default function Home() {
  return (
    <div className="flex justify-center">
      <div className="max-w-5xl">
        <UsersTable />
      </div>
    </div>
  );
}
