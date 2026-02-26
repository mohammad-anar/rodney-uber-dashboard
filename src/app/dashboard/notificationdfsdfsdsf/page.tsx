// "use client";

// import React from "react";

// import {
//   ChevronDown,
//   Clock,
//   Video,
//   AlertTriangle,
//   FileText,
//   Tag,
//   CheckCircle,
//   ChevronRight,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { MyPagination } from "@/components/shared/MyPagination";

// interface Notification {
//   id: string;
//   title: string;
//   description: string;
//   timestamp: string;
//   icon: React.ReactNode;
//   iconBg: string;
//   unread: boolean;
// }

// const notifications: Notification[] = [
//   {
//     id: "1",
//     title: "New video completed",
//     description:
//       'Sarah Johnson has completed the "Understanding DUI Consequences" video module',
//     timestamp: "5 minutes ago",
//     icon: <Video className="w-6 h-6 text-white" />,
//     iconBg: "bg-blue-500",
//     unread: true,
//   },
//   {
//     id: "2",
//     title: "Promo code pool running low",
//     description:
//       'Only 15 promo codes remaining in the "SAFE2024" pool. Consider adding more codes.',
//     timestamp: "1 hour ago",
//     icon: <AlertTriangle className="w-6 h-6 text-white" />,
//     iconBg: "bg-primary",
//     unread: true,
//   },
//   {
//     id: "3",
//     title: "New financial help application",
//     description:
//       "Michael Rodriguez submitted a new application for victim support funding",
//     timestamp: "2 hours ago",
//     icon: <FileText className="w-6 h-6 text-white" />,
//     iconBg: "bg-green-500",
//     unread: true,
//   },
//   {
//     id: "4",
//     title: "Promo code assigned",
//     description: 'Code "HELP50" has been assigned to user Emma Thompson',
//     timestamp: "4 hours ago",
//     icon: <Tag className="w-6 h-6 text-white" />,
//     iconBg: "bg-purple-500",
//     unread: false,
//   },
//   {
//     id: "5",
//     title: "Application status updated",
//     description: "Application #12045 has been approved and funding disbursed",
//     timestamp: "6 hours ago",
//     icon: <CheckCircle className="w-6 h-6 text-white" />,
//     iconBg: "bg-blue-400",
//     unread: false,
//   },
// ];

// export default function NotificationPage() {
//   return (
//     <div className="p-5">
//       {/* Header */}
//       <div className="mb-10">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <Button
//               variant="outline"
//               className="flex items-center gap-2 border-gray-300 bg-transparent"
//             >
//               All Notifications
//               <ChevronDown className="w-4 h-4" />
//             </Button>
//           </div>
//           <Button
//             variant="outline"
//             className=" border-primary text-primary hover:bg-primary/50 bg-transparent"
//           >
//             Mark All as Read
//           </Button>
//         </div>
//       </div>

//       {/* Notifications List */}
//       <div>
//         <div className="space-y-4">
//           {notifications.map((notification) => (
//             <div
//               key={notification.id}
//               className="flex gap-4 p-5 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow cursor-pointer group"
//             >
//               {/* Icon */}
//               <div
//                 className={`flex-shrink-0 w-12 h-12 rounded-lg ${notification.iconBg} flex items-center justify-center`}
//               >
//                 {notification.icon}
//               </div>

//               {/* Content */}
//               <div className="flex-1 min-w-0">
//                 <div className="flex items-start gap-2">
//                   <h3 className="font-semibold text-gray-900">
//                     {notification.title}
//                   </h3>
//                   {notification.unread && (
//                     <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5"></span>
//                   )}
//                 </div>
//                 <p className="text-sm text-gray-600 mt-1 leading-relaxed">
//                   {notification.description}
//                 </p>
//                 <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
//                   <Clock className="w-4 h-4" />
//                   {notification.timestamp}
//                 </div>
//               </div>

//               {/* Chevron */}
//               <div className="flex-shrink-0 flex items-center justify-center text-gray-400 group-hover:text-gray-600">
//                 <ChevronRight className="w-5 h-5" />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="mt-8">
//         <MyPagination />
//       </div>
//     </div>
//   );
// }
