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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Promo {
  promoCode: string;
  source: string;
  status: "Active" | "Inactive" | "Expired";
  email: string;
}

interface PromoTableProps {
  promos?: Promo[];
}

const tableHeaders = ["Promo Code", "Source", "Status", "Email", "Actions"];

const defaultPromos: Promo[] = [
  {
    promoCode: "UBR9XK21A",
    source: "Uber",
    status: "Active",
    email: "john@gmail.com",
  },
  {
    promoCode: "LYF7QZ88P",
    source: "Lyft",
    status: "Expired",
    email: "sarah.khan@gmail.com",
  },
  {
    promoCode: "UBR3MNA92",
    source: "Uber",
    status: "Active",
    email: "rahim.ahmed@gmail.com",
  },
  {
    promoCode: "LYF8TR44K",
    source: "Lyft",
    status: "Inactive",
    email: "maria.silva@gmail.com",
  },
  {
    promoCode: "UBR5XP77C",
    source: "Uber",
    status: "Active",
    email: "alex.choi@gmail.com",
  },
];

export function PromoCodeTable({ promos = defaultPromos }: PromoTableProps) {
  const [open, setOpen] = useState(false);
  const handleDelete = (id: string) => {
    console.log({ id });
  };

  return (
    <div className="space-y-6 rounded-xl">
      <div className="flex items-center justify-between gap-3 w-full">
        <h3 className="text-xl font-bold">Promo codes</h3>

        <div className="flex items-center gap-5">
          <Select
            defaultValue={"All Status"}
            onValueChange={(value) => {
              // handle status change here
              console.log("New status:", value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value={"All Status"}>All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Expired">Expired</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Select
            defaultValue={"All Source"}
            onValueChange={(value) => {
              // handle status change here
              console.log("New status:", value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Source" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value={"All Source"}>All Status</SelectItem>
              <SelectItem value="Uber">Active</SelectItem>
              <SelectItem value="Lyft">Expired</SelectItem>
            </SelectContent>
          </Select>
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
            {promos?.map((promo) => (
              <TableRow
                key={promo.promoCode}
                className="border-b last:border-b-0 hover:bg-gray-50"
              >
                <TableCell className="px-4 py-3">{promo.promoCode}</TableCell>
                <TableCell className="px-4 py-3">{promo.source}</TableCell>

                <TableCell className="px-4 py-3 text-gray-700 text-center">
                  {promo.email}
                </TableCell>

                <TableCell className="px-4 py-3 text-center">
                  <Select
                    defaultValue={promo.status}
                    onValueChange={(value) => {
                      // handle status change here
                      console.log("New status:", value);
                    }}
                  >
                    <SelectTrigger
                      className={`w-[120px] border ${
                        promo.status === "Active"
                          ? "bg-green-50 text-green-700 border-green-300"
                          : promo.status === "Expired"
                            ? "bg-orange-50 text-orange-700 border-orange-300"
                            : "bg-gray-50 text-gray-700 border-gray-300"
                      }`}
                    >
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Expired">Expired</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>

                <TableCell className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-5">
                    <div
                      className="bg-transparent cursor-pointer hover:bg-gray-300 p-2 duration-300 rounded-full"
                      onClick={() => handleDelete(promo.promoCode)}
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
