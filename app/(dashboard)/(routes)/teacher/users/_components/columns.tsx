"use client"

import { User } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react"
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type UserColumn = Omit<User, "password">;

export const columns: ColumnDef<UserColumn>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Name
          {column.getIsSorted() === "asc" ? <ArrowUpDown className="h-4 w-4 ml-2" /> : null}
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Email
          {column.getIsSorted() === "asc" ? <ArrowUpDown className="h-4 w-4 ml-2" /> : null}
        </Button>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Role
          {column.getIsSorted() === "asc" ? <ArrowUpDown className="h-4 w-4 ml-2" /> : null}
        </Button>
      );
    },
    cell: ({ row }) => {
      const role = row.getValue("role") as string;
      return (
        <Badge 
          className={cn(
            "font-semibold",
            role === "ADMIN" && "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
            role === "TEACHER" && "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
            role === "STUDENT" && "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
          )}
        >
          {role}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id } = row.original;
      return (
        (<DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Link href={`/teacher/users/${id}`} legacyBehavior>
              <DropdownMenuItem>
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>)
      );
    },
  },
];