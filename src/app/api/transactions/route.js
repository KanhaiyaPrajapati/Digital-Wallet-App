import { NextResponse } from "next/server";
import connectDB from "@/lib/dbconnect";
import User from "@/models/user";

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      transactions: user.transactions,
    });
  } catch (error) {
    console.error("❌ Error fetching transactions:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
