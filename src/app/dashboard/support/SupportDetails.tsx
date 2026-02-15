"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const statusConfig = {
  pending: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Pending" },
  approved: { bg: "bg-green-100", text: "text-green-800", label: "Approved" },
  rejected: { bg: "bg-red-100", text: "text-red-800", label: "Rejected" },
};

const sampleUser = {
  id: "1",
  name: "Sarah Johnson",
  email: "sarah.johnson@example.com",
  profileImage:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  status: "approved" as const,
  submittedAt: "2024-02-10T14:30:00Z",
  documents: [
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=800&fit=crop",
  ],
};

export function SupportDetails() {
  const user = sampleUser;

  const statusInfo = statusConfig[user.status];

  return (
    <div className=" bg-gray-50">
      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 space-y-6">
            {/* Profile Section */}
            <div className="flex gap-6 items-start">
              <div className="relative w-32 h-32 shrink-0">
                <Image
                  src={user.profileImage}
                  alt={user.name}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {user.name}
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">{user.email}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.bg} ${statusInfo.text}`}
                  >
                    {statusInfo.label}
                  </span>
                </div>

                <div className="pt-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Submitted:</span>{" "}
                    {new Date(user.submittedAt).toLocaleDateString("en-US", {
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
                Documents ({user.documents.length})
              </h3>

              <div className="space-y-5">
                {user.documents.length > 0 ? (
                  user.documents.map((doc, index) => (
                    <Image
                      key={index}
                      width={300}
                      height={300}
                      src={doc}
                      alt="doc"
                    />
                  ))
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
