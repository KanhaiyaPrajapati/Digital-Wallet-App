"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Wallet2, LogOut, User, Send, History } from "lucide-react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/60 border-b border-gray-200 shadow-sm">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-xl p-2">
            <Wallet2 size={24} />
          </div>
          <Link href="/" className="text-xl font-semibold text-gray-900 tracking-tight">
            Digital<span className="text-blue-600 font-bold">Wallet</span>
          </Link>
        </div>

        {isLoggedIn ? (
          <div className="flex items-center space-x-2">
            <Link
              href="/"
              className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                pathname === "/" ? "bg-blue-600 text-white" : "hover:bg-blue-50 text-gray-700"
              }`}
            >
              <User size={18} /> Dashboard
            </Link>

            <Link
              href="/transfer"
              className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                pathname === "/transfer"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-blue-50 text-gray-700"
              }`}
            >
              <Send size={18} /> Transfer
            </Link>

            <Link
              href="/transactions"
              className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                pathname === "/transactions"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-blue-50 text-gray-700"
              }`}
            >
              <History size={18} /> History
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1 px-4 py-2 bg-red-500 text-white rounded-full text-sm font-medium hover:bg-red-600 transition-all duration-200 shadow-sm"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-full font-semibold text-sm shadow-md hover:shadow-lg hover:scale-105 transform transition-all duration-200"
          >
            <Wallet2 size={18} />
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}
