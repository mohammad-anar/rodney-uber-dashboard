import { MyPagination } from "@/components/shared/MyPagination";
import { UsersTable } from "@/components/tables/UsersTable";

const UserPage = () => {
  return (
    <div className="p-5">
      <UsersTable />
      <div className="mt-5">
        <MyPagination />
      </div>
    </div>
  );
};

export default UserPage;
