import { MyPagination } from "@/components/shared/MyPagination";
import { VideoLogsTable } from "@/components/tables/VideoLogsTable";
import { VideoSection } from "./videoSection";

const VideoPage = () => {
  return (
    <div>
      <VideoSection />
      <div className="p-5">
        <h3 className="text-3xl font-semibold mb-5">Video completion logs</h3>
        <VideoLogsTable />
        <div className="mt-5 ">
          <MyPagination />
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
