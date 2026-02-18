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
import { Search } from "lucide-react";
import { useState } from "react";
import { MyModal } from "../shared/MyModal";
import { useGetAllUsersQuery } from "@/redux/service/user/userApi";

interface User {
  id: string;
  name: string;
  email: string;
  status: "Active" | "Blocked";
}

interface UsersTableProps {
  users?: User[];
}

const tableHeaders = ["id", "Name", "Email", "Status", "Actions"];

const defaultUsers: User[] = [
  { id: "1", name: "John Doe", email: "john@gmail.com", status: "Active" },
  { id: "2", name: "Sarah Smith", email: "sarah@gmail.com", status: "Active" },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael@gmail.com",
    status: "Blocked",
  },
  {
    id: "4",
    name: "Emily Johnson",
    email: "emily@gmail.com",
    status: "Active",
  },
  { id: "5", name: "David Wilson", email: "david@gmail.com", status: "Active" },
  {
    id: "6",
    name: "Olivia Martinez",
    email: "olivia@gmail.com",
    status: "Blocked",
  },
  {
    id: "7",
    name: "Daniel Anderson",
    email: "daniel@gmail.com",
    status: "Active",
  },
  {
    id: "8",
    name: "Sophia Taylor",
    email: "sophia@gmail.com",
    status: "Active",
  },
  {
    id: "9",
    name: "James Thomas",
    email: "james@gmail.com",
    status: "Blocked",
  },
  {
    id: "10",
    name: "Isabella Moore",
    email: "isabella@gmail.com",
    status: "Active",
  },
  {
    id: "11",
    name: "Benjamin Jackson",
    email: "ben@gmail.com",
    status: "Active",
  },
  { id: "12", name: "Mia White", email: "mia@gmail.com", status: "Blocked" },
  {
    id: "13",
    name: "Lucas Harris",
    email: "lucas@gmail.com",
    status: "Active",
  },
  {
    id: "14",
    name: "Amelia Martin",
    email: "amelia@gmail.com",
    status: "Active",
  },
  {
    id: "15",
    name: "Henry Thompson",
    email: "henry@gmail.com",
    status: "Blocked",
  },
  {
    id: "16",
    name: "Charlotte Garcia",
    email: "charlotte@gmail.com",
    status: "Active",
  },
  {
    id: "17",
    name: "Alexander Martinez",
    email: "alex@gmail.com",
    status: "Active",
  },
  {
    id: "18",
    name: "Evelyn Robinson",
    email: "evelyn@gmail.com",
    status: "Blocked",
  },
  {
    id: "19",
    name: "William Clark",
    email: "william@gmail.com",
    status: "Active",
  },
  {
    id: "20",
    name: "Harper Lewis",
    email: "harper@gmail.com",
    status: "Active",
  },
];

export function UsersTable({ users = defaultUsers }: UsersTableProps) {
  const [open, setOpen] = useState(false);

  // api
  const { data, isLoading } = useGetAllUsersQuery({});
  console.log(isLoading, "users");

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

          <TableBody>
            {users?.map((user) => (
              <TableRow
                key={user.id}
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
                      user.status === "Active"
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
                      onClick={() => setOpen(!open)}
                    >
                      <IconEye color="blue" size={25} />
                    </div>
                    <div
                      className="bg-transparent cursor-pointer hover:bg-gray-300 p-2 duration-300 rounded-full"
                      onClick={() => handleSuspend(user.id)}
                    >
                      <IconBan color="red" size={16} />
                    </div>
                    <div
                      className="bg-transparent cursor-pointer hover:bg-gray-300 p-2 duration-300 rounded-full"
                      onClick={() => handleDelete(user.id)}
                    >
                      <IconTrash color="red" size={16} />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <MyModal open={open} onOpenChange={(val: boolean) => setOpen(val)}>
        <h2>User</h2>
      </MyModal>
    </div>
  );
}
