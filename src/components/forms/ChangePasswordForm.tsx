"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Validation schema
const changePassSchema = z.object({
  currentPassword: z.string().min(1, "Password is required"),
  newPassword: z.string().min(1, "Password is required"),
  confirmNewPassword: z.string().min(1, "Password is required"),
});

type AnimalFormValues = z.infer<typeof changePassSchema>;

export function ChangePasswordProfileForm({}) {
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
      confirmNewPassword: "",
    },
  });

  // Handle form submission
  const handleFormSubmit = async (data: AnimalFormValues) => {
    console.log(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
      {/* Name */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">
          Current Password
        </Label>
        <Input
          {...register("currentPassword")}
          placeholder="Enter current password"
          className="py-5 border-2 border-border"
        />
        {errors.currentPassword && (
          <p className="text-xs text-red-500">
            {errors.currentPassword.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">
          New Password
        </Label>
        <Input
          {...register("newPassword")}
          placeholder="Enter new password"
          className="py-5 border-2 border-border"
        />
        {errors.newPassword && (
          <p className="text-xs text-red-500">{errors.newPassword.message}</p>
        )}
      </div>
      {/*  */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">
          Confirm New Password
        </Label>
        <Input
          {...register("confirmNewPassword")}
          placeholder="Reenter current password"
          className="py-5 border-2 border-border"
        />
        {errors.confirmNewPassword && (
          <p className="text-xs text-red-500">
            {errors.confirmNewPassword.message}
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
