"use client";
import { Wallet } from "lucide-react";

export default function BalanceCard({ balance }) {
  return (
    <div className="relative bg-gradient-to-br from-blue-600 to-indigo-500 text-white rounded-2xl shadow-lg overflow-hidden p-6 group hover:shadow-2xl transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-20 transition duration-500 blur-2xl" />
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md group-hover:bg-white/30 transition">
            <Wallet className="text-white" size={22} />
          </div>
          <h3 className="text-lg font-medium tracking-wide">
            Account Balance
          </h3>
        </div>
        <span className="text-xs uppercase tracking-widest bg-white/20 px-2 py-1 rounded-md">
          Active
        </span>
      </div>
      <p className="text-4xl font-extrabold tracking-tight mb-2">
        ₹{balance.toLocaleString("en-IN")}
      </p>
      <p className="text-sm text-white/80">
        Available balance in your wallet
      </p>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-blue-400 to-indigo-400" />
    </div>
  );
}
