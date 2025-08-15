"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { TLoginValues } from "@/types/common";
import Link from "next/link";
import { useSignupRequestMutation } from "@/redux/features/auth/authApi";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();
  const [signupRequest, { isLoading }] = useSignupRequestMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginValues>();

  const onSubmit: SubmitHandler<TLoginValues> = async (data) => {
    const userData = {
      ...data,
      role: "User",
    };
    const response: any = await signupRequest(userData);
    if (response.data) {
      toast.success(
        "Your request has been submitted. An OTP has been sent to your email."
      );
    }
    router.push("/auth/verify-email");
    localStorage.setItem("verify", data.email)
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 p-2 via-blue-50 to-indigo-100 py-12 min-h-screen">
      <div className="w-full md:w-2/5 xl:w-1/3 2xl:w-1/4 shadow-md mx-auto p-6 dark:text-white bg-white rounded-[4px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-lg pt-6 bg-white"
        >
          <div className="mb-4">
            <label className="block pb-1 font-medium">Full Name</label>
            <input
              {...register("fullName", {
                required: "Full name is required",
              })}
              className="w-full p-2 border rounded-[4px]"
              placeholder="Enter your fullname"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block pb-1 font-medium">Email</label>
            <input
              {...register("email", {
                required: "Email is required",
              })}
              className="w-full p-2 border rounded-[4px]"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block pb-1 font-medium">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              className="w-full p-2 border rounded-[4px]"
              placeholder="Enter password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="bg-primary text-white py-3 w-full font-medium rounded-[4px]"
          >
            {isLoading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <div className="flex pt-2 justify-center">
          <h1>Already have an account?</h1>
          <Link href="/auth/login" className="text-primary hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
