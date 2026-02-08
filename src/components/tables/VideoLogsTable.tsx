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
import { Search } from "lucide-react";

interface VideoLogs {
  id: string;
  email: string;
  watchDuration: string;
  videoDuration: string;
  status: "Completed" | "Not Completed";
}

interface VideoLogsTableProps {
  videoLogs?: VideoLogs[];
}

const tableHeaders = ["Email", "Watch Duration", "Video Duration", "Status"];

const defaultLogs: VideoLogs[] = [
  {
    id: "1",
    email: "user1@example.com",
    watchDuration: "05:30",
    videoDuration: "05:30",
    status: "Completed",
  },
  {
    id: "2",
    email: "user2@example.com",
    watchDuration: "02:15",
    videoDuration: "05:00",
    status: "Not Completed",
  },
  {
    id: "3",
    email: "user3@example.com",
    watchDuration: "05:00",
    videoDuration: "05:00",
    status: "Completed",
  },
  {
    id: "4",
    email: "user4@example.com",
    watchDuration: "03:45",
    videoDuration: "06:00",
    status: "Not Completed",
  },
  {
    id: "5",
    email: "user5@example.com",
    watchDuration: "07:00",
    videoDuration: "07:00",
    status: "Completed",
  },
  {
    id: "6",
    email: "user6@example.com",
    watchDuration: "04:20",
    videoDuration: "05:00",
    status: "Not Completed",
  },
  {
    id: "7",
    email: "user7@example.com",
    watchDuration: "10:00",
    videoDuration: "10:00",
    status: "Completed",
  },
  {
    id: "8",
    email: "user8@example.com",
    watchDuration: "06:30",
    videoDuration: "07:00",
    status: "Not Completed",
  },
  {
    id: "9",
    email: "user9@example.com",
    watchDuration: "08:00",
    videoDuration: "08:00",
    status: "Completed",
  },
  {
    id: "10",
    email: "user10@example.com",
    watchDuration: "01:50",
    videoDuration: "05:00",
    status: "Not Completed",
  },
];

export function VideoLogsTable({
  videoLogs = defaultLogs,
}: VideoLogsTableProps) {
  return (
    <div className="space-y-6 rounded-xl">
      <div className="flex items-center gap-3 w-full">
        <div className="flex-1 flex max-w-xl items-center gap-3 px-4 py-2 rounded-lg border border-gray-200 bg-white">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
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

          <TableBody>
            {videoLogs?.map((log: VideoLogs) => (
              <TableRow
                key={log.id}
                className="border-b last:border-b-0 hover:bg-gray-50"
              >
                <TableCell className="px-4 py-3">{log.email}</TableCell>
                <TableCell className="px-4 py-3 text-gray-700 text-center">
                  {log.watchDuration}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-700 text-center">
                  {log.videoDuration}
                </TableCell>

                <TableCell className="px-4 py-3 text-center">
                  <Badge
                    className={
                      log.status === "Completed"
                        ? "bg-green-50 text-green-600 border-green-300"
                        : "bg-orange-50 text-orange-600 border-orange-200"
                    }
                    variant="outline"
                  >
                    {log.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
