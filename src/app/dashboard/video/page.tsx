"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MyPagination } from "@/components/shared/MyPagination";
import { VideoLogsTable } from "@/components/tables/VideoLogsTable";
import { VideoSection } from "../../../components/video/videoSection";
import { useGetVideoCompletionLogsQuery } from "@/redux/service/video/video";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";

const VideoPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
    const debounceQuery = useDebounce(searchTerm, 500);

  const params: any = {
    page: currentPage,
    limit: itemsPerPage,
  };

  if (debounceQuery) {
    params.searchTerm = debounceQuery;
  }
  const { data, isLoading } = useGetVideoCompletionLogsQuery(params, {
    selectFromResult: ({ data, isLoading }) => ({
      data: data?.data ?? [],
      isLoading,
    }),
  });


  return (
    <div>
      <VideoSection />
      <div className="p-5">
        <h3 className="text-3xl font-semibold mb-5">Video completion logs</h3>
        <VideoLogsTable
          videoLogs={data?.data}
          isLoading={isLoading}
          setSearchTerm={setSearchTerm}
        />
        <div className="mt-5 ">
          <MyPagination
            currentPage={currentPage}
            onPageChange={(e) => setCurrentPage(e)}
            totalPages={data?.meta?.totalPage || 1}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
