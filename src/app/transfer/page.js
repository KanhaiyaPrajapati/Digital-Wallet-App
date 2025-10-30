"use client";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import TransferForm from "../../components/TransferForm";

export default function TransferPage() {
  const [loading, setLoading] = useState(false);

  const handleTransfer = async (receiverInput, amount) => {
    const senderEmail = localStorage.getItem("email");
    if (!senderEmail) {
      toast.error("Please log in first");
      return;
    }

    if (!receiverInput || !amount) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/api/transfer", {
        senderEmail,
        receiverInput, 
        amount,
      });

      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.error || "Transfer failed");
      }
    } catch (error) {
      console.error("Transfer failed:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Transfer Funds</h2>
      <TransferForm onTransfer={handleTransfer} loading={loading} />
    </div>
  );
}
