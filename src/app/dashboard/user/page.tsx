/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import UserStatsCard from "@/components/cards/UserStatsCard";
import { MyPagination } from "@/components/shared/MyPagination";
import { UsersTable } from "@/components/tables/UsersTable";
import { useGetAllUsersQuery } from "@/redux/service/user/userApi";
import { Play, Shield, Ticket, Users } from "lucide-react";
import { useEffect, useState } from "react";

const UserPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const metrics = [
    {
      label: "Total Users",
      value: "2,847",
      icon: Users,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      label: "Completed Videos",
      value: "1,924",
      icon: Play,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      label: "Promo Codes Used",
      value: "1,156",
      icon: Ticket,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      label: "Blocked Users",
      value: "23",
      icon: Shield,
      bgColor: "bg-red-100",
      iconColor: "text-red-600",
    },
  ];

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

  const totalPage = data?.meta?.totalPage || 1;

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
      <div className="mt-5">
        <MyPagination
          currentPage={currentPage}
          onPageChange={(e) => setCurrentPage(e)}
          totalPages={totalPage}
        />
      </div>
    </div>
  );
};

export default UserPage;
