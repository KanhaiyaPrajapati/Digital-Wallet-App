"use client";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export default function TransactionList({ transactions }) {
  return (
    <div className="relative bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Recent Transactions
        </h3>
        <span className="text-sm text-gray-500">Last updated</span>
      </div>

      <ul className="divide-y divide-gray-100">
        {transactions.map((tx) => (
          <li
            key={tx.id}
            className="py-3 flex items-center justify-between hover:bg-gray-50 rounded-lg transition-all px-2"
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-xl ${
                  tx.type === "credit"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-500"
                }`}
              >
                {tx.type === "credit" ? (
                  <ArrowDownRight size={18} />
                ) : (
                  <ArrowUpRight size={18} />
                )}
              </div>
              <div>
                <p className="font-medium text-gray-800">{tx.desc}</p>
                <p className="text-xs text-gray-500">{tx.date}</p>
              </div>
            </div>

            <div
              className={`font-semibold ${
                tx.type === "credit" ? "text-green-600" : "text-red-500"
              }`}
            >
              {tx.type === "credit" ? "+" : "-"}₹{tx.amount}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
