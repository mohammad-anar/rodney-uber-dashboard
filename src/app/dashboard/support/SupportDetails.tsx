/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const statusConfig = {
  Rejected: {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    label: "Pending",
  },
  Approved: { bg: "bg-green-100", text: "text-green-800", label: "Approved" },
  UnderReview: { bg: "bg-red-100", text: "text-red-800", label: "Rejected" },
};

export function SupportDetails({ details }: any) {
  const statusInfo =
    statusConfig[details?.status as keyof typeof statusConfig] ||
    statusConfig.UnderReview;

  return (
    <div className=" bg-gray-50">
      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 space-y-6">
            {/* Profile Section */}
            <div className="flex gap-6 items-start">
              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {details?.fullName}
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">{details?.email}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.bg} ${statusInfo.text}`}
                  >
                    {details.status}
                  </span>
                </div>

                <div className="pt-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Submitted:</span>{" "}
                    {new Date(details.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Documents Section */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Documents ({details?.supportingDocument?.length})
              </h3>

              <div className="space-y-5">
                {details?.supportingDocument?.length > 0 ? (
                  details?.supportingDocument?.map(
                    (doc: any, index: number) => (
                      <Link
                        key={index}
                        href={doc}
                        className="block text-sm underline text-blue-600"
                        target="_blank"
                      >
                        Open document
                      </Link>
                    ),
                  )
                ) : (
                  <p className="text-gray-500 text-sm">
                    No documents available
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
