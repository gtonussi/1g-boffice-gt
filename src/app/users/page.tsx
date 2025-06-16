"use client";
import { Suspense } from "react";

import { UsersTable } from "@/components/ui/users-table";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UsersTable />
    </Suspense>
  );
}
