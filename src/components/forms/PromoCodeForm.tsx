"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";

interface PromoCodeFormData {
  promoCode: string;
  source: string;
  discountType: string;
  discountValue: string;
  expiryDate: string;
  usageLimit: string;
  activeDays: {
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
  timeRangeStart: string;
  timeRangeEnd: string;
}

export default function PromoCodeForm() {
  const { register, handleSubmit, watch, reset, setValue } =
    useForm<PromoCodeFormData>({
      defaultValues: {
        promoCode: "",
        source: "",
        discountType: "",
        discountValue: "",
        expiryDate: "",
        usageLimit: "",
        activeDays: {
          friday: false,
          saturday: false,
          sunday: false,
        },
        timeRangeStart: "22:00",
        timeRangeEnd: "03:00",
      },
    });

  const activeDays = watch("activeDays");

  const onSubmit = (data: PromoCodeFormData) => {
    console.log("Form submitted:", data);
    // Handle form submission here
  };

  const onReset = () => {
    reset();
  };

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Create Promo Code
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Manually create a new promotional code for ride services
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* First Row: Promo Code & Source */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Promo Code
            </label>
            <Input
              {...register("promoCode")}
              placeholder="SAFE2024"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Source
            </label>
            <Select
              value={watch("source")}
              onValueChange={(value) => setValue("source", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="uber">Uber</SelectItem>
                <SelectItem value="lyft">Lyft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Second Row: Discount Type & Discount Value */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Discount Type
            </label>
            <Select
              value={watch("discountType")}
              onValueChange={(value) => setValue("discountType", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percentage">Percentage</SelectItem>
                <SelectItem value="fixed">Fixed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Discount Value
            </label>
            <Input
              {...register("discountValue")}
              placeholder="10"
              type="number"
              className="w-full"
            />
          </div>
        </div>

        {/* Third Row: Expiry Date & Usage Limit */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiry Date
            </label>
            <Input
              {...register("expiryDate")}
              type="date"
              placeholder="mm/dd/yyyy"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Usage Limit (Optional)
            </label>
            <Input
              {...register("usageLimit")}
              placeholder="100"
              type="number"
              className="w-full"
            />
          </div>
        </div>

        {/* Active Time Window Section */}
        <div className="border-t pt-6">
          <h3 className="text-sm font-medium text-gray-900 mb-4">
            Active Time Window
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Days */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Days
              </label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Checkbox
                    id="friday"
                    checked={activeDays.friday}
                    onCheckedChange={(checked) =>
                      setValue("activeDays.friday", checked as boolean)
                    }
                  />
                  <label
                    htmlFor="friday"
                    className="ml-2 text-sm text-gray-700"
                  >
                    Friday
                  </label>
                </div>
                <div className="flex items-center">
                  <Checkbox
                    id="saturday"
                    checked={activeDays.saturday}
                    onCheckedChange={(checked) =>
                      setValue("activeDays.saturday", checked as boolean)
                    }
                  />
                  <label
                    htmlFor="saturday"
                    className="ml-2 text-sm text-gray-700"
                  >
                    Saturday
                  </label>
                </div>
                <div className="flex items-center">
                  <Checkbox
                    id="sunday"
                    checked={activeDays.sunday}
                    onCheckedChange={(checked) =>
                      setValue("activeDays.sunday", checked as boolean)
                    }
                  />
                  <label
                    htmlFor="sunday"
                    className="ml-2 text-sm text-gray-700"
                  >
                    Sunday
                  </label>
                </div>
              </div>
            </div>

            {/* Time Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Time Range
              </label>
              <div className="flex items-center gap-3">
                <Input
                  {...register("timeRangeStart")}
                  type="time"
                  className="w-24"
                />
                <span className="text-gray-600">to</span>
                <Input
                  {...register("timeRangeEnd")}
                  type="time"
                  className="w-24"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            className="bg-primary hover:bg-yellow-600 text-white rounded-lg"
          >
            <span className="mr-2">+</span>
            Create Promo Code
          </Button>
          <Button
            type="button"
            onClick={onReset}
            variant="outline"
            className="border-primary text-yellow-600 hover:bg-yellow-50 rounded-lg bg-transparent"
          >
            <span className="mr-2">↻</span>
            Reset
          </Button>
        </div>
      </form>
    </Card>
  );
}
