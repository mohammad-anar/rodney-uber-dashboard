import { MyPagination } from "@/components/shared/MyPagination";
import { SupportRequestTable } from "@/components/tables/SupportRequestTable";

const SupportPage = () => {
  return (
    <div className="p-5">
      <SupportRequestTable />
      <div className="mt-5">
        <MyPagination />
      </div>
    </div>
  );
};

export default SupportPage;
