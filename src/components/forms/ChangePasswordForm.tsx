"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { useChangePasswordMutation } from "@/redux/service/auth/authApi";
import { toast } from "sonner";

// Validation schema
const changePassSchema = z.object({
  currentPassword: z.string().min(1, "Password is required"),
  newPassword: z.string().min(1, "Password is required"),
  confirmPassword: z.string().min(1, "Password is required"),
});

type AnimalFormValues = z.infer<typeof changePassSchema>;

export function ChangePasswordProfileForm({}) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // api
  const [changePassword] = useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AnimalFormValues>({
    resolver: zodResolver(changePassSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Handle form submission
  const handleFormSubmit = async (data: AnimalFormValues) => {
    console.log(data);
    try {
      toast.promise(changePassword(data).unwrap(), {
        loading: "Loading...",
        error: (err) => err.message || "Failed to change password",
        success: (data) => data.message || "Success",
      });
    } catch (error) {
      console.log(error);
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
      {/* Current Password */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">
          Current Password
        </Label>
        <div className="relative">
          <Input
            {...register("currentPassword")}
            type={showCurrentPassword ? "text" : "password"}
            placeholder="Enter current password"
            className="py-5 border-2 border-border pr-10"
          />
          <button
            type="button"
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.currentPassword && (
          <p className="text-xs text-red-500">
            {errors.currentPassword.message}
          </p>
        )}
      </div>

      {/* New Password */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">
          New Password
        </Label>
        <div className="relative">
          <Input
            {...register("newPassword")}
            type={showNewPassword ? "text" : "password"}
            placeholder="Enter new password"
            className="py-5 border-2 border-border pr-10"
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.newPassword && (
          <p className="text-xs text-red-500">{errors.newPassword.message}</p>
        )}
      </div>
      {/* Confirm New Password */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">
          Confirm New Password
        </Label>
        <div className="relative">
          <Input
            {...register("confirmPassword")}
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Reenter new password"
            className="py-5 border-2 border-border pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-xs text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Form Actions */}
      <div className="">
        <Button
          type="submit"
          className="flex-1 bg-primary text-white hover:bg-primary/80 cursor-pointer"
        >
          {"Save"}
        </Button>
      </div>
    </form>
  );
}
