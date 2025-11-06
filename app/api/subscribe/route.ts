import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

const filePath = path.join(process.cwd(), "subscribers.json");

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  try {
    // Read existing data
    let subscribers: string[] = [];
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf-8");
      subscribers = JSON.parse(data);
    }

    // Prevent duplicates
    if (subscribers.includes(email)) {
      return NextResponse.json({ message: "Email already subscribed." }, { status: 409 });
    }

    // Add new email and save
    subscribers.push(email);
    fs.writeFileSync(filePath, JSON.stringify(subscribers, null, 2));

    return NextResponse.json({ message: "Subscription successful!" });
  } catch (err) {
    console.error("File write error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
