import {
  IconClock,
  IconTarget,
  IconUser,
  IconUsersGroup,
} from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowDownWideNarrow, Axis3d, Bandage, PlayIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function SectionCards() {
  const statisticsData = [
    {
      id: 1,
      amount: 12847,
      icon: IconUsersGroup,
      percentage: "+23%",
      description: "Total Users",
      bgColor: "purple-100",
      iconColor: "purple",
    },
    {
      id: 2,
      amount: 45293,
      icon: PlayIcon,
      percentage: "+12%",
      description: "Video watched",
      bgColor: "red-100",
      iconColor: "red",
    },
    {
      id: 3,
      amount: 142,
      icon: Bandage,
      percentage: "10% active",
      description: "Promo codes",
      bgColor: "blue-100",
      iconColor: "blue",
    },
    {
      id: 4,
      amount: 15,
      icon: Axis3d,
      percentage: "active",
      description: "Active promo code",
      bgColor: "green-100",
      iconColor: "green",
    },
    {
      id: 5,
      amount: 15,
      icon: ArrowDownWideNarrow,
      percentage: "expired",
      description: "Active promo code",
      bgColor: "orange-100",
      iconColor: "orange",
    },
  ];

  const bgColorMap: Record<string, string> = {
    "purple-100": "bg-purple-100",
    "gray-100": "bg-gray-100",
    "red-100": "bg-red-100",
    "green-100": "bg-green-100",
    "blue-100": "bg-blue-100",
    "orange-100": "bg-orange-100",
  };
  return (
    <div className=" *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4  *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 @6xl/main:grid-cols-5">
      {statisticsData?.map((item, index) => {
        const Icon = item.icon;
        return (
          <Card key={index} className="@container/card">
            <CardHeader>
              <CardDescription>
                <div
                  className={`w-10 h-10 ${bgColorMap[item.bgColor]} rounded-md flex items-center justify-center`}
                >
                  <Icon color={item.iconColor} />
                </div>
              </CardDescription>
              <CardTitle className="text-4xl font-bold tabular-nums ">
                {Number(item.amount).toLocaleString().padStart(2, "0")}
              </CardTitle>
              <CardAction>
                <Badge
                  variant={"outline"}
                  className={cn(
                    "bg-green-200 text-green-600 border-green-600 ",
                    item.percentage === "expired"
                      ? "!bg-orange-200 !text-orange-600 !border-orange-600"
                      : "bg-green-200 text-green-600 border-green-600",
                  )}
                >
                  {item.percentage}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="text-muted-foreground">{item.description}</div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
