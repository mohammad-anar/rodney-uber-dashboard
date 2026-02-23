/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function Charts({ data }: any) {
  const videoCompletionData = data?.couponUsage?.videoUsagePerMonth?.map(
    (item: any) => ({
      month: monthNames[item.month - 1],
      value: item.totalUsage,
    }),
  );

  const promoCodeData = [
    {
      name: "Active",
      value: data?.coupons?.activePercentage,
      color: "#10b981",
    },
    {
      name: "Expired",
      value: data?.coupons?.expiredPercentage,
      color: "#d1d5db",
    },
  ];
  return (
    <main>
      <div className="grid grid-cols-1 gap-8  mx-auto lg:grid-cols-2">
        {/* Video Completion Trend Chart */}
        <Card className="border border-slate-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold text-slate-900">
              Video Completion Trend
            </CardTitle>
            <CardDescription className="text-sm text-slate-600">
              Monthly video watch completion rate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Completion Rate",
                  color: "#f59e0b",
                },
              }}
              className="h-80 w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={videoCompletionData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#fef3c7" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#fef3c7"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e2e8f0"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    stroke="#94a3b8"
                    style={{ fontSize: "13px" }}
                  />
                  <YAxis
                    stroke="#94a3b8"
                    domain={[0, 100]}
                    style={{ fontSize: "13px" }}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "none",
                      borderRadius: "6px",
                      color: "#f1f5f9",
                    }}
                    formatter={(value) => [`${value}`, "Completion Rate"]}
                    labelStyle={{ color: "#f1f5f9" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#f59e0b"
                    strokeWidth={2.5}
                    fill="url(#colorValue)"
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Promo Code Status Chart */}
        <Card className="border border-slate-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold text-slate-900">
              Promo Code Status
            </CardTitle>
            <CardDescription className="text-sm text-slate-600">
              Distribution of promo code usage
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <ChartContainer
              config={{
                active: { color: "#10b981" },
                used: { color: "#6b7280" },
                expired: { color: "#d1d5db" },
              }}
              className="h-80 w-full flex items-center justify-center"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={promoCodeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={95}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, value }) => `${name} ${value}%`}
                    labelLine={false}
                  >
                    {promoCodeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => `${value}%`}
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "none",
                      borderRadius: "6px",
                      color: "#f1f5f9",
                    }}
                    labelStyle={{ color: "#f1f5f9" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="flex gap-6 mt-6 justify-center">
              {promoCodeData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm font-medium text-slate-700">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
