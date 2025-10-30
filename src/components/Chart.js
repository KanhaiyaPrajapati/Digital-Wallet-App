"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { TrendingUp } from "lucide-react";

export default function Chart({ transactions }) {
  const data = transactions.map((tx) => ({
    date: tx.date,
    amount: tx.amount * (tx.type === "credit" ? 1 : -1),
  }));

  return (
    <div className="relative bg-gradient-to-br from-white/80 to-blue-50/50 backdrop-blur-md border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 overflow-hidden group">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-indigo-400/10 opacity-0 group-hover:opacity-100 transition duration-500 blur-2xl" />

      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-xl text-white shadow-md">
            <TrendingUp size={20} />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">
            Transaction Overview
          </h3>
        </div>
        <span className="text-sm text-gray-500">Last 7 Days</span>
      </div>

      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="10%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="90%" stopColor="#3b82f6" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="date"
              tick={{ fill: "#6b7280", fontSize: 12 }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#6b7280", fontSize: 12 }}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255,255,255,0.95)",
                borderRadius: "10px",
                border: "1px solid #e5e7eb",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              }}
            />
            <Line
              type="natural"
              dataKey="amount"
              stroke="url(#colorAmount)"
              strokeWidth={3}
              dot={{ r: 4, fill: "#3b82f6" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
