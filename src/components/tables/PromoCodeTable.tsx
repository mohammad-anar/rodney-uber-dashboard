"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash } from "lucide-react";
import { useState } from "react";
import { ReusableDialogue } from "../dialogue/ResuableDialogue";
import { MyModal } from "../shared/MyModal";
import { useDeleteCouponMutation } from "@/redux/service/coupon/couponApi";
import { toast } from "sonner";
import { COUPON_TYPE } from "@/type/type";

interface Promo {
  _id: string;
  promoCode: string;
  source: string;
  isActive: boolean;
  email: string;
  discountType: string;
  discountValue: string | number;
  expiredAt: string | Date;
}

interface PromoTableProps {
  promos: Promo[];
  setIsActive: (val: boolean | null) => void;
  setStatus: (val: COUPON_TYPE | null) => void;
}

const tableHeaders = [
  "Promo Code",
  "Source",
  "Status",
  "Discount Type",
  "Discount Value",
  "Expired At",
  "Actions",
];

export function PromoCodeTable({
  promos,
  setStatus,
  setIsActive,
}: PromoTableProps) {
  const [open, setOpen] = useState(false);
  const [deleteCoupon] = useDeleteCouponMutation();
  const handleDelete = (id: string) => {
    toast.promise(deleteCoupon({ id }).unwrap(), {
      loading: "Deleting...",
      success: "Deleted successfully!",
      error: (err) => err.message || err.data?.message,
    });
    console.log({ id });
  };

  return (
    <div className="space-y-6 rounded-xl">
      <div className="flex items-center justify-between gap-3 w-full">
        <h3 className="text-xl font-bold">Promo codes</h3>

        <div className="flex items-center gap-5">
          <Select
            defaultValue={"All Status"}
            onValueChange={(value) => {
              if (value === "Active") {
                setIsActive(true);
              } else if (value === "Inactive") {
                setIsActive(false);
              } else {
                setIsActive(null);
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value={"All Status"}>All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Select
            defaultValue={"All Source"}
            onValueChange={(value) => {
              if (value !== "All Source") {
                setStatus(value as COUPON_TYPE);
              } else {
                setStatus(null);
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Source" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value={"All Source"}>All Source</SelectItem>
              <SelectItem value={COUPON_TYPE.UBER}>Uber</SelectItem>
              <SelectItem value={COUPON_TYPE.LYFT}>Lyft</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-200">
              {tableHeaders.map((title, idx) => (
                <TableHead
                  key={title}
                  className={`text-gray-700 uppercase font-semibold text-sm px-4 py-3 ${idx === 0 ? "text-left" : "text-center"}`}
                >
                  {title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {promos?.map((promo) => (
              <TableRow
                key={promo.promoCode}
                className="border-b last:border-b-0 hover:bg-gray-50"
              >
                <TableCell className="px-4 py-3">{promo.promoCode}</TableCell>
                <TableCell className="px-4 py-3 flex items-center justify-center">
                  {promo.source}
                </TableCell>

                <TableCell className="px-4 py-3 text-center ">
                  <Select
                    defaultValue={
                      promo.isActive === true ? "Active" : "InActive"
                    }
                    onValueChange={(value) => {
                      // handle status change here
                      console.log("New status:", value);
                    }}
                  >
                    <SelectTrigger
                      className={`w-[120px] border mx-auto ${
                        promo.isActive === true
                          ? "bg-green-50 text-green-700 border-green-300"
                          : "bg-orange-50 text-orange-700 border-orange-300"
                      }`}
                    >
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value={"Active"}>Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>

                <TableCell className="px-4 py-3 text-gray-700 text-center">
                  {promo.discountType}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-700 text-center">
                  {promo.discountValue}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-700 text-center">
                  {new Date(promo.expiredAt).toLocaleDateString()}
                </TableCell>

                <TableCell className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-5">
                    <ReusableDialogue
                      buttonText="Delete"
                      title="This action cannot be undone. This will permanently delete"
                      Icon={Trash}
                      userId={promo?._id}
                      onDelete={handleDelete}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <MyModal open={open} onOpenChange={(val: boolean) => setOpen(val)}>
        <h2>User</h2>
      </MyModal>
    </div>
  );
}
