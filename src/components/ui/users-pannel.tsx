"use client";

import { ColumnDef } from "@tanstack/react-table";

import { useUser } from "@/hooks/useUser";
import type { User } from "@/types/user";

import { DataTable } from "./data-table";

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "avatar",
    header: "Avatar",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "first_name",
    header: "First Name",
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
  },
];

export function UsersPannel() {
  const { users, isLoading } = useUser();
  const data = users?.data || [];

  return (
    <div data-name="users-pannel">
      {isLoading ? (
        <div className="flex h-24 items-center justify-center">
          <span>Loading...</span>
        </div>
      ) : (
        <DataTable columns={columns} data={data} />
      )}
    </div>
  );
}
