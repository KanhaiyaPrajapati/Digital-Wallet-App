"use client";
import { useEffect, useState } from "react";
import { ArrowUpCircle, ArrowDownCircle, Calendar, Wallet } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

export default function TransactionsPage() {
  const [filter, setFilter] = useState("all");
  const [date, setDate] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const email = localStorage.getItem("email");
        if (!email) {
          toast.error("Please login first");
          return;
        }
        const res = await axios.get(`/api/transactions?email=${email}`);
        setTransactions(res.data.transactions || []);
      } catch (error) {
        console.error("Error loading transactions:", error);
        toast.error("Failed to load transactions");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const filtered = transactions.filter((tx) => {
    const matchType = filter === "all" ? true : tx.type === filter;
    const matchDate = date ? tx.date === date : true;
    return matchType && matchDate;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-500">
        Loading transactions...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-xl shadow-md">
          <Wallet className="text-white" size={24} />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">
          Transaction History
        </h2>
      </div>

      <div className="flex flex-wrap gap-3 items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex gap-2">
          {["all", "credit", "debit"].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 shadow-sm ${
                filter === t
                  ? "bg-gradient-to-r from-blue-600 to-indigo-500 text-white shadow-md scale-[1.02]"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        <span className="hidden sm:block w-px h-6 bg-gray-300 mx-2" />

        <div className="flex items-center gap-2">
          <Calendar size={18} className="text-gray-500" />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {date && (
            <button
              onClick={() => setDate("")}
              className="text-xs text-gray-500 hover:text-red-500 transition"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="bg-white/90 backdrop-blur-md shadow-lg rounded-2xl p-6 border border-gray-200 transition-all duration-300">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-gray-500">
            <Calendar size={40} className="mb-3 text-gray-400" />
            <p className="text-sm">No transactions found for this filter.</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {filtered.map((tx) => (
              <li
                key={tx.id}
                className="py-4 flex justify-between items-center hover:bg-gray-50 transition-all duration-200 px-3 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-2.5 rounded-full ${
                      tx.type === "credit"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-500"
                    }`}
                  >
                    {tx.type === "credit" ? (
                      <ArrowDownCircle size={20} />
                    ) : (
                      <ArrowUpCircle size={20} />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{tx.desc}</p>
                    <p className="text-xs text-gray-500">{tx.date}</p>
                  </div>
                </div>

                <span
                  className={`font-semibold text-sm ${
                    tx.type === "credit" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {tx.type === "credit" ? "+" : "-"}₹{tx.amount}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
