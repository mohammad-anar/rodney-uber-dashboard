"use client";
import Charts from "@/components/charts/Charts";
import { SectionCards } from "@/components/section-cards";
import { useGetAnalyticsQuery } from "@/redux/service/analytics/analyticsApi";
import { TrendingUp, Users } from "lucide-react";
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

  console.log({ data });
  return (
    <>
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
    </>
  );
};

export default MainPage;
