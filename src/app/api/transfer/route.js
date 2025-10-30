import { NextResponse } from "next/server";
import User from "@/models/user";
import connectDB from "@/lib/dbconnect";

export async function POST(req) {
  try {
    await connectDB();

    const { senderEmail, receiverInput, amount } = await req.json();
    const amt = Number(amount);

    if (!senderEmail || !receiverInput || !amt) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const sender = await User.findOne({ email: senderEmail });
    if (!sender) {
      return NextResponse.json({ error: "Sender not found" }, { status: 404 });
    }
    const receiver =
      (await User.findOne({ email: receiverInput })) ||
      (await User.findOne({ username: receiverInput }));

    if (!receiver) {
      return NextResponse.json(
        { error: "Receiver not found" },
        { status: 404 }
      );
    }
    if (sender.balance < amt) {
      return NextResponse.json(
        { error: "Insufficient balance" },
        { status: 400 }
      );
    }
    sender.balance -= amt;
    receiver.balance += amt;
    const now = new Date().toISOString().split("T")[0];
    const txId = Date.now();

    sender.transactions.push({
      id: txId,
      type: "debit",
      amount: amt,
      date: now,
      desc: `Transfer to ${receiver.name}`,
    });

    receiver.transactions.push({
      id: txId,
      type: "credit",
      amount: amt,
      date: now,
      desc: `Received from ${sender.name}`,
    });
    await sender.save();
    await receiver.save();

    return NextResponse.json({
      success: true,
      message: `Transferred ₹${amt} from ${sender.name} to ${receiver.name}`,
    });
  } catch (error) {
    console.error("Transfer error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
