import connectDB from "@/lib/dbconnect";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const users = await User.find();
    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error(" GET Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const newUser = await User.create(body);
    return NextResponse.json({ success: true, user: newUser });
  } catch (error) {
    console.error(" POST Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
