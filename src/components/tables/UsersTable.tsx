"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IconBan, IconEye, IconTrash } from "@tabler/icons-react";
import { Loader, Loader2, Search } from "lucide-react";
import { useState } from "react";
import { MyModal } from "../shared/MyModal";
import { useGetAllUsersQuery } from "@/redux/service/user/userApi";
import UserDetailsCard from "../cards/UserDetailsCard";
import { IUser } from "@/type/type";

interface UsersTableProps {
  users?: IUser[];
  isLoading: boolean;
  setSearchTerm: (val: string) => void;
}

const tableHeaders = ["id", "Name", "Email", "Status", "Actions"];

export function UsersTable({
  users,
  isLoading,
  setSearchTerm,
}: UsersTableProps) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  console.log(user);

  const handleDelete = (id: string) => {
    console.log({ id });
  };
  const handleSuspend = (id: string) => {
    console.log({ id });
  };
  return (
    <div className="space-y-6 rounded-xl">
      <div className="flex items-center gap-3 w-full">
        <div className="flex-1 flex max-w-xl items-center gap-3 px-4 py-2 rounded-lg border border-gray-200 bg-white">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none text-gray-700 placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-200">
              {tableHeaders.map((title, idx) => (
                <TableHead
                  key={title}
                  className={`text-gray-700 uppercase font-semibold text-sm px-4 py-3 ${idx === 0 ? "text-left" : "text-center"}`}
                >
                  {title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          {isLoading ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6">
                  <Loader className="animate-spin mx-auto" />
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {users?.map((user) => (
                <TableRow
                  key={user._id}
                  className="border-b last:border-b-0 hover:bg-gray-50"
                >
                  <TableCell className="px-4 py-3">{user.name}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-700 text-center">
                    {user.name}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-700 text-center">
                    {user.email}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-center">
                    <Badge
                      className={
                        user.status === "ACTIVE"
                          ? "bg-green-50 text-green-700 border-green-300"
                          : "bg-orange-50 text-orange-700 border-orange-200"
                      }
                      variant="outline"
                    >
                      {user.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-5">
                      <div
                        className="bg-transparent cursor-pointer hover:bg-gray-300 p-2 duration-300 rounded-full"
                        onClick={() => {
                          setOpen(!open);
                          setUser(user);
                        }}
                      >
                        <IconEye color="blue" size={25} />
                      </div>
                      <div
                        className="bg-transparent cursor-pointer hover:bg-gray-300 p-2 duration-300 rounded-full"
                        onClick={() => handleSuspend(user._id)}
                      >
                        <IconBan color="red" size={16} />
                      </div>
                      <div
                        className="bg-transparent cursor-pointer hover:bg-gray-300 p-2 duration-300 rounded-full"
                        onClick={() => handleDelete(user._id)}
                      >
                        <IconTrash color="red" size={16} />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </div>
      <MyModal open={open} onOpenChange={(val: boolean) => setOpen(val)}>
        <UserDetailsCard user={user as IUser} />
      </MyModal>
    </div>
  );
}
