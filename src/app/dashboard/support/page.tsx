"use client";
import { MyPagination } from "@/components/shared/MyPagination";
import { SupportRequestTable } from "@/components/tables/SupportRequestTable";
import { useGetSupportRequestsQuery } from "@/redux/service/support/support";

const SupportPage = () => {
  const { data, isLoading } = useGetSupportRequestsQuery(
    {},
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
      <SupportRequestTable submitRequests={data} />
      <div className="mt-5">
        <MyPagination />
      </div>
    </div>
  );
};

export default SupportPage;
