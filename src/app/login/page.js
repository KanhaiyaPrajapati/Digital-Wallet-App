"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Mail } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      router.push("/");
    }
  }, [router]);

  const handleEmailLogin = async (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      toast.error("Enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get("/api/users");
      const users = res.data.users;

      const foundUser = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (foundUser) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("email", foundUser.email);
        localStorage.setItem("username", foundUser.name);
        toast.success(`Welcome back, ${foundUser.name}!`);
        router.push("/");
      } else {
        toast.error("No user found with this email");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 text-center max-w-sm w-full border border-gray-100">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Login to <span className="text-blue-600">Digital Wallet</span>
        </h2>

        <form onSubmit={handleEmailLogin} className="space-y-4 text-left">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg w-full flex items-center justify-center gap-2"
          >
            <Mail size={18} />
            {loading ? "Verifying..." : "Login with Email"}
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-6">
          By logging in, you agree to our{" "}
          <span className="text-blue-600 underline cursor-pointer">
            Terms & Privacy
          </span>
          .
        </p>
      </div>
    </div>
  );
}
