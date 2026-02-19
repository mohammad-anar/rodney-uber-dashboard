/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import UserStatsCard from "@/components/cards/UserStatsCard";
import { MyPagination } from "@/components/shared/MyPagination";
import { UsersTable } from "@/components/tables/UsersTable";
import {
  useGetAllUsersQuery,
  useGetUsersStatsQuery,
} from "@/redux/service/user/userApi";
import { Users, UserCheck, UserX, UserMinus } from "lucide-react";
import { useState } from "react";

const UserPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const params: any = {
    page: currentPage,
    limit: itemsPerPage,
  };

  if (searchTerm) {
    params.searchTerm = searchTerm;
  }

  // api
  const { data, isLoading } = useGetAllUsersQuery(params, {
    selectFromResult: ({ data, isLoading }) => ({
      data: data?.data ?? [],
      isLoading,
    }),
  });
  const { data: stats, isLoading: statsLoading } = useGetUsersStatsQuery(
    undefined,
    {
      selectFromResult: ({ data, isLoading }) => ({
        data: data?.data ?? [], // your formatted array from backend
        isLoading,
      }),
    },
  );

  const totalPage = data?.meta?.totalPage || 1;

  const metrics = [
    {
      label: "Total Users",
      value: stats.total.toLocaleString(), // 2,847
      icon: Users,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      label: "Active Users",
      value: stats.active.toLocaleString(),
      icon: UserCheck,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      label: "Blocked Users",
      value: stats.blocked.toLocaleString(),
      icon: UserMinus,
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      label: "Deleted Users",
      value: stats.deleted.toLocaleString(),
      icon: UserX,
      bgColor: "bg-red-100",
      iconColor: "text-red-600",
    },
  ];

  return (
    <div className="p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {metrics.map((metric, index) => (
          <UserStatsCard key={index} metric={metric} />
        ))}
      </div>
      <UsersTable
        setSearchTerm={setSearchTerm}
        isLoading={isLoading}
        users={data?.data || []}
      />
      {totalPage > 1 && (
        <div className="mt-5">
          <MyPagination
            currentPage={currentPage}
            onPageChange={(e) => setCurrentPage(e)}
            totalPages={totalPage}
          />
        </div>
      )}
    </div>
  );
};

export default UserPage;
