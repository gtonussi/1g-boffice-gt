"use client";

import { ColumnDef } from "@tanstack/react-table";

import { useUser } from "@/hooks/useUser";
import type { User } from "@/types/user";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { DataTable } from "./data-table";
import { UserForm } from "../forms/user-form";

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "avatar",
    header: "Avatar",
    cell: ({ row }) => {
      return (
        <Avatar>
          <AvatarImage src={row.original.avatar} alt="User Avatar" />
        </Avatar>
      );
    },
  },
  {
    accessorKey: "first_name",
    header: "First Name",
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
];

export function UsersTable() {
  const { users, isLoading, page } = useUser();

  const data = users?.data || [];

  const totalPages = users?.total_pages || 1;
  const isFirstPage = page <= 1;
  const isLastPage = page >= totalPages;

  return (
    <div data-name="users-table">
      <div>
        <UserForm />
      </div>
      <div className="mt-4">
        {isLoading ? (
          <div className="flex h-24 items-center justify-center">
            <span>Loading...</span>
          </div>
        ) : (
          <>
            <DataTable columns={columns} data={data} />

            <div className="mt-4 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      disabled={isFirstPage}
                      href={isFirstPage ? "" : `?page=${page - 1}`}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href={`?page=${page}`}>{page}</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      disabled={isLastPage}
                      href={isLastPage ? "" : `?page=${page + 1}`}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
