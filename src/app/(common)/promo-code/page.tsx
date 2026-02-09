import BulkUpload from "@/components/forms/BulkUpload";
import PromoCodeForm from "@/components/forms/PromoCodeForm";
import { MyPagination } from "@/components/shared/MyPagination";
import { PromoCodeTable } from "@/components/tables/PromoCodeTable";

const PromoCodePage = () => {
  return (
    <div className="p-8">
      <div className="mb-10 space-y-5">
        <PromoCodeTable />
        <MyPagination />
      </div>
      <div className=" space-y-8">
        <PromoCodeForm />
        <BulkUpload />
      </div>
    </div>
  );
};

export default PromoCodePage;
