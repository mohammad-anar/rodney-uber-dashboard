"use client";
import Charts from "@/components/charts/Charts";
import { SectionCards } from "@/components/section-cards";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAnalyticsQuery } from "@/redux/service/analytics/analyticsApi";
import { Users } from "lucide-react";
import Link from "next/link";

const MainPage = () => {
  const { data, isLoading } = useGetAnalyticsQuery(
    {},
    {
      selectFromResult: ({ data, isLoading }) => ({
        data: data?.data ?? [],
        isLoading,
      }),
    },
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="">
          {/* Header */}
          <div className="mb-8">
            <Skeleton className="h-10 w-64 mb-2" />
            <Skeleton className="h-4 w-96" />
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <Card key={i} className="p-6">
                <div className="flex items-start justify-between mb-8">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
                <Skeleton className="h-12 w-16 mb-2" />
                <Skeleton className="h-4 w-24" />
              </Card>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Line Chart Card */}
            <Card className="p-6">
              <div className="mb-6">
                <Skeleton className="h-7 w-48 mb-2" />
                <Skeleton className="h-4 w-56" />
              </div>
              <div className="space-y-4">
                <div className="flex items-end justify-between h-64 gap-2">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <Skeleton key={i} className="flex-1 h-full rounded" />
                  ))}
                </div>
                <div className="flex justify-between gap-2 pt-4">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <Skeleton key={i} className="h-3 w-8" />
                  ))}
                </div>
              </div>
            </Card>

            {/* Pie Chart Card */}
            <Card className="p-6">
              <div className="mb-6">
                <Skeleton className="h-7 w-48 mb-2" />
                <Skeleton className="h-4 w-56" />
              </div>
              <div className="flex items-center justify-center">
                <Skeleton className="h-48 w-48 rounded-full" />
              </div>
              <div className="flex items-center justify-center gap-6 mt-6">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards data={data} />
        </div>
        <div className="p-5">
          <Charts data={data} />
        </div>
        <div className="mb-8 px-5">
          <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* New User Registrations Card */}
            <div className="bg-white rounded-lg p-6 shadow-md border">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 rounded-lg p-3">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    New User Registrations
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    247 users registered this week
                  </p>
                </div>
              </div>
              <Link href={"/dashboard/user"}>
                <button className="mt-6 bg-primary hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded transition-colors">
                  Manage Users
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
