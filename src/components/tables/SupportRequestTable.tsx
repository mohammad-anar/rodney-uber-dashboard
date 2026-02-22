"use client";

import { useState } from "react";
import { Search } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { MyModal } from "../shared/MyModal";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SupportDetails } from "@/app/dashboard/support/SupportDetails";

/* ================= TYPES ================= */

export enum HelpRequestStatus {
  APPROVED = "Approved",
  REJECTED = "Rejected",
  UNDER_REVIEW = "UnderReview",
}

export interface Support {
  _id: string;
  fullName: string;
  email: string;
  description: string;
  helpAmount: number;
  status: HelpRequestStatus;
  supportingDocument: string[];
  createdAt: string;
  updatedAt: string;
}

interface SupportRequestProps {
  submitRequests?: Support[];
}

interface StatusSelectProps {
  value: "Approved" | "Rejected" | "UnderReview";
  onChange: (value: "Approved" | "Rejected" | "UnderReview") => void;
}

const tableHeaders = ["Name", "Email", "Status", "Submitted At", "Actions"];

export function SupportRequestTable({ submitRequests }: SupportRequestProps) {
  const [open, setOpen] = useState(false);

  const handleStatusChange = (
    id: string,
    status: "Approved" | "Rejected" | "UnderReview",
  ) => {};

  return (
    <div className="space-y-6 rounded-xl">
      {/* Search */}
      <div className="flex items-center gap-3 w-full">
        <div className="flex-1 flex max-w-xl items-center gap-3 px-4 py-2 rounded-lg border bg-white">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="flex-1 bg-transparent text-sm outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              {tableHeaders.map((title) => (
                <TableHead
                  key={title}
                  className="text-center font-semibold text-sm text-gray-700"
                >
                  {title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {submitRequests?.map((request) => (
              <TableRow key={request._id} className="hover:bg-gray-50">
                <TableCell className="text-center">
                  {request.fullName}
                </TableCell>

                <TableCell className="text-center">{request.email}</TableCell>

                <TableCell className="text-center">
                  <StatusSelect
                    value={request.status}
                    onChange={(value) => handleStatusChange(request._id, value)}
                  />
                </TableCell>

                <TableCell className="text-center">
                  {new Date(request.createdAt).toLocaleString()}
                </TableCell>

                <TableCell className="text-center">
                  <Button
                    variant="link"
                    className="text-primary cursor-pointer"
                    onClick={() => setOpen(true)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modal */}
      <MyModal open={open} onOpenChange={setOpen}>
        <SupportDetails />
      </MyModal>
    </div>
  );
}

export function StatusSelect({ value, onChange }: StatusSelectProps) {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-50 text-green-700 border-green-300";
      case "Rejected":
        return "bg-orange-50 text-orange-700 border-orange-300";
      case "UnderReview":
        return "bg-yellow-50 text-yellow-700 border-yellow-300";
      default:
        return "";
    }
  };

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={`w-[140px] ${getStatusStyles(value)}`}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Approved">Approved</SelectItem>
        <SelectItem value="UnderReview">Under Review</SelectItem>
        <SelectItem value="Rejected">Rejected</SelectItem>
      </SelectContent>
    </Select>
  );
}
