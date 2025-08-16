"use client";
import { setUser, useCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SiPivotaltracker } from "react-icons/si";
import Cookies from "js-cookie";

const Header = () => {
  const { email } = useAppSelector(useCurrentUser);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(
      setUser({
        name: null,
        email: null,
        token: null,
      })
    );
    Cookies.remove("token");
    router.push("/auth/login");
  };

  return (
    <div className="flex justify-between mt-6 items-center">
      <div className="flex items-center gap-2">
        <SiPivotaltracker className="text-primary" size={40}></SiPivotaltracker>
        <div>
          <h1 className="text-xl font-medium">Expense Tracker</h1>
          <small>Manage your personal finances</small>
        </div>
      </div>
      {!email ? (
        <div className="flex items-center gap-8 justify-center">
          <Link href="/auth/login">
            <button className="bg-primary text-white px-6 py-2 rounded-[8px] font-medium">
              Login
            </button>
          </Link>
          <Link href="/auth/register">
            <button className="border border-primary rounded-[8px] text-primary bg-transparent px-6 py-2 font-medium">
              Sign Up
            </button>
          </Link>
        </div>
      ) : (
        <button onClick={()=>handleLogout()} className="bg-red-500 text-white px-6 py-2 rounded-[8px] font-medium">
          Logout
        </button>
      )}
    </div>
  );
};

export default Header;
