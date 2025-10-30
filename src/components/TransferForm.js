"use client";
import { useState } from "react";

export default function TransferForm({ onTransfer, loading }) {
   const [username, setUsername] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onTransfer(username, amount);
    setUsername("");
    setAmount("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 space-y-6 max-w-md mx-auto overflow-hidden"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Receiver Username
        </label>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Amount
        </label>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
      >
        {loading ? "Processing..." : "Transfer"}
      </button>
    </form>
  );
}
