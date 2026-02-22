"use client";
import { MyPagination } from "@/components/shared/MyPagination";
import { SupportRequestTable } from "@/components/tables/SupportRequestTable";
import { useGetSupportRequestsQuery } from "@/redux/service/support/support";
import { useState } from "react";

const SupportPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { data, isLoading } = useGetSupportRequestsQuery(
    { page: currentPage, limit: itemsPerPage },
    {
      selectFromResult: ({ data, isLoading }) => ({
        data: data?.data ?? [],
        isLoading,
      }),
    },
  );
  console.log(data);
  return (
    <div className="p-5">
      <SupportRequestTable submitRequests={data?.data} />
      <div className="mt-5">
        <MyPagination
          currentPage={currentPage}
          onPageChange={(e) => setCurrentPage(e)}
          totalPages={data?.meta?.totalPage}
        />
      </div>
    </div>
  );
};

export default SupportPage;
