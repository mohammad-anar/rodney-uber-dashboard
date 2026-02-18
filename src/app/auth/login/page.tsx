"use client";

import image1 from "@/assets/loginPageImage.png";
import { Button } from "@/components/ui/button";
import { useLoginMutation } from "@/redux/service/auth/authApi";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Cookies from "js-cookie";

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  // api
  const [login, { isLoading }] = useLoginMutation();

  // form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      toast.promise(login(data).unwrap(), {
        loading: "Logging in...",
        success: (data) => {
          console.log(data);
          Cookies.set("accessToken", data?.data?.accessToken);
          Cookies.set("refreshToken", data?.data?.refreshToken);
          router.push("/dashboard");
          return "Login successful!";
        },
        error: (err) => err?.data?.message || "Login failed",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="border w-full h-full min-h-[80vh] max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 p-10 bg-green-100 rounded-xl">
      <div className="w-full max-w-md mx-auto flex flex-col justify-center">
        {/* Header */}
        {/* logo */}

        {/* welcome title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome Back!
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-normal text-gray-700 mb-2">
              Email
            </label>
            <div className="relative ">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-ring"
                size={20}
              />
              <input
                type="email"
                placeholder="john@gmail.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring bg-input/30"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-normal text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-ring"
                size={20}
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring bg-input/30"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Forgot Password Link */}
          <div className="text-right -mt-4">
            <Link
              href="/auth/forgot-password"
              className="text-green-500 underline font-semibold text-sm font-normal hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Sign In Button */}
          <Button
            type="submit"
            className="w-full py-6 uppercase rounded-lg bg-primary font-semibold  text-white text-lg cursor-pointer transition-colors"
          >
            {isLoading && <Loader2 className="spin-in" />}
            {isLoading ? "Please wait..." : "Login"}
          </Button>
        </form>
      </div>
      <div className="hidden lg:block">
        <Image src={image1} width={800} height={1200} alt="page image" />
      </div>
    </div>
  );
}
