"use client";
import BulkUpload from "@/components/forms/BulkUpload";
import PromoCodeForm from "@/components/forms/PromoCodeForm";
import { MyPagination } from "@/components/shared/MyPagination";
import { PromoCodeTable } from "@/components/tables/PromoCodeTable";
import { useGetCouponsQuery } from "@/redux/service/coupon/couponApi";
import { useState } from "react";

const PromoCodePage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useGetCouponsQuery(
    {},
    {
      selectFromResult: ({ data, isLoading }) => ({
        data: data?.data ?? [],
        isLoading,
      }),
    },
  );

  console.log({ data });
  return (
    <div className="p-8">
      <div className="mb-10 space-y-5">
        <PromoCodeTable promos={data?.data} />
        <MyPagination
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalPages={data?.meta?.totalPage}
        />
      </div>
      <div className=" space-y-8">
        <PromoCodeForm />
        <BulkUpload />
      </div>
    </div>
  );
};

export default PromoCodePage;
