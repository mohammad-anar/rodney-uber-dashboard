/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import BulkUpload from "@/components/forms/BulkUpload";
import PromoCodeForm from "@/components/forms/PromoCodeForm";
import { MyPagination } from "@/components/shared/MyPagination";
import { PromoCodeTable } from "@/components/tables/PromoCodeTable";
import { useGetCouponsQuery } from "@/redux/service/coupon/couponApi";
import { COUPON_TYPE } from "@/type/type";
import { useState } from "react";

const PromoCodePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [status, setStatus] = useState<COUPON_TYPE | null>(null);
  const [isActive, setIsActive] = useState<boolean | null>(null);

  const params: any = {
    page: currentPage,
    limit: itemsPerPage,
  };

  if (status) {
    params.source = status;
  }
  if (isActive !== null) {
    if (isActive === false) {
      params.isActive = false;
    } else {
      params.isActive = true;
    }
  }

  const { data, isLoading } = useGetCouponsQuery(params, {
    selectFromResult: ({ data, isLoading }) => ({
      data: data?.data ?? [],
      isLoading,
    }),
  });

  console.log({ data });
  return (
    <div className="p-8">
      <div className="mb-10 space-y-5">
        <PromoCodeTable promos={data?.data} setStatus={setStatus} setIsActive={setIsActive} />
        {data?.data?.length > 1 && (
          <MyPagination
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalPages={data?.meta?.totalPage}
          />
        )}
      </div>
      <div className=" space-y-8">
        <PromoCodeForm />
        {/* <BulkUpload /> */}
      </div>
    </div>
  );
};

export default PromoCodePage;
