"use client";

import { ThemeToggle } from "@/components/ui/theme-toggle";
import { UsersTable } from "@/components/ui/users-table";

export default function Home() {
  return (
    <div className="flex justify-center">
      <div className="mt-4 max-w-5xl">
        <div className="flex justify-end">
          <ThemeToggle />
        </div>
        <div className="mt-8">
          <UsersTable />
        </div>
      </div>
    </div>
  );
}
