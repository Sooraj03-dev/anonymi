import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  const filePath = path.join(process.cwd(), "data/users.json");
  const users = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const user = users.find(
    (u: any) => u.username === username && u.password === password
  );

  if (user) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
  }
}