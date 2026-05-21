"use client";

import { Lock, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginUserMutation } from "@/redux/api/auth";
import { handleApiResponse } from "@/lib/handleRTKResponse";
import { toast } from "sonner";
import Cookies from "js-cookie";

type LoginFormValues = {
  email: string;
  password: string;
};

const AdminLogin = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loginFN] = useLoginUserMutation();
  const onSubmit = async (data: LoginFormValues) => {
    const payload = {
      email: data.email,
      password: data.password,
    };
    const res = await handleApiResponse(loginFN, payload, "Login successful");
    if (res?.success) {
      if (res?.data?.data?.user?.role !== "ADMIN") {
        toast.error("Unauthorized access. Only admins can log in.");
        return;
      }
      sessionStorage.setItem("token", res?.data?.data?.token);
      sessionStorage.setItem("role", res?.data?.data?.user?.role);
      Cookies.set("token", res?.data?.data?.token);
      router.push("/admin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md border-border/50">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <Lock className="w-6 h-6 text-primary" />
          </div>

          <CardTitle className="font-serif">Admin Login</CardTitle>

          <CardDescription>Sign in to manage your restaurant</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>

              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                <Input
                  id="email"
                  placeholder="admin@gmail.com"
                  className="pl-9"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
              </div>

              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-9"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
              </div>

              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" size="lg">
              Sign In
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Demo credentials:{" "}
              <span className="font-mono">admin@gmail.com</span> /{" "}
              <span className="font-mono">admin123</span>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
