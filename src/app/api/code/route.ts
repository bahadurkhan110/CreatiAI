import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
// New (i.e., OpenAI NodeJS SDK v4)
import OpenAI from "openai";
import {
  ChatCompletion,
  CreateChatCompletionRequestMessage,
} from "openai/resources/index.mjs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const Instruction = {
  role: "system",
  content:
    "You are a code generator, you only give answers in code in markdows and also give explanations of the code",
};
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
      messages: [Instruction, ...messages],
    });

    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.log("[Code Error]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
