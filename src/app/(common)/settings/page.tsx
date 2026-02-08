/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ChangePasswordProfileForm } from "@/components/forms/ChangePasswordForm";
import { EditProfileForm } from "@/components/forms/UpdateProfileForm";
import { useState } from "react";

const BannerPage = () => {
  const [loading, setLoading] = useState(false);
  const handleEditSubmit = async (data: any) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Update Animal:", data);
    } catch (error) {
      console.error("Error Updating animal:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-5">
      <div>
        <h3 className="text-2xl sm:text-3xl  font-semibold mb-3 text-primary/90">
          Update Profile
        </h3>
      </div>
      <div className="max-w-full w-full p-5 bg-gray-50 mt-10 rounded-xl">
        <div className="max-w-2xl">
          <EditProfileForm />
        </div>
      </div>
      <div className="max-w-full w-full p-5 bg-gray-50 mt-10 rounded-xl">
        <div className="max-w-2xl">
          <ChangePasswordProfileForm />
        </div>
      </div>
    </div>
  );
};

export default BannerPage;
