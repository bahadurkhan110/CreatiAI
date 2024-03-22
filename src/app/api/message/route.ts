import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
// New (i.e., OpenAI NodeJS SDK v4)
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized User", { status: 401 });
    }

    if (!messages) {
      return new NextResponse("Message is required", { status: 500 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.log("[Conversation Messages Error]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
