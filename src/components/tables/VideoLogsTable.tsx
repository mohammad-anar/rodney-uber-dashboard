/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Loader, Search } from "lucide-react";

interface VideoLogs {
  id: string;
  email: string;
  coupon: any;
  video: any;
  createdAt: string;
  updatedAt: string;
}

interface VideoLogsTableProps {
  videoLogs: VideoLogs[];
  isLoading: boolean;
  setSearchTerm: (val: string) => void;
}

const tableHeaders = ["Email", "Coupon", "Source", "Status"];

export function VideoLogsTable({
  videoLogs,
  isLoading,
  setSearchTerm,
}: VideoLogsTableProps) {
  console.log({ videoLogs });
  return (
    <div className="space-y-6 rounded-xl">
      <div className="flex items-center gap-3 w-full">
        <div className="flex-1 flex max-w-xl items-center gap-3 px-4 py-2 rounded-lg border border-gray-200 bg-white">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search email..."
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
              <TableRow className="border-b last:border-b-0 hover:bg-gray-50">
                <TableCell colSpan={3} className="px-4 py-3">
                  <div className="flex items-center justify-center">
                    <Loader className="animate-spin" />
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {videoLogs?.map((log: VideoLogs) => (
                <TableRow
                  key={log.id.concat(new Date().toLocaleDateString())}
                  className="border-b last:border-b-0 hover:bg-gray-50"
                >
                  <TableCell className="px-4 py-3">{log.email}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-700 text-center">
                    {log?.coupon?.promoCode || "Didn't get"}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-700 text-center">
                    {log?.coupon?.source || "Uber"}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-center">
                    <Badge
                      className={
                        "Completed" === "Completed"
                          ? "bg-green-50 text-green-600 border-green-300"
                          : "bg-orange-50 text-orange-600 border-orange-200"
                      }
                      variant="outline"
                    >
                      Completed
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </div>
    </div>
  );
}
