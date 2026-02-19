"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  CheckCircle2,
  User,
} from "lucide-react";
import Image from "next/image";
import { IUser } from "@/type/type";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface UserDetailsCardProps {
  user: IUser;
}

export default function UserDetailsCard({ user }: UserDetailsCardProps) {
  console.log(user);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "ACTIVE":
        return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400";
      case "INACTIVE":
        return "bg-amber-500/10 text-amber-700 dark:text-amber-400";
      case "SUSPENDED":
        return "bg-red-500/10 text-red-700 dark:text-red-400";
      default:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <Card className="overflow-hidden border-2">
        <div className="h-24 bg-gradient-to-r from-primary/20 to-accent/20"></div>
        <CardContent className="relative px-6 pt-0">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-start">
            {/* Profile Photo */}
            <div className="relative -mt-16">
              <div className="flex w-20 h-20  items-center justify-center overflow-hidden rounded-full border-4 border-background bg-muted">
                {user.profilePhoto ? (
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={user?.profilePhoto} alt="@maxleiter" />
                    <AvatarFallback>{user.name.split("")[0]}</AvatarFallback>
                  </Avatar>
                ) : (
                  <User className="h-12 w-12 text-muted-foreground" />
                )}
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 pt-4">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                {user.name}
              </h1>
              <p className="text-sm text-muted-foreground">ID: {user._id}</p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Badge
                  variant="outline"
                  className={getStatusColor(user.status)}
                >
                  {user.status}
                </Badge>
                <Badge variant="secondary">{user.role}</Badge>
                {user.emailVerified && (
                  <Badge
                    variant="outline"
                    className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                  >
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                    Verified
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Contact Information
          </CardTitle>
          <CardDescription>Email and phone details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-4">
            <Mail className="mt-1 h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p className="text-foreground">{user.email}</p>
            </div>
          </div>
          <Separator />
          <div className="flex items-start gap-4">
            <Phone className="mt-1 h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Phone</p>
              <p className="text-foreground">{user.phone}</p>
            </div>
          </div>
          <Separator />
          <div className="flex items-start gap-4">
            <MapPin className="mt-1 h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Address
              </p>
              <p className="text-foreground">{user.address}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Account Details
          </CardTitle>
          <CardDescription>Account status and timestamps</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Account Status
              </p>
              <Badge className={`w-fit ${getStatusColor(user.status)}`}>
                {user.status}
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                User Role
              </p>
              <Badge variant="secondary">{user.role}</Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Email Verification
              </p>
              <p className="text-foreground">
                {user.emailVerified ? (
                  <span className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" />
                    Verified
                  </span>
                ) : (
                  <span className="text-amber-600 dark:text-amber-400">
                    Pending Verification
                  </span>
                )}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                User ID
              </p>
              <p className="truncate font-mono text-sm text-foreground">
                {user._id}
              </p>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium text-muted-foreground">
                  Created At
                </p>
              </div>
              <p className="text-sm text-foreground">
                {formatDate(user.createdAt)}
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium text-muted-foreground">
                  Last Updated
                </p>
              </div>
              <p className="text-sm text-foreground">
                {formatDate(user.updatedAt)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
