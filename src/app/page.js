"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import BalanceCard from "../components/BalanceCard";
import TransactionList from "../components/TransactionList";
import Chart from "../components/Chart";

export default function Dashboard() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const email = localStorage.getItem("email");
        if (!email) {
          router.push("/login");
          return;
        }

        const res = await axios.get("/api/users");
        const users = res.data.users;

        const foundUser = users.find(
          (u) => u.email.toLowerCase() === email.toLowerCase()
        );

        if (foundUser) {
          setCurrentUser(foundUser);
        } else {
          router.push("/login");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    if (localStorage.getItem("isLoggedIn") !== "true") {
      router.push("/login");
    } else {
      fetchUser();
    }
  }, [router]);

  if (loading) return <p>Loading...</p>;
  if (!currentUser) return <p>User not found</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Welcome, {currentUser.name}</h2>
      <BalanceCard balance={currentUser.balance} />
      <Chart transactions={currentUser.transactions} />
      <TransactionList transactions={currentUser.transactions.slice(0, 3)} />
    </div>
  );
}
