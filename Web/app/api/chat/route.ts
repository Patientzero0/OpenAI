import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";

// 1. Manually load the .env from the /backend folder
const backendEnvPath = path.resolve(process.cwd(), "backend/.env");

if (fs.existsSync(backendEnvPath)) {
  dotenv.config({ path: backendEnvPath });
} else {
  dotenv.config();
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      console.error("❌ API Key missing in backend/.env");
      return NextResponse.json(
        { error: "GROQ_API_KEY is not defined in backend/.env" },
        { status: 500 }
      );
    }

    /**
     * CLEANING LOGIC: 
     * Groq will throw a 400 error if we send extra fields like "id", "timestamp", or "quickActions".
     * This map ensures we only send "role" and "content".
     */
    const formattedMessages = messages.map((m: any) => ({
      role: m.role === "user" ? "user" : "assistant",
      content: m.content || "",
    }));

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: `You are BizGenie, an AI assistant for BizGenie Lite. 
            Help users navigate the platform using these paths:
            - Dashboard Overview: /dashboard/overview
            - Finance (CFO): /dashboard/finance
            - Marketing (CMO): /dashboard/marketing
            - Operations (COO): /dashboard/operations
            - Data Input: /dashboard/data-input
            - Settings: /dashboard/settings
            
            When suggesting a page, always mention the full path (e.g. /dashboard/finance). Be concise.`
          },
          ...formattedMessages,
        ],
        temperature: 0.6,
        max_tokens: 1024,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // This will log the EXACT reason Groq is upset to your terminal
      console.error("❌ Groq API Error:", JSON.stringify(data, null, 2));
      return NextResponse.json(
        { error: data.error?.message || "Groq API Error" },
        { status: response.status }
      );
    }

    return NextResponse.json(data.choices[0].message);

  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}